require("dotenv").config();
const { logger } = require("fi-utils");
require("./config");
const fs = require("fs");
const path = require("path");
const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { Kafka } = require("kafkajs");
const {
    facturadorDataSource,
    receptoraDataSource,
    kafkaDataSource,
    loteDataSource,
} = require("./datasources");
const resolvers = require("./resolvers/index");
const {
    ApolloServerPluginLandingPageLocalDefault,
} = require("apollo-server-core");


const log = logger.get();
const { MongoClient } = require("mongodb");

async function createMongoClient(log) {
    const client = new MongoClient(process.env.DB_MONGO_URI);
    try {
        log.info("🖨️- Conectando a MongoDB: " + process.env.DB_MONGO_URI);
        await client.connect();
        await client.db(process.env.DB_MONGO_NAME).command({ ping: 1 });
        log.info("🌲 Connected to MongoDB");
    } catch (e) {
        log.error(e);
    }
    return client;
}

async function createKafkaProducer(log) {
    log.info("🖨️- Creando cliente de Kafka");
    const kafkaClient = new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKER_URI],
    });

    log.info(`🖨️- Conectando a Kafka en ${process.env.KAFKA_BROKER_URI}`);
    const producer = kafkaClient.producer();
    await producer.connect();
    log.info(`✅ Kafka Producer creado en ${process.env.KAFKA_BROKER_URI}`);
    return producer;
}

(async () => {
    const kafkaProducer = await createKafkaProducer(log).catch((err) => {
        log.error(err);
        process.exit(1);
    });

    const mongoClient = await createMongoClient(log).catch((err) => {
        log.error(err);
        process.exit(1);
    });

    const typeDefs = gql(
        fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8")
    );
    const server = new ApolloServer({
        schema: buildSubgraphSchema({ typeDefs, resolvers }),
        dataSources: () => ({
            lote: new loteDataSource(process.env.API_LOTE_URL),
            facturador: new facturadorDataSource(
                process.env.API_FACTURADOR_URL
            ),
            receptora: new receptoraDataSource(process.env.API_RECEPTORA_URL),
            kafka: new kafkaDataSource(kafkaProducer),
            mongoDB: mongoClient
                .db(process.env.DB_MONGO_NAME)
                .collection("transacciones"),
        }),
        csrfPrevention: true,
        cache: "bounded",
        plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
        context: async ({ req, res }) => ({
            req,
            log: (() => {
                const log = logger.get();
                res.header("id", log.id.value);
                return log;
            })(),
        }),
    });

    server.listen({ port: process.env.PORT }).then(({ url }) => {
        log.info(`🚀  Server ready at ${url}`);
    });
})();
