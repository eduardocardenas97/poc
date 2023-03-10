module.exports = {
    Terminal: {
        transacciones: async ({ id }, _, { dataSources }) => {
            return dataSources.trxAPI.getTransaccionesByTerminalId(id);
        },
    },
};
