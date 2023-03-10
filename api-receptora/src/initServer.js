const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const typeDefs = gql(
    readFileSync("./receptora.graphql", { encoding: "utf-8" })
);
const resolvers = require("./resolvers");
const ReceptoraDataSource = require("./datasources/ReceptoraDataSource");
const SucursalDataSource = require("./datasources/SucursalDataSource");
const TerminalDataSource = require("./datasources/TerminalDataSource");

module.exports = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    dataSources: () => {
        return {
            receptoraAPI: new ReceptoraDataSource(),
            sucursal: new SucursalDataSource(),
            terminal: new TerminalDataSource(),
        };
    },
});
