const types = {
    ...require("./Transaccion"),
    ...require("./Lote"),
};

module.exports = {
    ...require("./Query"),
    ...types,
};
