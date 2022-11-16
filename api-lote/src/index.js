const server = require("./initServer");

const port = 4001;
const subgraphName = "locations";

server
    .listen({ port })
    .then(({ url }) => {
        console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
    })
    .catch((err) => {
        console.error(err);
    });
