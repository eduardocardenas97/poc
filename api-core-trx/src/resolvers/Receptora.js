module.exports = {
    Receptora: {
        transacciones: async ({ id }, _, { dataSources }) => {
            return dataSources.trxAPI.getTransaccionesByReceptoraId(id);
        },
    },
};
