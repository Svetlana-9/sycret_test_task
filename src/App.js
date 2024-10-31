import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientInfo from "./ClientInfo/ClientInfo";
import Catalogue from "./Catalogue/Catalogue";
import Payment from "./Payment/Payment";
import { useState } from "react";

function App() {
  const [buyProduct, setBuyProduct] = useState({});

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Catalogue setBuyProduct={setBuyProduct} />}
        ></Route>
        <Route
          path="ClientInfo"
          element={<ClientInfo buyProduct={buyProduct} />}
        ></Route>
        <Route path="Payment" element={<Payment />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
