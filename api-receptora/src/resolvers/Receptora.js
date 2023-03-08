module.exports = {
    Receptora: {
        __resolveReference: async ({ id }, { dataSources }) => {
            return await dataSources.receptoraAPI.getReceptoraById(id);
        },
    },
};
