const types = {
    ...require("./Transaccion"),
    ...require("./Lote"),
    ...require("./Terminal"),
};

module.exports = {
    ...require("./Query"),
    ...types,
};
