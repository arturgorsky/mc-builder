import React from "react";
import styles from "./Order.module.css";

const order = (props) => {
    const ingredients = [];
    for (let ingredient in props.ingredients) {
        ingredients.push({
            name: ingredient,
            amount: props.ingredients[ingredient],
        });
    }

    const ingredientList = ingredients.map((ingr) => (
        <span
            style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #eee",
            }}
            key={ingr.name}
        >
            {ingr.name} ({ingr.amount})
        </span>
    ));
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientList}</p>
            <p>
                Price: <strong>{props.price} EUR</strong>
            </p>
        </div>
    );
};

export default order;
