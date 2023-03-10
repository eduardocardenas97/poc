//read file receptora_data.json and create a datasource
const fs = require("fs");
const path = require("path");
const { DataSource } = require("apollo-datasource");

/**
 * @class TerminalDataSource
 * @description Clase que representa el datasource de terminal
 * @extends DataSource
 */
module.exports = class TerminalDataSource extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
    }

    /**
     * Lista todas las terminales
     * @returns {Array} terminales
     */
    async getTerminales() {
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        const receptoras = JSON.parse(receptoraData).receptoras;
        const [sucursales] = receptoras.map(
            (receptora) => receptora.sucursales
        );
        const [terminales] = sucursales.map((sucursal) => sucursal.terminales);
        return terminales;
    }

    /**
     * Obtiene una terminal por su id
     * @param {String} id
     * @returns {Object} terminal
     */
    async getTerminalById(id) {
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        const receptoras = JSON.parse(receptoraData).receptoras;
        const [sucursales] = receptoras.map(
            (receptora) => receptora.sucursales
        );
        const [terminales] = sucursales.map((sucursal) => sucursal.terminales);
        const terminal = terminales.find((terminal) => {
            return terminal.id == id;
        });
       return terminal;
    }

    /**
     * Obtiene las terminales que excluyen un determinado
     * servicio según su id
     * @param {String} id
     * @returns {Array} terminales
     */
    async getTerminalesByExclusionServicioId(id) {
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );

        const receptoras = JSON.parse(receptoraData).receptoras;
        const [sucursales] = receptoras.map(
            (receptora) => receptora.sucursales
        );
        const [terminales] = sucursales.map((sucursal) => sucursal.terminales);
        // si la terminal no tiene servicios excluidos, no se agrega al array
        // de terminales a retornar
        const terminalesExcluyenServicio = terminales.filter((terminal) => {
            if (terminal.serviciosExcluidos) {
                return terminal.serviciosExcluidos.find(
                    (servicio) => servicio.id == id
                );
            }
        });

        return terminalesExcluyenServicio;
    }

    /**
     * Retorna el id de la sucursal a la que pertenece una terminal
     * @param {String} id
     * @returns {String} id de la sucursal
     */
    async getSucursalIdByTerminalId(id) {
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        const receptoras = JSON.parse(receptoraData).receptoras;
        const [sucursales] = receptoras.map(
            (receptora) => receptora.sucursales
        );
        const [sucursal] = sucursales.filter((sucursal) => {
            const terminales = sucursal.terminales;
            //si terminales es undefined, no se agrega a la lista de sucursales
            if (terminales) {
                return terminales.find((terminal) => terminal.id == id);
            }
        });
        return sucursal.id;
    }
};
