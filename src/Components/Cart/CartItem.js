import React from "react";
import { toast } from 'react-toastify';

import { ProductConsumer } from "../../context";

function Counter({ id, count }) {
  return <ProductConsumer>
    {(value) => {
      const { increment, decrement } = value;
      let count = 0;
      if (value.cart.length > 0) {
        let thisProduct = value.cart.find((product) => {
          return product.id == id
        });
        if (thisProduct) {
          count = thisProduct.count
        }
      }
      return (
        <div class="row">
          <span className="btn btn-black mx-1" onClick={() => decrement(id)} > - </span>
          <span className="btn btn-black mx-1"> {count} </span>
          <span className="btn btn-black mx-1" onClick={() => increment(id)} > + </span>
        </div>
      )
    }}
  </ProductConsumer>
}

function CartItem({ item, value, viewMode }) {
  const { id, title, img, price, total, count } = item;
  const { removeItem } = value;
  const remove = (id) => {
    toast("Remove");
    removeItem(id)
  }

  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 mx-auto col-lg-2">
        <img
          src={img}
          style={{ width: "5rem", height: "5rem" }}
          className="img-fluid"
          alt="product"
        />
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">product: </span>
        {title}
      </div>
      <div className="col-10 mx-auto col-lg-2">
        <span className="d-lg-none">price: </span>
        {price}
      </div>
      <div className="col-10 mx-auto col-lg-2 my-lg-0">
        <div className="d-flex justify-content-center">
          {viewMode ? count : <Counter id={id} />}
        </div>
      </div>
      {viewMode
        ? null
        : <div className="col-10 mx-auto col-lg-2" >
          <div className="cart-icon" onClick={() => removeItem(id)}>
            <i className="fas fa-trash"></i>
          </div>
        </div>
      }
      <div className="col-10 mx-auto col-lg-2" >
        <strong>item total: $ {total}</strong>
      </div>
      
    </div>
  );
}

export { CartItem, Counter };
