import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screen/home-screen";
import CheckoutScreen from "./screen/checkout-screen";
import PaginatedScreen from "./screen/paginated-screen";

function App() {
  return (
<Router>
  <Routes>
    <Route path="/" element={<HomeScreen/>} />
    <Route path="checkout/" element={<CheckoutScreen/>} />
    <Route path="/photo/:page" element={<PaginatedScreen/>} />
  </Routes>
</Router>
  );
}

export default App;
