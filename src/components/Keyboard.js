import React, { Fragment, useState, useRef } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default function VirtualKeyboard({ onClick }) {
    const [layoutName, setLayoutName] = useState("default");
    const [input, setInput] = useState("");

    const keyboardRef = useRef(null);

    const onChange = input => {
        setInput(input);
    };

    const onKeyPress = button => {
        /**
         * If you want to handle the shift and caps lock buttons
         */
        if (button === "{shift}" || button === "{lock}") handleShift();

        if (button === "{enter}") handleEnter();
    };

    const handleShift = () => {
        setLayoutName(layoutName === "default" ? "shift" : "default");
    };

    const handleEnter = button => {
        onClick(input);
        console.log("Button pressed", button);
    };

    const onChangeInput = event => {
        const input = event.target.value.toUpperCase();
        setInput(input);
        keyboardRef.current.setInput(input);
    };

    return (
        <Fragment>
            <input value={input.toUpperCase()} onChange={(e) => setInput(e.target.value)} />
            <Keyboard
                keyboardRef={r => (keyboardRef.current = r)}
                layoutName={layoutName}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
        </Fragment>
    )
}
