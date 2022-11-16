module.exports = {
    transacciones: async (parent, args, context, info) => {
        console.log("transacciones resolver called");
        const trx = await context.dataSources.trxAPI.getTransaccionesByLoteId(
            args.id
        );
        console.log("trx: ", trx);
        return trx;
    },
};
