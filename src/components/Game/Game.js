import React, { useEffect } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "./GuessInput";
import GuessGrid from "./GuessGrid";
import KeyboardDisplay from "./KeyboardDisplay";

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
      {gameState === "won" && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in
            <strong> {guessesArray.length} guesses</strong>.
          </p>
          <button
            style={{
              fontSize: "1.5rem",
              borderRadius: "40px",
              marginTop: "1rem",
              border: "5px solid white",
              padding: "0.5rem 1rem",
            }}
            onClick={() => {
              window.location.reload();
            }}
          >
            New game
          </button>
        </div>
      )}
      {gameState === "lost" && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
          <button
            style={{
              fontSize: "1.5rem",
              borderRadius: "40px",
              marginTop: "1rem",
              border: "5px solid white",
              padding: "0.5rem 1rem",
            }}
            onClick={() => {
              window.location.reload();
            }}
          >
            New game
          </button>
        </div>
      )}
    </>
  );
}

export default Game;
