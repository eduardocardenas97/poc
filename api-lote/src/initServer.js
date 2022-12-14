const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const typeDefs = gql(readFileSync("./lote.graphql", { encoding: "utf-8" }));
const resolvers = require("./resolvers");
const LoteAPI = require("./datasources/api_lote");

module.exports = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    dataSources: () => {
        return {
            loteAPI: new LoteAPI(),
        };
    },
});

