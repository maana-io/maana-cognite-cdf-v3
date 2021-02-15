import { Field, ObjectType, ID, InputType } from "type-graphql";

@ObjectType({ description: "A CDF identity reference" })
export class IdEither {
  /**
   * Required by Maana Q
   */
  @Field(() => ID, { nullable: true, description: "Required ID" })
  id: string | number;

  @Field({ nullable: true, description: "External ID" })
  externalId: string;

  constructor(props: IdEither) {
    this.id = props.id;
    this.externalId = props.externalId;
  }
}

@InputType({ description: "A CDF identity reference (as input)" })
export class IdEitherInput {
  @Field(() => ID, { nullable: true, description: "Required ID" })
  id: string | number;

  @Field({ nullable: true, description: "External ID" })
  externalId: string;
}
