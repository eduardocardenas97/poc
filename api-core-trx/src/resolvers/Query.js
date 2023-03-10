module.exports = {
    Query: {
        obtenerTRX: async (parent, args, context, info) => {
            console.log("obtenerTRX resolver called");
            const trx = await context.dataSources.trxAPI.getTransaccionById(
                args.id
            );
            console.log("trx: ", trx);
            /**
             * Para que el reference resolver funcione, el objeto que se retorna
             * debe tener un campo con el nombre del tipo de dato que se está
             * resolviendo, en este caso, "lote", y dentro de ese campo, una
             * propiedad con un campo llamado "id"
             */
            return {
                ...trx,
                lote: {
                    id: trx.loteId,
                },
                terminal: {
                    id: trx.terminalId,
                },
                servicio: {
                    id: trx.servicioId,
                },
            };
        },
    },
};
