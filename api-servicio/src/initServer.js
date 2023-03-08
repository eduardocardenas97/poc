const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const typeDefs = gql(readFileSync("./servicio.graphql", { encoding: "utf-8" }));
const resolvers = require("./resolvers");
const ServicioAPI = require("./datasources/api_servicio");

module.exports = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    dataSources: () => {
        return {
            servicioAPI: new ServicioAPI(),
        };
    },
});
