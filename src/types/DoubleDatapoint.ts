import { Field, ObjectType, Float } from "type-graphql";

@ObjectType({ description: "CDF StringDatapoints" })
export class DoubleDatapoint {
  @Field({ description: "" })
  timestamp: Date;

  @Field(() => Float, { description: "" })
  value: number;
}
