module.exports = {
    Query: {
        obtenerTRX: async (parent, args, context, info) => {
            console.log("obtenerTRX resolver called");
            const trx = await context.dataSources.trxAPI.getTransaccionById(
                args.id
            );
            console.log("trx: ", trx);
            return trx;
        },
    },
};
