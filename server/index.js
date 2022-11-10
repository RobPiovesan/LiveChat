const startupServer = require("./startup/setupServer");
const configureSockets = require("./startup/configureSockets");

const wsServer = startupServer();
configureSockets(wsServer);
