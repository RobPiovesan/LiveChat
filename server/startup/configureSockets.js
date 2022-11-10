const { getUniqueID, sendToActiveClients } = require("../helpers");

const handleOnMessage = (data, socket, wsServer) => {
  const { msg, join_username } = JSON.parse(data.toString());

  if (join_username) {
    socket.username = join_username;
    socket.send(
      JSON.stringify({
        join_response: { username: socket.username, id: socket.id },
      })
    );

    sendToActiveClients(wsServer.clients, {
      msg: {
        text: `${socket.username} has joined the chat`,
        id: "SERVER",
      },
      count: wsServer.clients.size,
    });
  }

  if (msg) {
    sendToActiveClients(wsServer.clients, {
      msg: {
        text: msg,
        id: socket.id,
        username: socket.username,
      },
      count: wsServer.clients.size,
    });
  }
};

const handleOnClose = (socket, wsServer) => {
  if (socket.username) {
    sendToActiveClients(wsServer.clients, {
      msg: {
        text: `${socket.username} has left the chat`,
        id: "SERVER",
      },
      count: wsServer.clients.size,
    });
  }
};

module.exports = (wsServer) => {
  wsServer.on("connection", (socket) => {
    socket.id = getUniqueID();
    socket.on("message", (data) => handleOnMessage(data, socket, wsServer));
    socket.on("close", () => handleOnClose(socket, wsServer));
  });
};
