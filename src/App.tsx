import React, { useState } from "react";

import { createGrid } from "./Functions";
import Grid from "./components/Grid/Grid";
import "./App.scss";

function App() {
  const [depth, setDepth] = useState(8);
  const [startHue, setStartHue] = useState(0);
  const [hueStep, setHueStep] = useState(10);

  const cells = createGrid(depth);

  return (
    <div className="App">
      <div className="controls">
        <div>
          <h2>Depth</h2>
          <input
            type="range"
            value={depth}
            onChange={(e) => setDepth(+e.target.value)}
            min={1}
            max={20}
          />
        </div>

        <div>
          <h2>Start hue</h2>
          <input
            type="range"
            value={startHue}
            onChange={(e) => setStartHue(+e.target.value)}
            min={0}
            max={360}
          />
        </div>

        <div>
          <h2>Hue step</h2>
          <input
            type="range"
            value={hueStep}
            onChange={(e) => setHueStep(+e.target.value)}
            min={0}
            max={100}
          />
        </div>
      </div>

      <div className="viewer">
        <Grid cells={cells} startHue={startHue} hueStep={hueStep} />
      </div>
    </div>
  );
}

export default App;
