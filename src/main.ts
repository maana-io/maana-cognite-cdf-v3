import "reflect-metadata";
import * as path from "path";
import { buildSchema } from "type-graphql";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { ApolloServer } from "apollo-server";
import { environment } from "./environment";
import pubSub from "./pubsub";
import { InfoResolver } from "./resolvers/Info";
// --------------------------------
// TODO: IMPORT YOUR RESOLVERS HERE
// --------------------------------
import { AssetResolver } from "./resolvers/Asset";
import { FileInfoResolver } from "./resolvers/FileInfo";
import { FileLinkResolver } from "./resolvers/FileLink";
import { TimeseriesResolver } from "./resolvers/Timeseries";
import { AggregateEnumResolver } from "./resolvers/AggregateEnum";
import { DatapointsResolver } from "./resolvers/Datapoints";
// --------------------------------

export interface Context {}

const bootstrap = async () => {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [
      InfoResolver,
      // -----------------------------
      // TODO: ADD YOUR RESOLVERS HERE
      // -----------------------------
      AssetResolver,
      FileInfoResolver,
      FileLinkResolver,
      TimeseriesResolver,
      AggregateEnumResolver,
      DatapointsResolver,
      // -----------------------------
    ],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    pubSub,
  });

  function formatError(error: GraphQLError): GraphQLFormattedError {
    console.error(`[ERROR] ${JSON.stringify(error)}`);
    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
    };
  }

  const server = new ApolloServer({
    schema,
    introspection: environment.apollo.introspection,
    playground: environment.apollo.playground,
    formatError,
  });

  // Start the server
  const { url } = await server.listen(environment.port);
  console.log(`🚀 Server ready at ${url}.`);
};

bootstrap();
