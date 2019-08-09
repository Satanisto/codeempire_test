import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faTimes } from "@fortawesome/free-solid-svg-icons";

function Icon({ icon }) {
  return icon;
}

export function FaHamburger() {
  return <Icon icon={<FontAwesomeIcon icon={faHamburger} />} />;
}

export function FaClose() {
  return <Icon icon={<FontAwesomeIcon icon={faTimes} />} />;
}
