import React, { useState } from "react";

const Keyboard = () => {
    const [inputValue, setInputValue] = useState("");

    const handleClick = (letter) => {
        setInputValue((prevValue) => prevValue + letter);
    };

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return (
        <div>
            <input type="text" value={inputValue} readOnly />
            <div>
                {letters.map((letter) => (
                    <button key={letter} onClick={() => handleClick(letter)}>
                        {letter}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Keyboard;
