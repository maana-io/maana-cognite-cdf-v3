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

import { AssetFilter } from "../types/AssetFilter";

import { IdEitherInput } from "./IdEither";
import { Metadata } from "./Metadata";

@InputType({ description: "CDF AssetListScope" })
export class AssetListScope {
  // @Field({ nullable: true, description: "" })
  // limit?: number;

  @Field(() => AssetFilter, { nullable: true, description: "Filter on assets with exact match" })
  filter?: AssetFilter;
}
