import React, { Component } from 'react'
import Title from './Title'
import { ProductConsumer } from '../context'
import { Link } from 'react-router-dom'
import CartColumn from "./Cart/CartColumns"
import CartItem from "./Cart/CartItem"
import moment from "moment"
import CartList from './Cart/CartList'
import { frequencies } from './constants'

export default class OrderHistory extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          let { orderHistory } = value;
          let { isFromPayment } = (this.props.location && this.props.location.state) ? this.props.location.state : false;

          return (<div classname="py-5">
            <div className="container">
              <Title name="your" title="history" />
              {isFromPayment
                ? <div className="card my-4 text-green">
                  <h4><i class="fas fa-check-circle">Your purchase was successful</i>
                  </h4>
                </div>
                : null
              }
              {orderHistory.length == 0
                ? <p>You have not purchased anything, go <Link to="/">here</Link> to buy something </p>
                : orderHistory.slice(0).reverse().map((order, index) => {
                  const orderFrequency = frequencies.find(frequency => {
                    return parseInt(frequency.id) === parseInt(order.frequency);
                  })
                  // console.log("orderFrequency", orderFrequency);

                  return <div key={index} className="card my-4" style={{ width: "100%" }}>
                    <CartColumn viewMode={true}></CartColumn>
                    <CartList viewMode={true} value={value} order={order}></CartList>
                    <div className="column my-2">
                      <h6 className="card-subtitle text-muted mt-2 mx-2">Order total with tax: ${order.cartTotal}</h6>
                      <h6 className="card-subtitle text-muted mt-2 mx-2">Date: {moment(order.timestamp).format("MMM Do YYYY")}</h6>
                      <h6 className="card-subtitle text-muted mt-2 mx-2">
                        {order.subscribed ? `You will receive this order every ${orderFrequency.name}` : "You are not subscribed to this order"}
                      </h6>

                    </div>
                  </div>
                })
              }
            </div>
          </div>)
        }}

      </ProductConsumer>
    )
  }
}
