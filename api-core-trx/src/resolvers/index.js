const types = {
    ...require("./Transaccion"),
    ...require("./Lote"),
    ...require("./Receptora"),
};

module.exports = {
    ...require("./Query"),
    ...types,
};
