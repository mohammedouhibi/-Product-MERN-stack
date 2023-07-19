import { Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./components/Products";
import NotFound from "./components/NotFound";
import NavigationBar from "./components/NavigationBar";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <div className="App">
      <NavigationBar></NavigationBar>
      <Routes>
         <Route path="/" element={<Products/>} />
         <Route path="/products" element={<Products />}> </Route>
        <Route path="/AddProduct" element={<AddProduct />}> </Route> 
        
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
