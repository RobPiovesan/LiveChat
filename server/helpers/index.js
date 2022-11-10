const WebSocket = require("ws");

const getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}-${s4()}-${s4()}`;
};

const sendToActiveClients = (clients, msgObj) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(msgObj));
    }
  });
};

module.exports = { getUniqueID, sendToActiveClients };
