import { Field, ObjectType, ID } from "type-graphql";

import {
  AssetDescription,
  AssetName,
  AssetSource,
  CogniteExternalId,
  CogniteInternalId,
} from "./common";

import { IdEither } from "./IdEither";
import { Metadata } from "./Metadata";

@ObjectType({ description: "A CDF Asset" })
export class Asset {
  /**
   * Cognite Asset
   */
  @Field(() => ID, { description: "The unique identifier of the asset" })
  id: string | number;

  @Field(() => ID, { description: "The id of the root for the tree this asset belongs to" })
  rootId: CogniteInternalId;

  @Field(() => ID, { nullable: true, description: "The parent's externalId if defined" })
  parentExternalId?: CogniteExternalId;

  /**
   * Aggregated metrics of the asset
   */
  @Field({ nullable: true, description: "Number of direct descendants for the asset" })
  childCount?: number;

  @Field({ nullable: true, description: "Asset path depth (number of levels below root node)" })
  depth?: number;

  @Field(() => [IdEither], {
    nullable: true,
    description: "IDs of assets on the path to the asset",
  })
  path?: IdEither[];

  /**
   * ExternalAsset
   */
  @Field(() => ID, { nullable: true, description: "" })
  externalId?: CogniteExternalId;

  @Field({ description: "The asset name" })
  name: AssetName;

  @Field(() => ID, { nullable: true, description: "" })
  parentId?: CogniteInternalId;

  @Field({ nullable: true, description: "" })
  description?: AssetDescription;

  @Field(() => ID, { nullable: true, description: "" })
  dataSetId?: CogniteInternalId;

  @Field(() => [Metadata], { nullable: true, description: "" })
  metadata?: Metadata[];

  @Field({ nullable: true, description: "" })
  source?: AssetSource;

  @Field(() => [ID], { nullable: true, description: "" })
  labels?: CogniteExternalId[];

  /**
   * CreatedAndLastUpdatedTime
   */
  @Field({ description: "" })
  lastUpdatedTime: Date;

  @Field({ description: "" })
  createdTime: Date;

  //-------------------------------------------------------------------------

  constructor(props: Asset) {
    // Asset
    this.id = props.id;
    this.rootId = props.rootId;
    this.parentExternalId = props.parentExternalId;
    // AggregateResults
    this.childCount = props.childCount;
    this.depth = props.depth;
    this.path = props.path;
    // ExternalAsset
    this.externalId = props.externalId;
    this.name = props.name;
    this.parentId = props.parentId;
    this.description = props.description;
    this.dataSetId = props.dataSetId;
    this.metadata = props.metadata;
    this.source = props.source;
    this.labels = props.labels;
    // CreatedAndLastUpdatedTime
    this.lastUpdatedTime = props.lastUpdatedTime;
    this.createdTime = props.createdTime;
  }
}