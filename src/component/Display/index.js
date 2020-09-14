import React from "react";

import "./Display.css";

const Display  = props =>  (
      <div className="display">
        <div>{props.value}</div>
      </div>
    );

    export default Display;