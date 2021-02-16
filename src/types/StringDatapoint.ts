import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "CDF StringDatapoints" })
export class StringDatapoint {
  @Field({ description: "" })
  timestamp: Date;

  @Field({ description: "" })
  value: string;
}
