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
        return receptora.find((receptora) => receptora.id == id);
    }

    async getReceptorasExcluidas(idServicio) {
        //retorna las receptoras excluidas de un servicio
        const receptoraData = fs.readFileSync(
            path.join(__dirname, "receptora_data.json"),
            "utf8"
        );
        // los servicios excluidos de una receptora están en el array "serviciosExcluidos" que a su vez contiene un objeto con el id del servicio
        //Ej:
        // {
        //     "id": 1,
        //     "nombre": "Receptor 1",
        //     "direccion": "Calle 1",
        //     "telefono": "123456789",
        //     "serviciosExcluidos": [
        //         {
        //             "id": 1
        //         },
        //         {
        //             "id": 2
        //         }
        //     ]
        // }
        const receptoras = JSON.parse(receptoraData).receptoras;
        const receptorasExcluidas = receptoras.filter((receptora) => {
            const serviciosExcluidos = receptora.serviciosExcluidos;
            //si el array se encuentra vacío, o no existe, no se excluye ningún servicio
            return serviciosExcluidos
                ? serviciosExcluidos.find(
                      (servicio) => servicio.id === idServicio
                  )
                : false;
        });
        console.log("receptorasExcluidas: ", receptorasExcluidas);
        return receptorasExcluidas;
    }
};
