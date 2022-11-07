import React from "react";
import { PersonCircle } from "react-bootstrap-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function UserIcon({ id }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {id}
    </Tooltip>
  );
  return (
    <div style={{ marginLeft: "5px", marginRight: "5px" }}>
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <PersonCircle size={30} />
      </OverlayTrigger>
    </div>
  );
}
