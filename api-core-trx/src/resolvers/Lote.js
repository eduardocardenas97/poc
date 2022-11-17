module.exports = {
    Lote: {
        transacciones: async ({ id }, _, { dataSources }) => {
            console.log("Lote.id =>", id);
            const trxs =
                await dataSources.trxAPI.getTransaccionesByLoteId(id);
            return trxs;
        },
        montoTotal: async ({ id }, _, { dataSources }) => {
            console.log("Lote.montoTotal called for id " + id);
            const transacciones =
                await dataSources.trxAPI.getTransaccionesByLoteId(id);
            return transacciones.reduce((sum, trx) => sum + trx.monto, 0);
        },
        cantidadTransacciones: async ({ id }, _, { dataSources }) => {
            console.log("Lote.cantidadTransacciones called for id " + id);
            const transacciones =
                await dataSources.trxAPI.getTransaccionesByLoteId(id);
            return transacciones.length;
        },
    },
};
