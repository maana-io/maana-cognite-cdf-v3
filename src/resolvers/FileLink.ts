import { Resolver, Root, Query, Arg, Mutation, ID } from "type-graphql";
import { Cognite } from "../cogniteClient";
import { IdEither, FileLink as CDFFileLink, InternalId, ExternalId } from "../types/common";
import { FileLink } from "../types/FileLink";
import { IdEitherAsInput } from "../types/IdEither";

@Resolver(() => FileLink)
export class FileLinkResolver {
  @Query(() => [FileLink], { description: "Get all the files" })
  async fileLinks(@Arg("ids", () => [IdEitherAsInput]) ids: IdEither[]): Promise<FileLink[]> {
    const links: FileLink[] = [];

    for await (const link of await Cognite.client.files.getDownloadUrls(ids)) {
      const int = link as InternalId;
      const ext = link as ExternalId;
      links.push(
        new FileLink({
          id: int.id || ext.externalId,
          url: link.downloadUrl,
        })
      );
    }
    return links;
  }
}
