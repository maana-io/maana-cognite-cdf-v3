import { Resolver, Root, Query, Arg, Mutation, ID } from "type-graphql";
import { Asset as CogniteAsset } from "@cognite/sdk";
import { Cognite } from "../cogniteClient";
import { InternalId, ExternalId } from "../types/common";
import { Asset } from "../types/Asset";
import { IdEither } from "../types/IdEither";

@Resolver(() => Asset)
export class AssetResolver {
  /**
   * Convert a Cognite Asset to a Kind
   * @param asset
   */
  private mk_asset(asset: CogniteAsset): Asset {
    return new Asset({
      // Asset
      id: asset.id,
      rootId: asset.rootId,
      parentExternalId: asset.parentExternalId,
      // AggregateResults
      childCount: asset.aggregates?.childCount,
      depth: asset.aggregates?.depth,
      path: asset.aggregates?.path?.map((idEither) => {
        const int = idEither as InternalId;
        const ext = idEither as ExternalId;
        return new IdEither({
          id: int?.id || ext?.externalId,
          internalId: int?.id,
          externalId: ext?.externalId,
        });
      }),
      // ExternalAsset
      externalId: asset.externalId,
      name: asset.name,
      parentId: asset.parentId,
      description: asset.description,
      dataSetId: asset.dataSetId,
      metadata: asset.metadata
        ? Object.entries(asset.metadata).map(([id, value]) => ({ id, value }))
        : undefined,
      source: asset.source,
      labels: asset.labels?.map((x) => x.externalId),
      // CreatedAndLastUpdatedTime
      lastUpdatedTime: asset.lastUpdatedTime,
      createdTime: asset.createdTime,
    });
  }

  /**
   * All assets
   */
  @Query(() => [Asset], { description: "Get all the assets" })
  async assets(): Promise<Asset[]> {
    const assets: Asset[] = [];
    for await (const asset of Cognite.client.assets.list()) {
      assets.push(this.mk_asset(asset));
    }
    return assets;
  }

  /**
   * Retrieve (qualified) assets
   */
  @Query(() => [Asset], { nullable: true, description: "Retrieve (qualified) assets" })
  async retrieve(
    @Arg("id", () => ID, { nullable: true }) id: number,
    @Arg("externalId", () => ID, { nullable: true }) externalId: string
  ): Promise<Asset[] | undefined> {
    const assets: CogniteAsset[] = await Cognite.client.assets.retrieve([{ id, externalId }]);
    return assets ? assets.map(this.mk_asset) : undefined;
  }
}
