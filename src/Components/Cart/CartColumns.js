import React, { Component } from 'react'
import HelpTooltip from "../HelpTooltip.js"

export default class CartColumns extends Component {
  render() {
    return (
      <div className="container-fluid text-center d-none d-lg-block">
        <div className="row">
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">
              products
            </p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">name</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">price</p>
          </div>

          {this.props.viewMode == true ?
            <div className="col-10 mx-auto col-lg-2">
              <p className="text-uppercase">quantity</p>
            </div>
            :
            <div className="col-10 mx-auto col-lg-2">
              <p className="text-uppercase">quantity <HelpTooltip msg="Here you can increase or decrease the amount" /></p>
            </div>
          }
          {this.props.viewMode == true ? null :
            <div className="col-10 mx-auto col-lg-2">
              <p className="text-uppercase">remove <HelpTooltip msg="Click the trash icon to remove the product from cart" /></p>
            </div>
          }
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">total</p>
          </div>
        </div>

      </div>
    )
  }
}
