import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SendFill } from "react-bootstrap-icons";

export default function UserInput({ sendMsg, setInput, input }) {
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      sendMsg(input);
      setInput("");
    }
  };

  return (
    <InputGroup className="mb-1 mt-3" value={input}>
      <Form.Control
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Input"
        aria-label="Input"
        aria-describedby="basic-addon2"
        onKeyPress={handleKeypress}
      />
      <Button
        onClick={() => {
          sendMsg(input);
          setInput("");
        }}
        id="button-addon2"
      >
        <SendFill />
      </Button>
    </InputGroup>
  );
}
