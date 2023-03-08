module.exports = {
    Servicio: {
        __resolveReference: async ({ id }, { dataSources }) => {
            return await dataSources.loteAPI.getLoteById(id);
        },
    },
};
