import { Resolver, Root, Query, Arg, Mutation, ID } from "type-graphql";
import { Asset as CDFAsset } from "@cognite/sdk";
import { Cognite } from "../cogniteClient";
import { InternalId, ExternalId } from "../types/common";
import { Asset } from "../types/Asset";
import { AssetListScope } from "../types/AssetListScope";
import { IdEither } from "../types/IdEither";

@Resolver(() => Asset)
export class AssetResolver {
  private mk_asset(asset: CDFAsset): Asset {
    return new Asset({
      id: asset.id,
      rootId: asset.rootId,
      parentExternalId: asset.parentExternalId,
      childCount: asset.aggregates?.childCount,
      depth: asset.aggregates?.depth,
      path: asset.aggregates?.path?.map((idEither) => {
        const int = idEither as InternalId;
        const ext = idEither as ExternalId;
        return new IdEither({
          id: int?.id,
          externalId: ext?.externalId,
        });
      }),
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
      lastUpdatedTime: asset.lastUpdatedTime,
      createdTime: asset.createdTime,
    });
  }

  @Query(() => [Asset], { description: "Get all the assets" })
  async assets(
    @Arg("scope", () => AssetListScope, { nullable: true }) scope: AssetListScope
  ): Promise<Asset[]> {
    const assets: Asset[] = [];
    for await (const asset of Cognite.client.assets.list(scope)) {
      assets.push(this.mk_asset(asset));
    }
    return assets;
  }

  @Query(() => [Asset], { nullable: true, description: "Retrieve (qualified) assets" })
  async retrieve(
    @Arg("id", () => ID, { nullable: true }) id: number,
    @Arg("externalId", () => ID, { nullable: true }) externalId: string
  ): Promise<Asset[] | undefined> {
    const assets: CDFAsset[] = await Cognite.client.assets.retrieve([{ id, externalId }]);
    return assets ? assets.map(this.mk_asset) : undefined;
  }
}
