import { Field, InputType, Float } from "type-graphql";

import { FileMimeType, FileName, CogniteInternalId } from "./common";
@InputType({ description: "CDF FileFilter (as input)" })
export class FileFilterInput {
  @Field({ nullable: true, description: "" })
  name?: FileName;

  @Field({ nullable: true, description: "" })
  mimeType?: FileMimeType;
  // metadata?: Metadata;

  @Field(() => [Float], {
    nullable: "itemsAndList",
    description: "Only include files that reference these specific asset IDs.",
  })
  assetIds?: CogniteInternalId[];

  // /**
  //  * Only include files that have a related asset in a tree rooted at any of these root assetIds.
  //  */
  // rootAssetIds?: IdEither[];
  // /**
  //  * Only include items that reference these specific dataSet IDs
  //  */
  // dataSetIds?: IdEither[];
  // /**
  //  * Only include files that are related to an asset in a subtree rooted at any of these assetIds.
  //  * If the total size of the given subtrees exceeds 100,000 assets, an error will be returned.
  //  */
  // assetSubtreeIds?: IdEither[];
  // source?: string;
  // createdTime?: DateRange;
  // lastUpdatedTime?: DateRange;
  // uploadedTime?: DateRange;
  // sourceCreatedTime?: DateRange;
  // sourceModifiedTime?: DateRange;
  // externalIdPrefix?: ExternalIdPrefix;
  // uploaded?: boolean;
  // /**
  //  * Return only the resource matching the specified label constraints.
  //  */
  // labels?: LabelFilter;
  // geoLocation?: FileGeoLocationFilter;
}
