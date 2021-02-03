import { Field, ObjectType, ID } from "type-graphql";

@ObjectType({ description: "A CDF Metadata entry" })
export class Metadata {
  /**
   * Required by Maana Q
   */
  @Field(() => ID, { description: "Metadata key" })
  id: string | number;

  @Field({ description: "Metadata value" })
  value: string;
}
