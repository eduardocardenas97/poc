module.exports = {
    Servicio: {
        terminalesExcluidas: async ({ id }, _, { dataSources }) => {
            //retorna las receptoras excluidas de un servicio
            return dataSources.terminal.getTerminalesByExclusionServicioId(id);
        },
    },
};
