module.exports = {
    Query: {
        obtenerLote: (parent, args, context, info) => {
            console.log("obtenerLote resolver called");
            return {
                id: args.id,
                fechaInicio: "2020-01-01",
                fechaFin: "2020-01-01",
            };
        },
        listarLotes: (parent, args, context, info) => {
            console.log("listarLotes resolver called");
            return [
                {
                    id: "1",
                    fechaInicio: "2020-01-01",
                    fechaFin: "2020-01-01",
                },
                {
                    id: "2",
                    fechaInicio: "2020-01-01",
                    fechaFin: "2020-01-01",
                },
            ];
        }
    }
};