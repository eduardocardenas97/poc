module.exports = {
    Lote: {
        transacciones: async ({ id }, _, { dataSources }) => {
            console.log("Lote.transacciones called for id " + id);
            return dataSources.trxAPI.getTransaccionesByLoteId(id);
        },
        montoTotal: async ({ id }, _, { dataSources }) => {
            console.log("Lote.montoTotal called for id " + id);
            const transacciones =
                await dataSources.trxAPI.getTransaccionesByLoteId(id);
            return transacciones.reduce((sum, trx) => sum + trx.monto, 0);
        },
    },
};
