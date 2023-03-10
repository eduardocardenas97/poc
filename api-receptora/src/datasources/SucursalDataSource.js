//read file receptora_data.json and create a datasource
const fs = require("fs");
const path = require("path");
const { DataSource } = require("apollo-datasource");

/**
 * @class SucursalDataSource
 * @description Clase que representa el datasource de sucursal
 */
module.exports = class SucursalDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
    }

    /**
     * Lista todas las sucursales
     * @returns {Array} sucursales
     */
    async getSucursales() {
        // Lee el archivo receptora_data.json y genera un array de sucursales
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        const receptoras = JSON.parse(receptoraData).receptoras;
        const sucursales = receptoras.map((receptora) => receptora.sucursales);
        return sucursales;
    }

    /**
     * Obtiene una sucursal por su id
     * @param {String} id
     * @returns {Object} sucursal
     */
    async getSucursalById(id) {
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        const receptoras = JSON.parse(receptoraData).receptoras;
        const [sucursales] = receptoras.map(
            (receptora) => receptora.sucursales
        );
        return sucursales.find((sucursal) => sucursal.id == id);
    }
};
