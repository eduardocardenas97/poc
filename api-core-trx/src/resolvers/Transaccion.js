module.exports = {
    Transaccion: () => {
        return {
            tipo: "PAGO",
            moneda: "GUARANI",
            monto: 1000,
            red: "PagoExpress",
        }
    },
};