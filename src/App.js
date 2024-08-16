import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <h1>Light Out Game!</h1>
        <Board nrows={8} ncols={8} chanceLightStartsOn={0.6}/>
      </div>
  );
}

export default App;
