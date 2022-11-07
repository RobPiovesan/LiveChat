import "./App.css";
import { useEffect, useState } from "react";
import ChatContainer from "./components/ChatContainer/ChatContainer";

const { protocol, host, pathname } = window.location;
let ws_uri;
if (protocol === "https:") {
  ws_uri = "wss:";
} else {
  ws_uri = "ws:";
}
ws_uri += "//" + host + pathname;

const ws = new WebSocket(ws_uri);

function App() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState();
  const [userCount, setUserCount] = useState();

  useEffect(() => {
    ws.onmessage = ({ data }) => {
      const { msg, sender_id, count, uid } = JSON.parse(data);
      setUserCount(count);

      if (uid) {
        setUserId(uid);
      }

      if (msg) {
        setMessages((messages) => [...messages, { msg, id: sender_id }]);
      }
    };
  }, []);

  const sendMsg = (text) => {
    ws.send(JSON.stringify({ msg: text }));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        height: "100vh",
      }}
    >
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "white",
          borderRadius: "15px",
        }}
      >
        <div style={{ maxWidth: "500px", width: "100vw", height: "100vh" }}>
          <ChatContainer
            messages={messages}
            sendMsg={sendMsg}
            userId={userId}
            userCount={userCount}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
