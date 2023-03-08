module.exports = {
    Query: {
        servicio: async (_, { id }, { dataSources }) => {
            console.log("Query.servicio called for id " + id);
            return dataSources.servicioAPI.getServicioById(Number(id));
        },
        servicios: async (_, __, { dataSources }) => {
            return dataSources.servicioAPI.getServicios();
        },
    },
};
