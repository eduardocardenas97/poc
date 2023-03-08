const types = {
    ...require("./Receptora"),
    ...require("./Servicio"),
};

module.exports = {
    ...require("./Query"),
    ...types,
};
