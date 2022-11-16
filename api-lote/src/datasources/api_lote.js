//read file lote_data.json and create a datasource
const fs = require("fs");
const path = require("path");
const { DataSource } = require("apollo-datasource");

module.exports = class LoteAPI extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
    }

    async getLotes() {
        const loteData = fs.readFileSync(
            path.join(__dirname, "lote_data.json"),
            "utf8"
        );
        return JSON.parse(loteData).lotes;
    }

    async getLoteById(id) {
        const loteData = fs.readFileSync(
            path.join(__dirname, "lote_data.json"),
            "utf8"
        );
        const lote = JSON.parse(loteData).lotes;
        return lote.find((lote) => lote.id === id);
    }
};
