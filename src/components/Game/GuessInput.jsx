import React from "react";
import { getLetterStatusStyling } from "./GuessGrid";
import { range } from "../../utils";

const GuessInput = ({
  gameState,
  updateGameState,
  answer,
  guessesArray,
  setGuessesArray,
  letterStatuses,
  setLetterStatuses,
}) => {
  const [guess, setGuess] = React.useState("");
  const [triedInvalidGuess, setTriedInvalidGuess] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState();

  async function displayInputWarning(warningMessage) {
    setTriedInvalidGuess(warningMessage);
    clearTimeout(timeoutId);
    await new Promise((res) => setTimeoutId(setTimeout(res, 2000)));
    setTriedInvalidGuess(false);
  }

  const onChangeHandler = async (event) => {
    if (gameState !== "ongoing") return;
    if (event.target.value.length > 5) {
      displayInputWarning("Only 5 letters are allowed.");
      return;
    }
    const newValue = event.target.value.toUpperCase().slice(0, 5);
    const newValueArray = newValue.split("");
    if (newValueArray.length > 0 && !/^[a-zA-Z]+$/.test(newValue)) {
      displayInputWarning("Only letters are allowed.");
      return;
    }
    if (
      newValueArray.some((character, index) => {
        const searchArray = [...newValueArray];
        searchArray.splice(index, 1);
        return searchArray.some(
          (searchCharacter) => character === searchCharacter
        );
      })
    ) {
      displayInputWarning("Any character can only be used once.");
      return;
    }
    setTriedInvalidGuess(false);
    setGuess(newValue);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (guess.length < 5) {
      displayInputWarning("Your guess must contain 5 letters!");
      return;
    }
    setGuessesArray([...guessesArray, { guess, id: crypto.randomUUID() }]);
    updateLetterStatuses(guess, answer);
    setGuess(
      guess === answer ? answer : guessesArray.length >= 5 ? "LOSER" : ""
    );
    updateGameState(guess);
  };

  const updateLetterStatuses = (guess, answer) => {
    const guessLetterArray = guess.split("");
    const answerLetterArray = answer.split("");

    const newLetterStatuses = guessLetterArray.map((letter, index) => {
      const answerLetterIndex = answerLetterArray.findIndex(
        (answerLetter) => letter === answerLetter
      );
      const letterPlacement =
        index === answerLetterIndex || answerLetterIndex === -1
          ? answerLetterIndex
          : "misplaced";
      return { letter, letterPlacement };
    });

    const updatedLetterStatuses = [...letterStatuses];

    newLetterStatuses.forEach((newLetterStatus) => {
      const oldLetterStatusIndex = updatedLetterStatuses.findIndex(
        (letterStatus) => newLetterStatus.letter === letterStatus.letter
      );
      if (oldLetterStatusIndex === -1)
        updatedLetterStatuses.push(newLetterStatus);
      if (
        updatedLetterStatuses[oldLetterStatusIndex]?.letterPlacement !==
        "misplaced"
      )
        return;
      else updatedLetterStatuses[oldLetterStatusIndex] = newLetterStatus;
    });

    setLetterStatuses(updatedLetterStatuses);
  };

  return (
    <>
      <div>
        <p className="guess">
          {range(5).map((letterIndex) => (
            <span
              key={letterIndex}
              className={`cell ${getLetterStatusStyling(
                guess.charAt(letterIndex),
                letterIndex,
                letterStatuses,
                gameState
              )}`}
            >
              {guess.charAt(letterIndex)}
            </span>
          ))}
        </p>
      </div>
      <form
        onSubmit={(event) => onSubmitHandler(event)}
        className="guess-input-wrapper"
      >
        <label htmlFor="guess-input"></label>
        <input
          value={gameState === "ongoing" ? guess : answer}
          onChange={onChangeHandler}
          id="guess-input"
          tye="text"
        />
        {triedInvalidGuess && (
          <p style={{ color: "#C32222" }}>{triedInvalidGuess}</p>
        )}
      </form>
    </>
  );
};

export default GuessInput;
