import React, { useState } from "react";
import UserChatBubble from "../UserChatBubble/UserChatBubble";
import ServerChatBubble from "../ServerChatBubble/ServerChatBubble";
import UserIcon from "../UserIcon/UserIcon";
import {
  MessagesContainer,
  ChatHeader,
  UserMessageContainer,
  ServerMessageContainer,
  ServerUpdate,
} from "./ChatContainer.styles";
import UserInput from "../UserInput/UserInput";

import "./ChatContainer.css";

export default function ChatContainer({
  messages,
  sendMsg,
  userId,
  userCount,
}) {
  const [input, setInput] = useState();

  return (
    <>
      <MessagesContainer className="messagesconatiner">
        <ChatHeader>Online Users: {userCount}</ChatHeader>
        <UserInput input={input} setInput={setInput} sendMsg={sendMsg} />
        {messages &&
          messages
            .slice(0)
            .reverse()
            .map(({ id, msg }) => {
              if (id === userId) {
                return (
                  <UserMessageContainer>
                    <UserChatBubble>{msg}</UserChatBubble>
                    <UserIcon id={id} />
                  </UserMessageContainer>
                );
              } else if (id === "SERVER") {
                return <ServerUpdate>{msg}</ServerUpdate>;
              } else {
                return (
                  <ServerMessageContainer>
                    <UserIcon id={id} />
                    <ServerChatBubble>{msg}</ServerChatBubble>
                  </ServerMessageContainer>
                );
              }
            })}
      </MessagesContainer>
    </>
  );
}
