import React, { Component } from 'react'
import styled from "styled-components";
import {ProductConsumer} from "../context"
export default class SearchBar extends Component {
    render() {
        return (
            <ProductConsumer >
            {(value) => {
                const {searchValue, onSearchInput} = value;
                return (
                    <div className="col-10 mx-auto my-2 text-center text-title py-2">
                        <input value={searchValue} onChange={onSearchInput} className="searchbar" type="text" placeholder="Search a product" />
                    </div>
                )
            }}
                
            </ProductConsumer>
            
        )
    }
}

