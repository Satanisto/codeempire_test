import React from "react";

import { Transition } from "react-transition-group";

const duration = 500;

const appearance_transition = {
  entering: { opacity: 0, display: "none" },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0, display: "none" }
};

export function Appear({ children, in: inProp }) {
  return (
    <Transition in={inProp} timeout={duration}>
      {state => React.cloneElement(children, { style: appearance_transition[state] })}
    </Transition>
  );
}
