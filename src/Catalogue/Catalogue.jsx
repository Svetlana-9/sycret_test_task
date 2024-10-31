import { useState, useEffect } from "react";
import "./Catalogue.css";
import { useNavigate } from "react-router-dom";

const url = "https://sycret.ru/service/api/api";
const apiKey = "011ba11bdcad4fa396660c2ec447ef14";

export default function Catalogue(props) {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const requestUrl = new URL(url);
    requestUrl.searchParams.set("ApiKey", apiKey);
    requestUrl.searchParams.set("MethodName", "OSGetGoodList");
    fetch(requestUrl.toString())
      .then((responce) => {
        if (responce.ok) {
          return responce.json();
        }
        return Promise.reject(responce.status);
      })
      .then((info) => setProductList(info.data ?? []))
      .catch((error) => console.log("Error", error));
  }, []);

  return (
    <div className="catalogue">
      <h1 className="name">КАТАЛОГ</h1>
      <div className="productList">
        {productList.map((product) => {
          return (
            <div
              key={product.ID}
              className={
                selectedProduct.ID !== product.ID
                  ? "product"
                  : "product changed"
              }
              onClick={() => {
                setSelectedProduct(product);
              }}
            >
              <h1> {product.NAME} </h1>
              <br />
              <p className="price">
                <span className="underlined">Цена:</span> {product.PRICE} руб.
                <br />
                <span className="underlined">Скидка:</span>{" "}
                {Math.round(product.DISCOUNT)} %
                <br />
                <span className="underlined">Цена со скидкой:</span>{" "}
                {product.SUMMA} руб.
              </p>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        disabled={Object.keys(selectedProduct).length === 0}
        className={
          Object.keys(selectedProduct).length === 0
            ? "btn disabled"
            : "btn active"
        }
        onClick={() => {
          const copySelectedProduct = { ...selectedProduct };
          props.setBuyProduct(copySelectedProduct);
          navigate("/ClientInfo");
        }}
      >
        Оформить
      </button>
    </div>
  );
}
