import { Resolver, Root, Query, Arg, Mutation, ID } from "type-graphql";
import {
  DatapointsQuery as CDFDatapointsQuery,
  DatapointsMultiQuery as CDFDatapointsMultiQuery,
  Aggregate
} from "@cognite/sdk";
import { Cognite } from "../cogniteClient";
import { Datapoints } from "../types/Datapoints";
import { DatapointsUnion } from "../types/DatapointsUnion";
import { DatapointsMultiQuery } from "../types/DatapointsMultiQuery";
import { DatapointsQuery } from "../types/DatapointsQuery";

@Resolver(() => Datapoints)
export class DatapointsResolver {


  private mk_cdf_datapoints_query(item: DatapointsQuery): CDFDatapointsQuery {
    return {
      ...(item.id as number ? { id: item.id as number } : { externalId: item.externalId as string }),
      limit: item.limit,
      start: item.start?.value(),
      end: item.end?.value(),
      aggregates: item.aggregates?.map(x => x as Aggregate),
      granularity: item.granularity,
      includeOutsidePoints: item.includeOutsidePoints
    }
  }

  private mk_cdf_datapoints_multiquery(filter: DatapointsMultiQuery): CDFDatapointsMultiQuery {
    return { items: filter.items.map(this.mk_cdf_datapoints_query) }
  }

  @Query(() => DatapointsUnion, { description: "Get all the datapoints" })
  async datapoints(
    @Arg("filter", () => DatapointsMultiQuery) filter: DatapointsMultiQuery
  ): Promise<DatapointsUnion> {
    const query = this.mk_cdf_datapoints_multiquery(filter)
    const result = await Cognite.client.datapoints.retrieve(query);
    return new DatapointsUnion(result);
  }
}
