module.exports = {
    Query: {
        obtenerLote: async (parent, args, context, info) => {
            console.log("obtenerLote resolver called");
            const lote = await context.dataSources.loteAPI.getLoteById(args.id);
            console.log("lote: ", lote);
            return lote;
        },
        listarLotes: async (parent, args, context, info) => {
            const lotes = await context.dataSources.loteAPI.getLotes();
            console.log("lotes: ", lotes);
            return lotes;
        },
    },
};
