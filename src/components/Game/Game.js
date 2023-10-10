import React, { useEffect } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "./GuessInput";
import GuessGrid from "./GuessGrid";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guessesArray, setGuessesArray] = React.useState([]);
  const [letterStatuses, setLetterStatuses] = React.useState([]);
  const [gameState, setGameState] = React.useState("ongoing");

  const updateGameState = (lastGuess) => {
    if (!lastGuess) return;
    if (lastGuess === answer) {
      setGameState("won");
      return;
    }
    if (guessesArray.length >= 5) {
      setGameState("lost");
      return;
    }
  };

  return (
    <>
      <GuessGrid guessesArray={guessesArray} letterStatuses={letterStatuses} />
      <GuessInput
        gameState={gameState}
        updateGameState={updateGameState}
        answer={answer}
        guessesArray={guessesArray}
        setGuessesArray={setGuessesArray}
        letterStatuses={letterStatuses}
        setLetterStatuses={setLetterStatuses}
      />
    </>
  );
}

export default Game;
