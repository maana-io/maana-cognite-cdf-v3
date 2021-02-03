import { Field, ObjectType, ID } from "type-graphql";

@ObjectType({ description: "A CDF identity reference" })
export class IdEither {
  /**
   * Required by Maana Q
   */
  @Field(() => ID, { description: "Required ID" })
  id: string | number;

  @Field({ nullable: true, description: "Internal ID" })
  internalId: number;

  @Field({ nullable: true, description: "External ID" })
  externalId: string;

  constructor(props: IdEither) {
    this.id = props.id;
    this.internalId = props.internalId;
    this.externalId = props.externalId;
  }
}
