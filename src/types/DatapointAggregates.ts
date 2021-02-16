import { Field, ObjectType, ID } from "type-graphql";
import { DatapointAggregates as CDFDatapointAggregates } from "@cognite/sdk";

import { CogniteExternalId } from "./common";

import { DatapointAggregate } from "./DatapointAggregate";

@ObjectType({ description: "CDF DatapointAggregates" })
export class DatapointAggregates {
  @Field(() => ID, { description: "Internal identity" })
  id: number;

  @Field(() => ID, { nullable: true, description: "External identity" })
  externalId?: CogniteExternalId;

  @Field({ nullable: true, description: "" })
  isString?: boolean;

  @Field({ nullable: true, description: "" })
  unit?: string;

  @Field({ description: "" })
  isStep: boolean;

  @Field(() => [DatapointAggregate], { description: "" })
  datapoints: DatapointAggregate[];

  //-------------------------------------------------------------------------

  constructor(props: CDFDatapointAggregates) {
    this.id = props.id;
    this.externalId = props.externalId;
    this.isString = props.isString;
    this.unit = props.unit;
    this.isStep = props.isStep;
    this.datapoints = props.datapoints.map((x) => new DatapointAggregate(x));
  }
}
