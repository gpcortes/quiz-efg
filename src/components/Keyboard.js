import React, { useRef, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(2),
        },
    },
    keyboardBox: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            width: '600px',
        },
        [theme.breakpoints.up('md')]: {
            width: '800px',
        },
    },
    keyboard: {
        marginTop: '50px',
    },
}));

export default function VirtualKeyboard(props) {
    const [inputMaskOptions, setInputMaskOptions] = useState({});
    const classes = useStyles();
    const keyboard = useRef();
    const valuePrefix = props.prefix;

    const handleKeyboardInit = (keyboard) => {
        if (props.keyboardLayout === 'Phone') {
            setInputMaskOptions({
                default: {
                    mask: '+99 (99) 9 9999-9999',
                    regex: /[^0-9]/g,
                },
            });
        } else if (props.keyboardLayout === 'PositiveIntegerNumber') {
            setInputMaskOptions({
                default: {
                    mask: null,
                    regex: /[^0-9]/g,
                },
            });
        } else {
            setInputMaskOptions({
                default: {
                    mask: null,
                    regex: /[^a-zA-Z ]$/g,
                },
            });
        }
        keyboard.setInput(props.input, 'default');
    };

    const verifyPrefix = (input) => {
        const { regex } = inputMaskOptions.default;
        const cleanInput = input.replace(regex, '');
        if (!valuePrefix) return input;
        const cleanValuePrefix = valuePrefix.replace(regex, '');

        if (cleanInput.startsWith(cleanValuePrefix)) {
            return input;
        } else {
            return cleanValuePrefix;
        }
    };

    const cleanInput = (input) => {
        const { mask, regex } = inputMaskOptions.default;
        if (!mask) return input.replace(regex, '');
        const cleanMask = mask.replace(regex, '');
        const cleanInput = input.replace(regex, '');

        let cleanedInput = '';

        if (cleanInput.length > cleanMask.length) {
            cleanedInput = cleanInput.slice(0, cleanMask.length);
        } else {
            cleanedInput = cleanInput;
        }

        return cleanedInput;
    };

    const formatInput = (input) => {
        const { mask } = inputMaskOptions.default;
        if (!mask) return input;

        let formattedValue = '';

        let inputIndex = 0;

        for (let i = 0; i < mask.length; i++) {
            const maskChar = mask[i];
            if (maskChar === 'a' || maskChar === '9') {
                if (inputIndex < input.length) {
                    formattedValue += input[inputIndex];
                    inputIndex++;
                } else {
                    break;
                }
            } else {
                if (inputIndex < input.length) {
                    formattedValue += maskChar;
                }
            }
        }

        return formattedValue;
    };

    const layout = {
        default: [
            "' 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
            '{tab} q w e r t y u i o p \u00B4 [',
            '{lock} a s d f g h j k l \u00E7 ~ ] {enter}',
            '{shift} \\ z x c v b n m , . ; / {shift}',
            '.com @ {space}',
        ],
        shift: [
            '" ! @ # $ % \u0308 & * ( ) _ + {bksp}',
            '{tab} Q W E R T Y U I O P ` {',
            '{lock} A S D F G H J K L \u00C7 ^ } {enter}',
            '{shift} | Z X C V B N M < > : ? {shift}',
            '.com @ {space}',
        ],
        Text: [
            "' 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
            '{tab} q w e r t y u i o p \u00B4 [',
            '{lock} a s d f g h j k l \u00E7 ~ ] {enter}',
            '{shift} \\ z x c v b n m , . ; / {shift}',
            '.com @ {space}',
        ],
        PositiveIntegerNumber: ['1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {enter}'],
        Phone: ['1 2 3', '4 5 6', '7 8 9', '{bksp} 0 {enter}'],
    };

    const display = {
        '{bksp}': 'Corrigir',
        '{enter}': 'Enviar',
        '{tab}': 'Tab',
        '{lock}': 'Capslock',
        '{shift}': 'Shift',
        '{space}': 'Espaço',
    };

    const handleShift = () => {
        const newKeyboardLayout =
            props.keyboardLayout === 'default' ? 'shift' : 'default';
        props.setKeyboardLayout(newKeyboardLayout);
    };

    const handleEnter = () => {
        const { mask, regex } = inputMaskOptions.default;
        const cleanInput = props.input.replace(regex, '');

        if (!mask && cleanInput.length > 0) {
            props.setNext(true);
        }

        if (mask) {
            const cleanMask = mask.replace(regex, '');

            if (cleanInput.length === cleanMask.length) {
                props.setNext(true);
            }
        }

        props.setIsValid(false);
    };

    const onKeyPress = (button) => {
        keyboard.current.setCaretPosition(null, null);
        if (button === '{shift}' || button === '{lock}') handleShift();
        if (button === '{enter}') handleEnter();
    };

    const handleChange = (value) => {
        const cleanedValuePrefix = verifyPrefix(value);
        const cleanedValue = cleanInput(cleanedValuePrefix);
        const formattedInput = formatInput(cleanedValue);
        keyboard.current.setInput(cleanedValue, 'default');
        props.setInput(formattedInput);
    };

    const onChange = (input) => handleChange(input);

    const onChangeInput = (event) => handleChange(event.target.value);

    return (
        <Box className={classes.box}>
            {React.Children.map(props.children, (child, index) => {
                const updatedProps = {
                    ...child.props,
                    key: index,
                    value: props.input,
                    onChange: onChangeInput,
                    className: child.props.className,
                    error: !props.isValid,
                    helperText: !props.isValid ? 'Informe o valor correto' : '',
                };

                return React.cloneElement(child, updatedProps);
            })}
            <Box className={classes.keyboardBox}>
                <Keyboard
                    class={classes.keyboard}
                    theme={'hg-theme-default hg-layout-default'}
                    keyboardRef={(r) => (keyboard.current = r)}
                    onInit={handleKeyboardInit}
                    layout={layout}
                    layoutName={props.keyboardLayout}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    physicalKeyboardHighlight={true}
                    syncInstanceInputs={true}
                    display={display}
                />
            </Box>
        </Box>
    );
}
