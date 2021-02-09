import { Field, ObjectType, ID } from "type-graphql";

import { CogniteExternalId, CogniteInternalId } from "./common";

@ObjectType({ description: "CDF FileLink" })
export class FileLink {
  @Field(() => ID, { description: "The unique identifier of the file" })
  id: string | number;

  @Field({ description: "The file download URL" })
  url: string;

  //-------------------------------------------------------------------------

  constructor(props: FileLink) {
    this.id = props.id;
    this.url = props.url;
  }
}
