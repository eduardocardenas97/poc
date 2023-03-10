// Resolver para retornar una terminal según su id
module.exports = {
    Terminal: {
        __resolveReference: async ({ id }, { dataSources }) => {
            return await dataSources.terminal.getTerminalById(id);
        },

        serviciosExcluidos: async ({ id }, _, { dataSources }) => {
            console.log("Terminal.serviciosExcluidos called for id " + id);
            const servicios = await dataSources.terminal.getTerminalById(id);
            return servicios.serviciosExcluidos;
        },
    },
};
