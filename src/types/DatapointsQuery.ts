import { Field, ID, InputType } from "type-graphql";

import { StringOrTimestamp, StringOrTimestampAsInput } from "./StringOrTimestamp";

@InputType({ description: "CDF DatapointsQuery" })
export class DatapointsQuery {
  @Field(() => ID, { nullable: true, description: "Identity" })
  id?: number;

  @Field(() => ID, { nullable: true, description: "External identity" })
  externalId?: string;

  @Field({ nullable: true, description: "" })
  limit?: number;

  @Field(() => StringOrTimestampAsInput, {
    nullable: true,
    description:
      "Get datapoints after this time. Format is N[timeunit]-ago where timeunit is w,d,h,m,s. Example: '2d-ago' will get everything that is up to 2 days old. Can also send in a Date object. Note that when using aggregates, the start time will be rounded down to a whole granularity unit (in UTC timezone). For granularity 2d it will be rounded to 0:00 AM on the same day, for 3h it will be rounded to the start of the hour, etc.",
  })
  start?: StringOrTimestamp;

  @Field(() => StringOrTimestampAsInput, {
    nullable: true,
    description:
      "Get datapoints up to this time. Same format as for start. Note that when using aggregates, the end will be rounded up such that the last aggregate represents a full aggregation interval containing the original end, where the interval is the granularity unit times the granularity multiplier. For granularity 2d, the aggregation interval is 2 days, if end was originally 3 days after the start, it will be rounded to 4 days after the start.",
  })
  end?: StringOrTimestamp;

  @Field(() => [ID], {
    nullable: "itemsAndList",
    description:
      "The aggregates to be returned. This value overrides top-level default aggregates list when set. Specify all aggregates to be retrieved here. Specify empty array if this sub-query needs to return datapoints without aggregation.",
  })
  aggregates?: string[];

  @Field({ nullable: true, description: "The time granularity size and unit to aggregate over." })
  granularity?: string;

  @Field({
    nullable: true,
    description:
      "Whether to include the last datapoint before the requested time period,and the first one after the requested period. This can be useful for interpolating data. Not available for aggregates.",
  })
  includeOutsidePoints?: boolean;

  constructor(props: DatapointsQuery) {
    if (props) {
      this.id = props.id;
      this.limit = props.limit;
      this.start = props.start;
      this.end = props.end;
      this.aggregates = props.aggregates;
      this.granularity = props.granularity;
      this.includeOutsidePoints = props.includeOutsidePoints;
    }
  }
}
