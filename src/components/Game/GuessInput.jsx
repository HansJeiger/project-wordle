import React from "react";

const GuessInput = () => {
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
    if (event.target.value.length > 5) {
      displayInputWarning("Invalid guess! Only 5 letters are allowed.");
      return;
    }
    const newValue = event.target.value.toUpperCase().slice(0, 5);
    const newValueArray = newValue.split("");
    if (newValueArray.length > 0 && !/^[a-zA-Z]+$/.test(newValue)) {
      displayInputWarning("Invalid guess! Only letters are allowed.");
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
      displayInputWarning(
        "Invalid guess! Any character can only be used once."
      );
      return;
    }
    setTriedInvalidGuess(false);
    setGuess(newValue);
  };

  return (
    <>
      <form className="guess-input-wrapper">
        <label htmlFor="guess-input"></label>
        <input
          value={guess}
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
