module.exports = {
    Transaccion: {
        __resolveReference: async ({ id }, { dataSources }) => {
            console.log("Transaccion.__resolveReference called for id " + id);
            return dataSources.trxAPI.getTransaccionById(id);
        },
    },
};
