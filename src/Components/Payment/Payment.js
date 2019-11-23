import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Textbox, Radiobox, Select } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import PaymentCardForm from "./PaymentCardForm"
import { ProductConsumer } from '../../context';
import Title from '../Title';
// export default const PaymentWrapper = () => {
//   return <ProductConsumer>
//     {value =>  <Payment context={value} ></Payment>}

//   </ProductConsumer>
// }
export default class Payment extends Component {

  componentDidMount() {
    // this.nameInput.focus();
  }

  render() {
    return (
      <ProductConsumer>
        {(value) => {
          let { onFormChange, name, cardnum, expMonth, expYear, paymethod, security } = value;
          return (
            <React.Fragment>
              <div className="py-5">
                <div className="container">
                  <Title name="your" title="payment" />
                  <form>
                    <div className="column py-2">
                      <h3>Pick a payment method</h3>
                      <br></br>
                      <Radiobox
                        // ref={(input) => { this.nameInput = input; }} 
                        id="paymethod" // Optional.[String].Default: "".  Input ID.
                        name="paymethod" // Optional.[String].Default: "". Input name.
                        value={paymethod} // Optional.[String].Default: "".
                        optionList={[
                          { id: 'visa', name: 'Visa' },
                          { id: 'mastercard', name: 'Mastercard' },
                          { id: 'amexpress', name: 'American Express' }
                        ]}
                        classNameContainer="payment-radio" // Optional.[String].Default: "".
                        customStyleContainer={{
                          display: 'flex',
                          justifyContent: 'flex-start'
                        }} // Optional.[Object].Default: {}.
                        customStyleOptionListItem={{ marginRight: '20px' }} // Optional.[Object].Default: {}.
                        onChange={(paymethod, e) => {
                          onFormChange("paymethod", paymethod)
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
                    {paymethod !== "" ?
                      <PaymentCardForm paymethod={paymethod}></PaymentCardForm>

                      : null
                    }
                  </form>
                </div>
              </div>
            </React.Fragment>
          )
        }}
      </ProductConsumer>
    )
  }
}
