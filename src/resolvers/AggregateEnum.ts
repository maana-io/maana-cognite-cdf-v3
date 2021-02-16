import { Resolver, Query } from "type-graphql";
import { AggregateEnum, aggregates } from "../types/AggregateEnum";


@Resolver()
export class AggregateEnumResolver {
  @Query(() => [AggregateEnum], { description: "Information about the current service" })
  aggregates(): AggregateEnum[] {
    return aggregates.map((x) => new AggregateEnum(x));
  }
}
