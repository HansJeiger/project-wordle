import React from "react";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

export const getLetterStatusStyling = (
  letter,
  currentIndex,
  letterStatuses,
  gameState = undefined
) => {
  if (gameState === "lost") return "loser";
  if (!letter) return "";
  const letterStatus = letterStatuses.find(
    (currentLetterStatus) => currentLetterStatus.letter === letter
  );
  if (!letterStatus) return "";
  if (letterStatus.letterPlacement === -1) return "incorrect";
  if (letterStatus.letterPlacement === "misplaced") return "misplaced";
  return letterStatus.letterPlacement === currentIndex
    ? "correct"
    : "misplaced";
};

const GuessGrid = ({ guessesArray, letterStatuses }) => {
  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((guessIndex) => (
        <p key={guessIndex} className="guess">
          {range(5).map((letterIndex) => (
            <span
              key={letterIndex}
              className={`cell ${getLetterStatusStyling(
                guessesArray[guessIndex]?.guess.charAt(letterIndex),
                letterIndex,
                letterStatuses
              )}`}
            >
              {guessesArray[guessIndex] &&
                guessesArray[guessIndex].guess.charAt(letterIndex)}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
};

export default GuessGrid;
