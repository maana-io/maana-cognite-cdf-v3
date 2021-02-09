import { Resolver, Root, Query, Arg, Mutation, ID } from "type-graphql";
import { FileInfo as CogniteFileInfo } from "@cognite/sdk";
import { Cognite } from "../cogniteClient";
import { InternalId, ExternalId } from "../types/common";
import { FileInfo } from "../types/FileInfo";
import { FileFilterInput } from "../types/FileFilter";
import { IdEither } from "../types/IdEither";

@Resolver(() => FileInfo)
export class FileInfoResolver {
  /**
   * Convert a Cognite FileInfo to a Kind
   * @param fileInfo
   */
  mkFileInfo(fileInfo: CogniteFileInfo): FileInfo {
    return new FileInfo({
      // FileInfo
      id: fileInfo.id,
      // ExternalFileInfo
      externalId: fileInfo.externalId,
      name: fileInfo.name,
      mimeType: fileInfo.mimeType,
      metadata: fileInfo.metadata
        ? Object.entries(fileInfo.metadata).map(([id, value]) => ({ id, value }))
        : undefined,
      assetIds: fileInfo.assetIds,
      dataSetId: fileInfo.dataSetId,
      labels: fileInfo.labels?.map((x) => x.externalId),
      // CreatedAndLastUpdatedTime
      lastUpdatedTime: fileInfo.lastUpdatedTime,
      createdTime: fileInfo.createdTime,
    });
  }

  /**
   * All assets
   */
  @Query(() => [FileInfo], { description: "Get all the files" })
  async fileInfos(
    @Arg("filter", () => FileFilterInput, { nullable: true }) filter: FileFilterInput
  ): Promise<FileInfo[]> {
    const fileInfos: FileInfo[] = [];
    // const files = await client.files.list({ filter: { mimeType: 'image/png' } });

    for await (const fileInfo of Cognite.client.files.list({ filter })) {
      fileInfos.push(this.mkFileInfo(fileInfo));
    }
    return fileInfos;
  }

  // /**
  //  * Retrieve (qualified) assets
  //  */
  // @Query(() => [Asset], { nullable: true, description: "Retrieve (qualified) assets" })
  // async retrieve(
  //   @Arg("id", () => ID, { nullable: true }) id: number,
  //   @Arg("externalId", () => ID, { nullable: true }) externalId: string
  // ): Promise<Asset[] | undefined> {
  //   const assets: CogniteAsset[] = await Cognite.client.assets.retrieve([{ id, externalId }]);
  //   return assets ? assets.map(this.mk_asset) : undefined;
  // }
}
