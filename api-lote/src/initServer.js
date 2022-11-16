const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const typeDefs = gql(
    readFileSync("./locations.graphql", { encoding: "utf-8" })
);
const resolvers = require("./resolvers");

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    dataSources: () => {
        return {
        };
    },
});

module.exports = server;