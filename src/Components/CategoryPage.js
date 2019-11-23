import React, { Component } from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";
import Product from './Product'
import Title from "./Title"
import { ProductConsumer } from "../context";
import SearchBar from "./SearchBar"
import Category from './Category';
import { storeCategories } from "../data";

export default class CategoryPage extends Component {
    render() {

        // console.log(this.state.products);
        return (
            <div className="py-5">
                <div className="container">
                    <Switch>
                        <Route exact path="/category" children={
                            <div className="py-5">
                                <div className="container">

                                    <h3>Pick a category</h3>
                                    <div className="row">
                                        <ProductConsumer>
                                            {(value) => {
                                                return value.categories.map(category => {
                                                    return <Category key={category.id} category={category} />
                                                })
                                            }}
                                        </ProductConsumer>
                                    </div>

                                </div>
                            </div>
                        } />
                        <Route path="/category/:catId" children={<MainCategory />} />
                    </Switch>
                </div>
            </div>
        )
    }
}
function MainCategory() {
    let { catId } = useParams();
    let thisCategory = storeCategories.find(
        (category) => category.id == parseInt(catId)
    );
    return <React.Fragment>
        <SearchBar />

        <Link to="/"><h4><i class="fas fa-long-arrow-alt-left"></i>Go back</h4></Link>
        <div className="row">
            <Category category={thisCategory} />
        </div>
        <h3>Pick a product</h3>
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
                    return displayedProducts.filter(product => {
                        return (product.category == thisCategory.id)
                    }).map(product => {
                        return <Product key={product.id} product={product} />
                    })
                }}
            </ProductConsumer>
        </div>
    </React.Fragment>
}