import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; 
import "./App.css";

const App = () => {
  // State management
  const [currentValue, setCurrentValue] = useState(
    localStorage.getItem("currentValue") || ""
  );
  const [firstValue, setFirstValue] = useState(
    localStorage.getItem("firstValue") || ""
  );
  const [operator, setOperator] = useState(
    localStorage.getItem("operator") || ""
  );
  const [theme, setTheme] = useState("light");

  // Save to localStorage on every state change
  useEffect(() => {
    localStorage.setItem("currentValue", currentValue);
    localStorage.setItem("firstValue", firstValue);
    localStorage.setItem("operator", operator);
    localStorage.setItem("theme", theme);
  }, [currentValue, firstValue, operator, theme]);

  // Function to handle button clicks
  const handleBtnClick = (value) => {
    if ("0123456789.".includes(value)) {
      setCurrentValue((prev) => (prev || "") + value);
    } else if ("+-*/".includes(value)) {
      if (currentValue) {
        setFirstValue(currentValue);
        setOperator(value);
        setCurrentValue("");
      }
    } else if (value === "x²") {
      setCurrentValue((prev) =>
        prev && !isNaN(prev) ? (parseFloat(prev) ** 2).toString() : "0"
      );
    } else if (value === "SQRT") {
      setCurrentValue((prev) =>
        prev && !isNaN(prev) ? Math.sqrt(parseFloat(prev)).toString() : "0"
      );
    } else if (value === "=") {
      if (firstValue && operator && currentValue) {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(currentValue);
        let result;

        switch (operator) {
          case "+":
            result = num1 + num2;
            break;
          case "-":
            result = num1 - num2;
            break;
          case "*":
            result = num1 * num2;
            break;
          case "/":
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
          default:
            result = "Error";
        }

        setCurrentValue(result.toString());
        setFirstValue("");
        setOperator("");
      }
    } else if (value === "C") {
      setCurrentValue("");
      setFirstValue("");
      setOperator("");
    } else if (value === "DEL") {
      setCurrentValue((prev) => (prev ? prev.slice(0, -1) : ""));
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`calculator ${theme}`}>
      <div className="theme-icon" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}
      </div>
      <h1>Simple Calculator</h1>
      <div className="display">{currentValue || "0"}</div>
      <div className="buttons">
        {["x²",
          "SQRT",
          "DEL",
          "C",
          "7",
          "8",
          "9",
          "/",
          "4",
          "5",
          "6",
          "*",
          "1",
          "2",
          "3",
          "-",
          "0",
          ".",
          "=",
          "+",
        ].map((btn) => (
          <button key={btn} onClick={() => handleBtnClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
      <footer>&copy;copyright by 2024</footer>
    </div>
  );
};

export default App;