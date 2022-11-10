const path = require("path");
const WebSocket = require("ws");
const express = require("express");
const app = express();

module.exports = () => {
  app.use(express.static(path.join(__dirname, "..", "..", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
  });

  const PORT = process.env.PORT || 3000;

  const wsServer = new WebSocket.Server({
    noServer: true,
  });

  const myServer = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });

  myServer.on("upgrade", async (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, function done(ws) {
      wsServer.emit("connection", ws, request);
    });
  });

  return wsServer;
};
