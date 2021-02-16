// export interface AssetFilter extends Limit {
//   filter?: AssetFilterProps;
// }

import { Field, ID, InputType } from "type-graphql";

import {
  AssetDescription,
  AssetName,
  AssetSource,
  CogniteExternalId,
  CogniteInternalId,
} from "./common";

import { IdEitherInput } from "./IdEither";
import { Metadata } from "./Metadata";

@InputType({ description: "CDF AssetFilter" })
export class AssetFilter {
  @Field({ nullable: true, description: "The asset name" })
  name?: AssetName;

  @Field(() => [ID], {
    nullable: "itemsAndList",
    description: "Return only the direct descendants of the specified assets.",
  })
  parentIds?: CogniteInternalId[];

  @Field(() => [ID], {
    nullable: "itemsAndList",
    description: "Return only the direct descendants of the specified assets.",
  })
  parentExternalIds?: CogniteExternalId[];

  @Field(() => [ID], {
    nullable: "itemsAndList",
    description: "Return only the direct descendants of the specified assets.",
  })
  rootIds?: IdEitherInput[];

  @Field(() => [ID], {
    nullable: "itemsAndList",
    description: "Only include assets that reference these specific dataSet IDs",
  })
  dataSetIds?: IdEitherInput[];
  //   /**
  //    * Only include assets in subtrees rooted at the specified assets.
  //    * If the total size of the given subtrees exceeds 100,000 assets, an error will be returned.
  //    */
  //   assetSubtreeIds?: IdEither[];
  //   /**
  //    * Return only the assets matching the specified label constraints.
  //    */
  // labels?: LabelFilter;
  // metadata?: Metadata;
  // source?: AssetSource;
  // createdTime?: DateRange;
  // lastUpdatedTime?: DateRange;

  @Field({ nullable: true, description: "Filtered assets are root assets or not" })
  root?: boolean;

  // externalIdPrefix?: ExternalIdPrefix;
}
