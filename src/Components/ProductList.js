import React, { Component } from 'react'
import Product from './Product'
import Title from "./Title"
import { ProductConsumer } from "../context";
import SearchBar from "./SearchBar"
import Category from './Category';
import HelpTooltip from './HelpTooltip'
export default class ProductList extends Component {

  render() {
    // console.log(this.state.products);
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <SearchBar />

            <Title name="our" title="products" />

            <h3>Pick a category <HelpTooltip msg="We'll help you refine your search" /></h3>
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.categories.map(category => {
                    return <Category key={category.id} category={category} />
                  })
                }}
              </ProductConsumer>
            </div>

            <h3>Or browse our products here <HelpTooltip msg="Click the green button to add a product to your cart. You can increase or decrease the amount after a product has been added to cart" /></h3>
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  let displayedProducts = [];
                  if (value.filteredProducts.length != 0) {
                    displayedProducts = value.filteredProducts;
                  }
                  else {
                    displayedProducts = value.products
                  }
                  return displayedProducts.map(product => {
                    return <Product key={product.id} product={product} />
                  })
                }}
              </ProductConsumer>
            </div>

          </div>
        </div>
      </React.Fragment>
    )
  }
}
