import { useEffect, useState } from "react";
import ChatContainer from "./components/ChatContainer/ChatContainer";
import { AppFlexBody, AppMain } from "./App.styles";

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
    <AppFlexBody>
      <AppMain>
        <ChatContainer
          messages={messages}
          sendMsg={sendMsg}
          userId={userId}
          userCount={userCount}
        />
      </AppMain>
    </AppFlexBody>
  );
}

export default App;
