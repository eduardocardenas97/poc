module.exports = {
    Servicio: {
        __resolveReference: async ({ id }, { dataSources }) => {
            console.log("Servicio.__resolveReference called for id " + id);
            const servicio = await dataSources.servicioAPI.getServicioById(id);
            console.log(servicio);
            return servicio;
        },
    },
};
