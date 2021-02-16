import { Field, ObjectType, ID } from "type-graphql";

export const aggregates = [
  "average",
  "max",
  "min",
  "count",
  "sum",
  "interpolation",
  "stepInterpolation",
  "totalVariation",
  "continuousVariance",
  "discreteVariance",
];

@ObjectType({ description: "CDF Aggregate types" })
export class AggregateEnum {
  @Field(() => ID)
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}
