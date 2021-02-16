import {
  Datapoints as CDFDatapoints,
  DatapointAggregates as CDFDatapointAggregates,
} from "@cognite/sdk";

import { Field, ObjectType, ID } from "type-graphql";
import { DatapointAggregates } from "./DatapointAggregates";
import { Datapoints } from "./Datapoints";
import { aggregates } from "./AggregateEnum";

@ObjectType({ description: "CDF Datapoints Collection" })
export class DatapointsUnion {
  @Field(() => ID, { description: "" })
  id: string | number;

  @Field(() => [DatapointAggregates], { nullable: "itemsAndList", description: "" })
  datapointAggregates?: DatapointAggregates[];

  @Field(() => [Datapoints], { nullable: "itemsAndList", description: "" })
  datapoints?: Datapoints[];

  private isAggregate(items: CDFDatapointAggregates[]): boolean {
    const dp = items[0].datapoints[0];
    return aggregates.some((x) => x in dp);
  }

  constructor(results: CDFDatapointAggregates[] | CDFDatapoints[]) {
    const dpa = results as CDFDatapointAggregates[];
    if (this.isAggregate(dpa)) {
      this.id = "DatapointAggregates";
      this.datapointAggregates = dpa.map((x) => new DatapointAggregates(x));
    } else {
      const dp = results as CDFDatapoints[];
      this.id = "Datapoints";
      this.datapoints = dp.map((x) => new Datapoints(x));
    }
  }
}
