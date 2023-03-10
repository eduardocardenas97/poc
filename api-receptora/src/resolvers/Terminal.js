// Resolver para retornar una terminal según su id
module.exports = {
    Terminal: {
        __resolveReference: async ({ id }, { dataSources }) => {
            return await dataSources.terminal.getTerminalById(id);
        },

        serviciosExcluidos: async ({ id }, _, { dataSources }) => {
            return await dataSources.terminal.getTerminalById(id)
                .serviciosExcluidos;
        },
    },
};
