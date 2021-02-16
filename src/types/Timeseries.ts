import { Field, ObjectType, ID, Int } from "type-graphql";

import {
  TimeseriesName,
  TimeseriesIsString,
  TimeseriesUnit,
  TimeseriesIsStep,
  CogniteExternalId,
  CogniteInternalId,
} from "./common";

import { Metadata } from "./Metadata";

@ObjectType({ description: "CDF Timeseries" })
export class Timeseries {
  @Field(() => ID, { description: "The unique identifier of the timeseries" })
  id: string | number;

  @Field(() => ID, { nullable: true, description: "Externally supplied id of the timeseries" })
  externalId?: CogniteExternalId;

  @Field({ description: "The asset name" })
  name?: TimeseriesName;

  @Field(() => Boolean, { nullable: true, description: "" })
  isString?: TimeseriesIsString;

  @Field(() => [Metadata], { nullable: "itemsAndList", description: "" })
  metadata?: Metadata[];

  @Field({ nullable: true, description: "" })
  unit?: TimeseriesUnit;

  @Field(() => ID, { nullable: true, description: "" })
  assetId?: CogniteInternalId;

  @Field(() => ID, { nullable: true, description: "" })
  dataSetId?: CogniteInternalId;

  @Field(() => Boolean, { nullable: true, description: "" })
  isStep?: TimeseriesIsStep;

  @Field({ nullable: true, description: "" })
  description?: string;

  @Field(() => [Int], { nullable: true, description: "" })
  securityCategories?: number[];

  @Field({ description: "" })
  lastUpdatedTime: Date;

  @Field({ description: "" })
  createdTime: Date;

  //-------------------------------------------------------------------------

  constructor(props: Timeseries) {
    this.id = props.id;
    this.externalId = props.externalId;
    this.name = props.name;
    this.isString = props.isString;
    this.metadata = props.metadata;
    this.unit = props.unit;
    this.assetId = props.assetId;
    this.dataSetId = props.dataSetId;
    this.isStep = props.isStep;
    this.description = props.description;
    this.securityCategories = props.securityCategories;
    this.lastUpdatedTime = props.lastUpdatedTime;
    this.createdTime = props.createdTime;
  }
}
