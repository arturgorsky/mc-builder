import React from "react";

import styles from "./Input.module.css";

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];
    let validationError = null;

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
        validationError = <p className={styles.ValidationError}>Invalid value!</p>
    }
    switch (props.elementType) {
        case "input":
            inputElement = (
                <input
                    onChange={props.changed}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    onChange={props.changed}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;
        case "select":
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={styles.InputElement.elementConfig}
                    value={props.value}
                />
            );
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
};

export default input;
