import { useEffect, useState } from "react";
import ChatContainer from "./components/ChatContainer/ChatContainer";
import JoinModal from "./components/JoinModal/JoinModal";
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
  const [userName, setUserName] = useState();

  useEffect(() => {
    ws.onmessage = ({ data }) => {
      const { msg, count, join_response } = JSON.parse(data);

      setUserCount(count);

      if (join_response && join_response.username)
        setUserName(join_response.username);
      if (join_response && join_response.id) setUserId(join_response.id);
      if (msg) {
        setMessages((messages) => [...messages, msg]);
      }
    };
  }, []);

  const sendMsg = (text) => {
    ws.send(JSON.stringify({ msg: text }));
  };

  const handleJoin = (name) => {
    ws.send(JSON.stringify({ join_username: name }));
  };

  return (
    <AppFlexBody>
      <AppMain>
        <JoinModal show={!userName} onClick={handleJoin} />
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
