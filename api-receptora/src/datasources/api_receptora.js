//read file receptora_data.json and create a datasource
const fs = require("fs");
const path = require("path");
const { DataSource } = require("apollo-datasource");

module.exports = class ReceptoraAPI extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
    }

    async getReceptoras() {
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        return JSON.parse(receptoraData).receptoras;
    }

    async getReceptoraById(id) {
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        const receptora = JSON.parse(receptoraData).receptoras;
        return receptora.find((receptora) => receptora.id === id);
    }
};
