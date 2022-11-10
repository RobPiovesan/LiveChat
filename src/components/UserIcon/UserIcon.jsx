import React from "react";
import { PersonCircle } from "react-bootstrap-icons";
import ReactTooltip from "react-tooltip";

export default function UserIcon({ id, name }) {
  return (
    <div data-tip={name} style={{ marginLeft: "5px", marginRight: "5px" }}>
      <PersonCircle size={30} />
      <ReactTooltip />
    </div>
  );
}
