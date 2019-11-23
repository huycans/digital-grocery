import React, { Component } from 'react'
import Product from './Product'
import Title from "./Title"
import { ProductConsumer } from "../context";
import SearchBar from "./SearchBar"
import Category from './Category';
export default class ProductList extends Component {

  render() {
    // console.log(this.state.products);
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <SearchBar />
            <Title name="our" title="products"/>

            <h3>Pick a category</h3>
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  return value.categories.map(category => {
                    return <Category key={category.id} category={category}/>
                  })
                }}
              </ProductConsumer>
            </div>

            <h3>Or browse our most popular</h3>
            <div className="row">
              <ProductConsumer>
                {(value) => {
                  let displayedProducts = [];
                  if (value.filteredProducts.length != 0){
                    displayedProducts = value.filteredProducts;
                  }
                  else {
                    displayedProducts = value.products
                  }
                  return displayedProducts.map(product => {
                    return <Product key={product.id} product={product}/>
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
