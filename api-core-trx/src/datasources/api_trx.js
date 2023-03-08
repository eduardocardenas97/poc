//Read file: trx_data.json and create a datasource
const fs = require("fs");
const path = require("path");
const { DataSource } = require("apollo-datasource");

class TrxAPI extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
    }

    async getTransacciones() {
        const trxData = fs.readFileSync(
            path.join(__dirname, "trx_data.json"),
            "utf8"
        );
        return JSON.parse(trxData);
    }

    async getTransaccionById(id) {
        const trxData = fs.readFileSync(
            path.join(__dirname, "trx_data.json"),
            "utf8"
        );
        const trx = JSON.parse(trxData).trx;
        return trx.find((trx) => trx.id === id);
    }

    async getTransaccionesByLoteId(loteId) {
        const trxData = fs.readFileSync(
            path.join(__dirname, "trx_data.json"),
            "utf8"
        );
        const trx = JSON.parse(trxData).trx;
        return trx.filter((trx) => trx.loteId === loteId);
    }

    async getTransaccionesByReceptoraId(receptoraId) {
        const trxData = fs.readFileSync(
            path.join(__dirname, "trx_data.json"),
            "utf8"
        );
        const trx = JSON.parse(trxData).trx;
        return trx.filter((trx) => trx.receptoraId === receptoraId);
    }
}

module.exports = TrxAPI;
