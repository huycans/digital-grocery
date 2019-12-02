import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Textbox, Radiobox, Select } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import PaymentCardForm from "./PaymentCardForm"
import { ProductConsumer } from '../../context';
import Title from '../Title';
import { ButtonContainer } from '../Button';
import {cards} from '../constants'
// export default const PaymentWrapper = () => {
//   return <ProductConsumer>
//     {value =>  <Payment context={value} ></Payment>}

//   </ProductConsumer>
// }

export default class PaymentWrapper extends Component {
  render(){
    return (
      <ProductConsumer>
        {value => {
          return <Payment context={value} />
        }}
      </ProductConsumer>
    )
  }
}
class Payment extends Component {

  componentWillUnmount(){
    this.props.context.clearPayment();
  }

  render() {
    return (
      <ProductConsumer>
        {(value) => {
          let { onFormChange, name, cardnum, expMonth, expYear, paymethod, security } = value;
          return (
            <div className="py-5">
              <div className="container">
                <Title name="your" title="payment" />
                <form>
                  {paymethod !== ""
                    ? <React.Fragment>
                      <ButtonContainer onClick={() => onFormChange("paymethod", "")}><h4><i class="fas fa-long-arrow-alt-left"></i>Choose another payment method</h4></ButtonContainer>
                      <PaymentCardForm paymethod={paymethod}></PaymentCardForm>
                    </React.Fragment>
                    : <div className="column py-2">
                      <h3>Pick a payment method</h3>
                      <br></br>
                      <Radiobox
                        // ref={(input) => { this.nameInput = input; }} 
                        id="paymethod" // Optional.[String].Default: "".  Input ID.
                        name="paymethod" // Optional.[String].Default: "". Input name.
                        value={paymethod} // Optional.[String].Default: "".
                        optionList={cards}
                        classNameContainer="payment-radio" // Optional.[String].Default: "".
                        customStyleContainer={{
                          display: 'flex',
                          justifyContent: 'flex-start'
                        }} // Optional.[Object].Default: {}.
                        customStyleOptionListItem={{ marginRight: '20px' }} // Optional.[Object].Default: {}.
                        onChange={(newpaymethod, e) => {
                          // console.log("Change paymethod");
                          // if (newpaymethod == "amexpress") {
                          //   onFormChange("cardnum", "");
                          // }
                          // else if (newpaymethod == "visa" || newpaymethod == "mastercard") {
                          //   onFormChange("security", "");
                          // }
                          onFormChange("paymethod", newpaymethod);
                          // onFormChange("paymethod", paymethod);
                        }} // Required.[Func].Default: () => {}. Will return the value.
                        onBlur={(e) => { }} // Optional.[Func].Default: none.
                        validationOption={{
                          name: 'paymethod', // Optional.[String].Default: "". To display in the Error message. i.e Please enter your .
                          check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                          required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                        }}
                        validationCallback={(invalid) => {
                          this.setState({ paymethodError: invalid })
                        }}
                      />
                    </div>
                  }
                </form>
              </div>
            </div>
          )
        }}
      </ProductConsumer>
    )
  }
}