module.exports = {
    Query: {
        receptora: async (_, { id }, { dataSources }) => {
            console.log("Query.receptora called for id " + id);
            const receptora = await dataSources.receptoraAPI.getReceptoraById(
                Number(id)
            );
            console.log(receptora);

            return receptora;
        },
        receptoras: async (_, __, { dataSources }) => {
            const receptoras = await dataSources.receptoraAPI.getReceptoras();
            console.log(
                "Query.receptoras called, returning " +
                    receptoras.length +
                    " receptoras"
            );
            console.log(receptoras[0].sucursales[0].terminales[0]);
            return receptoras;
        },
        terminales: async (_, __, { dataSources }) => {
            const terminales = await dataSources.terminal.getTerminales();
            console.log(
                "Query.terminales called, returning " +
                    terminales.length +
                    " terminales"
            );

            for (let i = 0; i < terminales.length; i++) {
                const id = await dataSources.terminal.getSucursalIdByTerminalId(
                    terminales[i].id
                );
                terminales[i] = {
                    ...terminales[i],
                    sucursal: {
                        ...(await dataSources.sucursal.getSucursalById(id)),
                    },
                };
            }
            return terminales;
        },
    },
};
