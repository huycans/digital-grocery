import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "./Button";
export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { id, company, img, info, price, title, inCart } = value.detailProduct;
          return (
            <div className="container py-5">
              {/**title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-green my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/**end title */}

              {/**product info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="product/" />
                </div>

                {/**product text */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2>product: {title}</h2>
                  <h4 className="text-green">
                    <strong>
                      price <span>$</span>
                      {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                    some info about product:{" "}
                  </p>{" "}
                  <p className="text-muted lead">{info}</p>
                  <div>
                    {/**buttons */}
                    <Link to="/">
                      {" "}
                      <ButtonContainer>back to products</ButtonContainer>
                    </Link>
                    <ButtonContainer
                      yellow
                      disabled={inCart}
                      onClick={() => {
                        value.addToCart(id);
                        // value.openModal(id);
                      }}
                    >
                      {inCart ? "incart" : "add to cart"}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
