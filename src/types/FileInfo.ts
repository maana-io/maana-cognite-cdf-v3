import { Field, InputType, ObjectType, ID } from "type-graphql";

import { FileMimeType, FileName, CogniteExternalId, CogniteInternalId } from "./common";

import { IdEither } from "./IdEither";
import { Metadata } from "./Metadata";

@ObjectType({ description: "CDF FileInfo" })
export class FileInfo {
  /**
   * Cognite FileInfo
   */
  @Field(() => ID, { description: "The unique identifier of the file" })
  id: CogniteInternalId;

  //   uploaded: boolean;
  //   uploadedTime?: Date;

  /**
   * ExternalFileInfo
   */
  @Field(() => ID, { nullable: true, description: "The file's externalId if defined" })
  externalId?: CogniteExternalId;

  //   name: FileName;
  @Field({ description: "The file name" })
  name: FileName;

  //   source?: string;
  // @Field({ nullable: true, description: "" })
  // source?: AssetSource;

  @Field({ description: "The file's MIME type" })
  mimeType?: FileMimeType;

  @Field(() => [Metadata], { nullable: "itemsAndList", description: "" })
  metadata?: Metadata[];

  @Field(() => [ID], { nullable: "itemsAndList", description: "" })
  assetIds?: CogniteInternalId[];

  @Field(() => ID, { nullable: true, description: "" })
  dataSetId?: CogniteInternalId;

  //   securityCategories?: CogniteInternalId[];

  //   sourceCreatedTime?: Date;

  //   sourceModifiedTime?: Date;

  @Field(() => [ID], { nullable: "itemsAndList", description: "" })
  labels?: CogniteExternalId[];

  //   geoLocation?: FileGeoLocation;

  /**
   * CreatedAndLastUpdatedTime
   */
  @Field({ description: "" })
  lastUpdatedTime: Date;

  @Field({ description: "" })
  createdTime: Date;

  //-------------------------------------------------------------------------

  constructor(props: FileInfo) {
    // FileInfo
    this.id = props.id;
    // ExternalFileInfo
    this.externalId = props.externalId;
    this.name = props.name;
    this.mimeType = props.mimeType;
    this.metadata = props.metadata;
    this.assetIds = props.assetIds;
    this.dataSetId = props.dataSetId;
    this.labels = props.labels;
    // CreatedAndLastUpdatedTime
    this.lastUpdatedTime = props.lastUpdatedTime;
    this.createdTime = props.createdTime;
  }
}
