import { Field, ObjectType, ID, InputType, Float } from "type-graphql";

import {
  DatapointAggregate as CDFDatapointAggregate,
} from "@cognite/sdk";

@ObjectType({ description: "CDF DatapointAggregate" })
export class DatapointAggregate {
  @Field(() => ID, { description: "Internal identity" })
  id: number;

  @Field({ description: "" })
  timestamp: Date;

  @Field(() => Float, { nullable: true, description: "" })
  average?: number;
  @Field(() => Float, { nullable: true, description: "" })
  max?: number;
  @Field(() => Float, { nullable: true, description: "" })
  min?: number;
  @Field(() => Float, { nullable: true, description: "" })
  count?: number;
  @Field(() => Float, { nullable: true, description: "" })
  sum?: number;
  @Field(() => Float, { nullable: true, description: "" })
  interpolation?: number;
  @Field(() => Float, { nullable: true, description: "" })
  stepInterpolation?: number;
  @Field(() => Float, { nullable: true, description: "" })
  continuousVariance?: number;
  @Field(() => Float, { nullable: true, description: "" })
  discreteVariance?: number;
  @Field(() => Float, { nullable: true, description: "" })
  totalVariation?: number;

  //-------------------------------------------------------------------------

  constructor(props: CDFDatapointAggregate) {
    this.id = props.timestamp.valueOf();
    this.timestamp = props.timestamp;
    this.average = props.average;
    this.max = props.max;
    this.min = props.min;
    this.count = props.count;
    this.sum = props.sum;
    this.interpolation = props.interpolation;
    this.stepInterpolation = props.stepInterpolation;
    this.continuousVariance = props.continuousVariance;
    this.discreteVariance = props.discreteVariance;
    this.totalVariation = props.totalVariation;
  }
}
