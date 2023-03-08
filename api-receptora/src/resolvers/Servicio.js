module.exports = {
    Servicio: {
        receptorasExcluidas: async ({ id }, _, { dataSources }) => {
            //retorna las receptoras excluidas de un servicio
            return dataSources.receptoraAPI.getReceptorasExcluidas(id);
        },
    },
};
