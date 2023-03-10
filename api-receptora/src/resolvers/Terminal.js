// Resolver para retornar una terminal según su id
module.exports = {
    Terminal: {
        __resolveReference: async ({ id }, { dataSources }) => {
            console.log("Terminal.__resolveReference called for id " + id);
            return {
                ...(await dataSources.terminal.getTerminalById(id)),
                sucursal: await dataSources.sucursal.getSucursalById(
                    await dataSources.terminal.getSucursalIdByTerminalId(id)
                ),
            };
        },

        serviciosExcluidos: async ({ id }, _, { dataSources }) => {
            console.log("Terminal.serviciosExcluidos called for id " + id);
            const servicios = await dataSources.terminal.getTerminalById(id);
            return servicios.serviciosExcluidos;
        },
    },
};
