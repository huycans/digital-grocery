import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import Details from "./Components/Details";
import Cart from "./Components/Cart"; 
import Default from "./Components/Default";
// import Modal from "./Components/Modal";
import CategoryPage from "./Components/CategoryPage";
import Checkout from './Components/Checkout'
import Payment from './Components/Payment/Payment'
import OrderHistory from "./Components/OrderHistory";
import PaymentSucessful from "./Components/PaymentSucessful";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/category" component={CategoryPage} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/payment" component={Payment} />
          <Route path="/history" component={OrderHistory} />
          <Route path="/success" component={PaymentSucessful} />
          <Route component={Default} />
        </Switch>
        {/*<Modal />*/}
      </React.Fragment>
    );
  }
}

export default App;
