import React, { useState, useMemo } from "react";
import "./App.css";

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export default function UseMemo() {
  const [number, setNumber] = useState(1000);

  const primeCount = useMemo(() => {
    let count = 0;
    for (let i = 2; i < number; i++) {
      if (isPrime(i)) count++;
    }
    return count;
  }, [number]);

  return (
    <div className="UseMemo">
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value, 10) || 0)}
        min="0"
      />
      <p>Liczb pierwszych: {primeCount}</p>
    </div>
  );
}
