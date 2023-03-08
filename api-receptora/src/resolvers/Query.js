module.exports = {
    Query: {
        receptora: async (_, { id }, { dataSources }) => {
            console.log("Query.receptora called for id " + id);
            return dataSources.receptoraAPI.getReceptoraById(Number(id));
        },
        receptoras: async (_, __, { dataSources }) => {
            const receptoras = dataSources.receptoraAPI.getReceptoras();
            console.log("Query.receptoras called, returning " + receptoras.length + " receptoras");
            return receptoras;
        },
    },
};
