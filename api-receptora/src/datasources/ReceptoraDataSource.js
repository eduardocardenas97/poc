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

    /**
     * Lista todas las receptoras
     * @returns {Array} receptoras
     */
    async getReceptoras() {
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        return JSON.parse(receptoraData).receptoras;
    }

    /**
     * Obtiene una receptora por su id
     * @param {String} id
     * @returns {Object} receptora
     */
    async getReceptoraById(id) {
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        const receptora = JSON.parse(receptoraData).receptoras;
        return receptora.find((receptora) => receptora.id == id);
    }

    /**
     * Obtiene las sucursales de una receptora
     * @param {String} id
     * @returns {Array} sucursales
     */
    async getSucursalesByReceptoraId(id) {
        // Listar las sucursales de una receptora
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        const receptoras = JSON.parse(receptoraData).receptoras;
        const receptora = receptoras.find((receptora) => receptora.id == id);
        return receptora.sucursales;
    }
};
