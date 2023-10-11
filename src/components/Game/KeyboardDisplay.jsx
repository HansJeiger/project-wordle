import React from "react";
import { KEYBOARD_LETTERS } from "../../data";

const KeyboardDisplay = ({ letterStatuses, letterInput }) => {
  const getLetterStatusStylingForKeyboardDisplay = (letter) => {
    const letterStatus = letterStatuses.find(
      (letterStatus) => letterStatus.letter === letter
    );
    if (letterStatus === undefined) return "";
    if (letterStatus.letterPlacement === -1) return "incorrect";
    if (letterStatus.letterPlacement === "misplaced") return "misplaced";
    else return "correct";
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      {KEYBOARD_LETTERS.map((letterRow) => {
        return (
          <div key={letterRow[1]} className="flex-row">
            {letterRow.map((letter) => {
              return (
                <input
                  type="button"
                  value={letter}
                  onClick={(event) => {
                    event.preventDefault();
                    letterInput(letter);
                  }}
                  key={letter}
                  className={`keyboard-cell ${getLetterStatusStylingForKeyboardDisplay(
                    letter
                  )}`}
                />
              );
            })}
          </div>
        );
      })}
      <div className="flex-row">
        <button
          style={{
            padding: "0.5rem 4.75rem",
            margin: "2px",
            border: "1px solid var(--color-gray-700)",
            borderRadius: "5px",
            fontSize: "1rem",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default KeyboardDisplay;
