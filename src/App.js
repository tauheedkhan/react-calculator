import React, {useState} from "react";
import Display from "./component/Display";
import Panel from "./component/Panel";
import calculate from "./utils/calculate";
import "./App.css";

const App = () => {
   const [state, setState] = useState({total: null, next: null, operation: null})

   const handleClick = buttonName => setState(calculate(state, buttonName))

   return (
          <div className="app">
            <Display value={state.next || state.total || "0"} />
            <Panel clickHandler={handleClick} />
          </div>
        );   
}

export default App;