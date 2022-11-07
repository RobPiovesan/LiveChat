import React from "react";
import { ServerChatBubble as StyledServerChatBubble } from "./ServerChatBubble.styles";

export default function ServerChatBubble({ children }) {
  return <StyledServerChatBubble>{children}</StyledServerChatBubble>;
}
