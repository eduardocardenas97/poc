module.exports = {
    Sucursal: {
        __resolveReference: async ({ id }, { dataSources }) => {
            console.log("Sucursal.__resolveReference called for id " + id);
            return await dataSources.sucursal.getSucursalById(id);
        },
    },
};
