import styled from "styled-components";

export const MessagesContainer = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
  padding: 10px;
  height: 100vh;
  align-items: center;
`;

export const ChatHeader = styled.div`
  position: absolute;
  top: 0;
  height: 60px;
  background-color: #bfbfbf;
  max-width: 500px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserMessageContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
`;

export const ServerMessageContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
`;

export const ServerUpdate = styled.div`
  color: #5c5c5c;
  font-size: 13;
`;
