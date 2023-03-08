//read file servicio_data.json and create a datasource
const fs = require("fs");
const path = require("path");
const { DataSource } = require("apollo-datasource");

module.exports = class ServicioAPI extends DataSource {
    constructor() {
        super();
    }

    initialize(config) {
        this.context = config.context;
    }

    async getServicios() {
        const servicioData = fs.readFileSync(
            path.join(__dirname, "servicio_data.json"),
            "utf8"
        );
        return JSON.parse(servicioData).servicios;
    }

    async getServicioById(id) {
        const servicioData = fs.readFileSync(
            path.join(__dirname, "servicio_data.json"),
            "utf8"
        );
        const servicios = JSON.parse(servicioData).servicios;
        return servicios.find((servicio) => servicio.id == id);
    }
};
