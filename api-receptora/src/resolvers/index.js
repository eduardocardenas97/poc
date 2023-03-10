const types = {
    ...require("./Receptora"),
    ...require("./Sucursal"),
    ...require("./Terminal"),
    ...require("./Servicio"),
};

module.exports = {
    ...require("./Query"),
    ...types,
};
