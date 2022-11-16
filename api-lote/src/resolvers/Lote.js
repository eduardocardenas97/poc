module.exports = {
    Lote: {
        __resolveReference: async ({ id }, { dataSources }) => {
            return await dataSources.loteAPI.getLoteById(id);
        },
    },
};
