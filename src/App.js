import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
// https://www.youtube.com/watch?v=cBsB7hhOzQI
function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchProducts() {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    setProducts(data.products);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  function pageHandler(pageNo) {
    setPage(pageNo);
  }
  console.log(products);
  return (
    <div className="App">
      <div className="grid">
        {products.slice(page * 10 - 10, page * 10).map((product) => {
          return (
            <div className="product__single">
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
            </div>
          );
        })}
      </div>
      <div className="page">
        <span
          onClick={() => pageHandler(page - 1)}
          className={page > 1 ? "" : "disabled"}
        >
          ◀
        </span>
        {[...Array(products.length / 10)].map((_, i) => {
          return (
            <span
              className={page === i + 1 ? "enabled" : ""}
              onClick={() => pageHandler(i + 1)}
            >
              {i + 1}
            </span>
          );
        })}
        <span
          onClick={() => pageHandler(page + 1)}
          className={page < products.length / 10 ? "" : "disabled"}
        >
          ▶
        </span>
      </div>
    </div>
  );
}

export default App;
