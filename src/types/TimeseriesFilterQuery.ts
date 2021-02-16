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

import { TimeseriesFilter } from "./TimeseriesFilter";

import { IdEitherAsInput } from "./IdEither";
import { Metadata } from "./Metadata";

@InputType({ description: "CDF TimeseriesFilterQuery" })
export class TimeseriesFilterQuery {
  // @Field({ nullable: true, description: "" })
  // limit?: number;

  @Field(() => TimeseriesFilter, {
    nullable: true,
    description: "Filter on timeseries with exact match",
  })
  filter?: TimeseriesFilter;
}
