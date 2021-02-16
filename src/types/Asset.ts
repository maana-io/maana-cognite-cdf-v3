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

@ObjectType({ description: "CDF Asset" })
export class Asset {
  @Field(() => ID, { description: "The unique identifier of the asset" })
  id: string | number;

  @Field(() => ID, { description: "The id of the root for the tree this asset belongs to" })
  rootId: CogniteInternalId;

  @Field(() => ID, { nullable: true, description: "The parent's externalId if defined" })
  parentExternalId?: CogniteExternalId;

  @Field({ nullable: true, description: "Number of direct descendants for the asset" })
  childCount?: number;

  @Field({ nullable: true, description: "Asset path depth (number of levels below root node)" })
  depth?: number;

  @Field(() => [IdEither], {
    nullable: "itemsAndList",
    description: "IDs of assets on the path to the asset",
  })
  path?: IdEither[];

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

  @Field(() => [Metadata], { nullable: "itemsAndList", description: "" })
  metadata?: Metadata[];

  @Field({ nullable: true, description: "" })
  source?: AssetSource;

  @Field(() => [ID], { nullable: "itemsAndList", description: "" })
  labels?: CogniteExternalId[];

  @Field({ description: "" })
  lastUpdatedTime: Date;

  @Field({ description: "" })
  createdTime: Date;

  //-------------------------------------------------------------------------

  constructor(props: Asset) {
    this.id = props.id;
    this.rootId = props.rootId;
    this.parentExternalId = props.parentExternalId;
    this.childCount = props.childCount;
    this.depth = props.depth;
    this.path = props.path;
    this.externalId = props.externalId;
    this.name = props.name;
    this.parentId = props.parentId;
    this.description = props.description;
    this.dataSetId = props.dataSetId;
    this.metadata = props.metadata;
    this.source = props.source;
    this.labels = props.labels;
    this.lastUpdatedTime = props.lastUpdatedTime;
    this.createdTime = props.createdTime;
  }
}
