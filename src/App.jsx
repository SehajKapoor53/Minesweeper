import React, { useState, useEffect } from "react";
import Board from "./components/Board";

const LEVEL_CONFIG = {
  easy: { rows: 9, cols: 9, mines: 10 },
  medium: { rows: 12, cols: 12, mines: 25 },
  hard: { rows: 16, cols: 16, mines: 50 },
};

function App() {
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState("easy");
  const [config, setConfig] = useState(LEVEL_CONFIG["easy"]);
  const [flagsLeft, setFlagsLeft] = useState(config.mines);

  useEffect(() => {
    setConfig(LEVEL_CONFIG[level]);
    setTime(0);
  }, [level]);

  useEffect(() => {
    setFlagsLeft(config.mines);
  }, [config]);

  return (
    <main className="flex flex-col text-zinc-100 min-h-screen bg-zinc-900">
      <header className="h-16 p-4 bg-zinc-800 border-b border-zinc-700 shadow-lg flex items-center justify-between">
        <select
          className="
        bg-zinc-700
        text-zinc-100
        px-3
        py-2
        rounded-xl
        outline-none
        cursor-pointer
        hover:bg-zinc-600
        transition-colors
        "
          name="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <div className="flex gap-4 items-center">
          <span className="flex items-center justify-center">
            <img className="h-10" src="/flag.svg" />
            <span>{flagsLeft}</span>
          </span>
          <span className="flex items-center justify-center">
            <img className="h-10" src="/clock.svg" />
            <span>{time}</span>
          </span>
        </div>
      </header>
      <div id="container" className="flex flex-1 items-center justify-center">
        <Board {...{flagsLeft, setFlagsLeft, time, setTime, config }} />
      </div>
    </main>
  );
}

export default App;
