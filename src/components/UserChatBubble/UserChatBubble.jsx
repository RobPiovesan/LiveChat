import React from "react";
import { UserChatBubble as StyledUserChatBubble } from "./UserChatBubble.styles";

export default function UserChatBubble({ children }) {
  return <StyledUserChatBubble>{children}</StyledUserChatBubble>;
}
