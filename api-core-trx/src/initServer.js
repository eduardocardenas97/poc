const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const typeDefs = gql(
    readFileSync("./transaccion.graphql", { encoding: "utf-8" })
);
const resolvers = require("./resolvers");
const TrxAPI = require("./datasources/api_trx");

module.exports = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    dataSources: () => {
        return {
            trxAPI: new TrxAPI(),
        };
    },
});
