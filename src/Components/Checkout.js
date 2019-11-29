import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Select, Checkbox, Radiobox } from 'react-inputs-validation';
import HelpTooltip from "./HelpTooltip.js"
import { ButtonContainer } from './Button'
import { ProductConsumer } from '../context'
import Title from './Title'
import {frequencies} from './constants'

// const Checkbox = props => (
//   <input type="checkbox" {...props} />
// )

export default class Checkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <ProductConsumer>
        {(value) => {
          let { cart, cartTotal, subscribeToggle, changeFrequency, frequency, subscribed, onFormChange } = value;
          return <div className="py-5">
            <div className="container">
              <Title name="your" title="order" />
              {cart.map(cartItem => {
                return <p>{cartItem.count}  {cartItem.title}</p>
              })}
              <br />
              <p>
                <h5>
                  <span className="text-title">total :</span>
                  <strong>$ {cartTotal}</strong>
                </h5>
              </p>
              <Checkbox
                attributesWrapper={{}} //Optional.
                attributesInput={{ id: 'subscribed', name: 'subscribed' }} //Optional.
                value={subscribed} //Required.[String].Default: "".
                checked={subscribed} //Required.[Bool].Default: false.
                disabled={false} //Optional.[Bool].Default: false.
                validate={false} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                classNameContainer="" // Optional.[String].Default: "".
                classNameInputBox="subscribed-checkbox"
                onChange={(isChecked, e) => {
                  onFormChange("subscribed", isChecked);
                }}
                labelHtml={
                  <div style={{ color: '#4a4a4a', marginTop: '2px' }}>
                    Subscribe to this order? <HelpTooltip msg="If you subscribed, you will receive this order periodically" />
                </div>
                } //Required.[Html].Default: none.
                validationOption={{
                  name: 'subscribed', //Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
                  check: false, //Optional.[Bool].Default: true. To determin if you need to validate.
                  required: false, //Optional.[Bool].Default: true. To determin if it is a required field.
                  showMsg: false
                }}
                validationCallback={res => {}} //Optional.[Func].Default: none. Return the validation result.
              />
              {subscribed ? 
                <div>
                <label>
                  <p>Deliver once every:&nbsp;&nbsp;&nbsp;</p>
                  <Radiobox
                    attributesInput={{
                      id: "frequency",
                      name: "frequency"
                    }}
                    value={frequency} // Optional.[String].Default: "".
                    optionList={frequencies} // Required.[Array of Object(s)].Default: [].
                    // validate={true}
                    classNameContainer="payment-radio" 
                    onChange={(frequency, e) => {
                      onFormChange("frequency", frequency.id);

                    }} // Optional.[Func].Default: () => {}. Will return the value.
                    customStyleOptionListContainer={{ maxHeight: '200px', overflow: 'auto', fontSize: '14px' }} // Optional.[Object].Default: {}.
                    validationOption={{
                      name: 'frequency', //Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
                      check: false, //Optional.[Bool].Default: true. To determin if you need to validate.
                      required: false, //Optional.[Bool].Default: true. To determin if it is a required field.
                      showMsg: false
                    }}
                    validationCallback={res => {}} //Optional.[Func].Default: none. Return the validation result.
                  />
                </label>
              </div>
              : null
              }
              
              <p>
                <Link to="/payment">
                  <ButtonContainer>
                    pay now
                  </ButtonContainer>
                </Link>
              </p>
            </div>
          </div>
        }}
      </ProductConsumer>
    )
  }
}
