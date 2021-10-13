import React, { useState } from "react";

import { createGrid } from "./Functions";
import Grid from "./components/Grid/Grid";
import "./App.scss";

function App() {
  const [depth, setDepth] = useState(8);
  const [startHue, setStartHue] = useState(0);
  const [endHue, setEndHue] = useState(120);

  const cells = createGrid(depth);

  return (
    <div className="App">
      <div className="controls">
        <input
          type="range"
          value={depth}
          onChange={(e) => setDepth(+e.target.value)}
          min={1}
          max={20}
        />
        <input
          type="range"
          value={startHue}
          onChange={(e) => setStartHue(+e.target.value)}
          min={0}
          max={720}
        />
        <input
          type="range"
          value={endHue}
          onChange={(e) => setEndHue(+e.target.value)}
          min={0}
          max={720}
        />
      </div>
      <div className="viewer">
        <Grid
          cells={cells}
          startHue={startHue}
          endHue={endHue}
          maximumDepth={depth}
        />
      </div>
    </div>
  );
}

export default App;
