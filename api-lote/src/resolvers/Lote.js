module.exports = {
    Lote: (parent, args, context, info) => {
        console.log("Lote type resolver called");
        return {
            id: args.id,
            fechaInicio: "2020-01-01",
            fechaFin: "2020-01-01",
        };
    },
};
