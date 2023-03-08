module.exports = {
    Query: {
        receptora: async (_, { id }, { dataSources }) => {
            console.log("Query.receptora called for id " + id);
            const receptora = await dataSources.receptoraAPI.getReceptoraById(Number(id));
            console.log(receptora);

            return receptora;
        },
        receptoras: async (_, __, { dataSources }) => {
            const receptoras = await dataSources.receptoraAPI.getReceptoras();
            console.log("Query.receptoras called, returning " + receptoras.length + " receptoras");
            return receptoras;
        },
    },
};
