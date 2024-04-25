import React, { useState } from "react";
import "./CounterButton.css";

interface CounterButton {
    min?: number;
    max?: number;
    onCountChange: (newCount: number) => void;
  }
  
  export const CounterButton: React.FC<CounterButton> = ({
    min = 1,
    max = 5,
    onCountChange,
  }) => {
    const [count, setCount] = useState(1);
  
    // Function to handle decrement
    const handleDecrement = () => {
      const newCount = count - 1;
      if (newCount >= min) {
        setCount(newCount);
        onCountChange(newCount);
      }
    };
  
    // Function to handle increment
    const handleIncrement = () => {
      const newCount = count + 1;
      if (newCount <= max) {
        setCount(newCount);
        onCountChange(newCount);
      }
    };
  
    return (
      <>
        <div className="buttons">
          <button className="btn" onClick={handleDecrement}>
            <strong>-</strong>
          </button>
          <span className="btw">{count}</span>
          <button className="btn" onClick={handleIncrement}>
            <strong>+</strong>
          </button>
        </div>
      </>
    );
  };
  
  export default CounterButton;
  