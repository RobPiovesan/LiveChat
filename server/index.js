const WebSocket = require("ws");
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const PORT = process.env.PORT || 3000;

const myServer = app.listen(PORT);

getUniqueID = function () {
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

const wsServer = new WebSocket.Server({
  noServer: true,
});

wsServer.on("connection", (ws, req) => {
  ws.id = getUniqueID();
  ws.send(JSON.stringify({ uid: ws.id }));

  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          msg: `${ws.id} has joined the chat`,
          sender_id: "SERVER",
          count: wsServer.clients.size,
        })
      );
    }
  });

  ws.on("message", (data) => {
    const { msg } = JSON.parse(data.toString());
    if (msg) {
      sendToActiveClients(wsServer.clients, {
        msg,
        sender_id: ws.id,
        count: wsServer.clients.size,
      });
    }
  });

  ws.on("close", () => {
    sendToActiveClients(wsServer.clients, {
      msg: `${ws.id} has left the chat`,
      sender_id: "SERVER",
      count: wsServer.clients.size,
    });
  });
});

myServer.on("upgrade", async function upgrade(request, socket, head) {
  wsServer.handleUpgrade(request, socket, head, function done(ws) {
    wsServer.emit("connection", ws, request);
  });
});
