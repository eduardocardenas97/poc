const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const typeDefs = gql(readFileSync("./receptora.graphql", { encoding: "utf-8" }));
const resolvers = require("./resolvers");
const ReceptoraAPI = require("./datasources/api_receptora");

module.exports = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    dataSources: () => {
        return {
            receptoraAPI: new ReceptoraAPI(),
        };
    },
});
