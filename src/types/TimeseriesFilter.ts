// export interface AssetFilter extends Limit {
//   filter?: AssetFilterProps;
// }

import { Field, ID, InputType } from "type-graphql";

import {
  TimeseriesName,
  TimeseriesIsString,
  TimeseriesUnit,
  TimeseriesIsStep,
  CogniteExternalId,
  CogniteInternalId,
} from "./common";

import { IdEitherAsInput } from "./IdEither";
import { Metadata } from "./Metadata";

@InputType({ description: "CDF TimeseriesFilter" })
export class TimeseriesFilter {
  @Field({ nullable: true, description: "The timeseries name" })
  name?: TimeseriesName;

  @Field({ nullable: true, description: "" })
  unit?: TimeseriesUnit;

  @Field(() => Boolean, { nullable: true, description: "" })
  isString?: TimeseriesIsString;

  @Field(() => Boolean, { nullable: true, description: "" })
  isStep?: TimeseriesIsStep;

  // @Field(() => [Metadata], { nullable: "itemsAndList", description: "" })
  // metadata?: Metadata[];

  @Field(() => [ID], { nullable: "itemsAndList", description: "" })
  assetIds?: CogniteInternalId[];

  @Field(() => [ID], { nullable: "itemsAndList", description: "" })
  rootAssetIds?: CogniteInternalId[];

  @Field(() => [ID], { nullable: "itemsAndList", description: "" })
  dataSetIds?: IdEitherAsInput[];

  @Field(() => [IdEitherAsInput], {
    nullable: "itemsAndList",
    description:
      "Only include timeseries that are related to an asset in a subtree rooted at any of these assetIds.  If the total size of the given subtrees exceeds 100,000 assets, an error will be returned.",
  })
  assetSubtreeIds?: IdEitherAsInput[];
}
