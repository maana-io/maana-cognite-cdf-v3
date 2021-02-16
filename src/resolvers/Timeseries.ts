import { Resolver, Root, Query, Arg, Mutation, ID } from "type-graphql";
import { Timeseries as CogniteTimeseries } from "@cognite/sdk";
import { Cognite } from "../cogniteClient";
import { InternalId, ExternalId } from "../types/common";
import { Timeseries } from "../types/Timeseries";
import { IdEither } from "../types/IdEither";

@Resolver(() => Timeseries)
export class TimeseriesResolver {
  /**
   * Convert a Cognite Timeseris to a Kind
   * @param timeseries
   */
  private mk_timeseries(timeseries: CogniteTimeseries): Timeseries {
    return new Timeseries({
      id: timeseries.id,
      externalId: timeseries.externalId,
      name: timeseries.name,
      isString: timeseries.isString,
      metadata: timeseries.metadata
        ? Object.entries(timeseries.metadata).map(([id, value]) => ({ id, value }))
        : undefined,
      unit: timeseries.unit,
      assetId: timeseries.assetId,
      dataSetId: timeseries.dataSetId,
      isStep: timeseries.isStep,
      description: timeseries.description,
      securityCategories: timeseries.securityCategories,
      lastUpdatedTime: timeseries.lastUpdatedTime,
      createdTime: timeseries.createdTime,
    });
  }

  /**
   * All timeseries
   */
  @Query(() => [Timeseries], { description: "Get all the timeseries" })
  async timeseries(): Promise<Timeseries[]> {
    const ts: Timeseries[] = [];
    for await (const timeseries of Cognite.client.timeseries.list()) {
      ts.push(this.mk_timeseries(timeseries));
    }
    return ts;
  }

  // /**
  //  * Retrieve (qualified) assets
  //  */
  // @Query(() => [Timeseries], { nullable: true, description: "Retrieve (qualified) timeseries" })
  // async retrieve(
  //   @Arg("id", () => ID, { nullable: true }) id: number,
  //   @Arg("externalId", () => ID, { nullable: true }) externalId: string
  // ): Promise<Timeseries[] | undefined> {
  //   const assets: CogniteTimeseries[] = await Cognite.client.assets.retrieve([{ id, externalId }]);
  //   return assets ? assets.map(this.mk_timeseries) : undefined;
  // }
}
