import React, { useState, useCallback } from "react";

function ProductItem({ item, onRemove }) {
  console.log("Render produktu:", item);
  return (
    <li>
      {item} <button onClick={() => onRemove(item)}>Usuń</button>
    </li>
  );
}

const MemoizedProductItem = React.memo(ProductItem);

export default function ProductList() {
  const [products, setProducts] = useState(["Jabłko", "Gruszka", "Banan"]);

  const removeProduct = useCallback((item) => {
    setProducts((prev) => prev.filter((p) => p !== item));
  }, []);

  return (
    <div>
      <h2>Lista produktów</h2>
      <ul>
        {products.map((item) => (
          <MemoizedProductItem key={item} item={item} onRemove={removeProduct} />
        ))}
      </ul>
    </div>
  );
}
