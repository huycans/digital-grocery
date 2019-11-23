import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Textbox, Radiobox, Select } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { ProductConsumer } from '../../context';
import { monthList, yearList } from '../constants';
import {withRouter} from 'react-router-dom';


class PaymentCardForm extends Component {
  state = {
    paymethodError: true,
    nameError: true,
    cardnumError: true,
    expMonthError: true,
    expYearError: true,
    securityError: true,
    dateErrorMsg: "",
    // monthDirty: false,
    // yearDirty: false,
    expMonth: "",
    expYear: ""
  }

  checkDate() {
    let { expMonth, expYear } = this.state;
    let currentDate = new Date();

    if (parseInt(expYear) == currentDate.getFullYear() && parseInt(expMonth) < currentDate.getMonth()) {
      return false;
    }
    else {
      return true;
    }
  }

  setDateErrorMsg() {
    if (!this.checkDate()) {
      this.setState({ dateErrorMsg: "Date must be in the future" })

    }
    else {
      this.setState({ dateErrorMsg: "" })
    }
  }

  render() {
    return (
      <ProductConsumer>
        {(value => {
          let validate = false;
          let { onFormChange, name, cardnum, expMonth, expYear, security, pay } = value;
          let { paymethod, history } = this.props;
          let { paymethodError,
            nameError,
            cardnumError,
            securityError,
            dateErrorMsg } = this.state;
          const finishPayment = () => {
            pay(); 
            history.push("/success");
          }

          let disabledPay = !(!nameError && !cardnumError && !(expMonth == "") && !(expYear == "") && !securityError && this.checkDate());

          let maxCardLength = 16;
          let maxSecurity = 3;
          if (paymethod == "amexpress") {
            maxCardLength = 15;
            maxSecurity = 4;
          }
          return <div className="column my-3">
            <h3>Enter your credit/debit card information below</h3>

            <label>
              <span>Cardholder name</span>
              <Textbox
                attributesInput={{
                  id: "name",
                  name: "name",
                  type: "name",
                  placeholder: "Enter cardholder name"
                }}
                value={name} // Optional.[String].Default: "".
                disabled={false} // Optional.[Bool].Default: false.
                validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                onChange={(name, e) => {
                  onFormChange("name", name)
                }} // Required.[Func].Default: () => {}. Will return the value.
                onBlur={e => {

                }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                validationOption={{
                  name: "Cardholder name", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                  check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                  required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                }}
                validationCallback={(invalid) => {
                  this.setState({ nameError: invalid })
                }}
              />
            </label>
            <br></br>

            <label>
              <span>Card number</span>
              <Textbox
                attributesInput={{
                  id: "cardnum",
                  name: "cardnum",
                  maxLength: maxCardLength,
                  placeholder: `Enter ${maxCardLength} digits`
                }}
                value={cardnum} // Optional.[String].Default: "".
                disabled={false} // Optional.[Bool].Default: false.
                validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                onChange={(cardnum, e) => {
                  onFormChange("cardnum", cardnum.replace(/\D/g, ''))
                }} // Required.[Func].Default: () => {}. Will return the value.
                onBlur={e => {
                  // onFormChange("cardnum", e.target.value.replace(/\D/g,'')) //if I want to repair the entered string automatically
                }}
                validationOption={{
                  name: "Card number", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                  check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                  required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                  customFunc: number => { // Optional.[Func].Default: none. Custom function. Returns true or err message
                    if (!new RegExp("^[0-9]*$").test(number)) {
                      return "Please only enter digits from 0 to 9"
                    } else if (number.length != maxCardLength) {
                      return `Card number must have ${maxCardLength} digits`;
                    }
                    return true;
                  }
                }}
                validationCallback={(invalid) => {
                  this.setState({ cardnumError: invalid })
                }}
              />
            </label>

            <div className="column">
              <span>Expiration date</span>
              <div className="row">
                <div className="expdate">
                  <Select
                    attributesInput={{
                      id: "expMonth",
                      name: "expMonth"
                    }}
                    //tabIndex="6" // Optional.[String or Number].Default: none.
                    value={expMonth} // Optional.[String].Default: "".
                    optionList={monthList} // Required.[Array of Object(s)].Default: [].
                    // validate={true}
                    classNameSelect={"custom-select"}
                    onChange={(expMonth, e) => {
                      onFormChange("expMonth", expMonth.id);
                      this.setState({ expMonth: expMonth.id }, () => this.setDateErrorMsg());
                    }} // Optional.[Func].Default: () => {}. Will return the value.
                    // onBlur={() => { }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    customStyleOptionListContainer={{ maxHeight: '200px', overflow: 'auto', fontSize: '14px' }} // Optional.[Object].Default: {}.
                    validationOption={{
                      name: 'Month', // Optional.[String].Default: "". To display in the Error message. i.e Please select a .
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                      showMsg: true
                    }}
                    validationCallback={(invalid) => {
                      this.setState({ expMonthError: invalid })
                    }}
                  />
                </div>

                <div className="expdate">
                  <Select
                    attributesInput={{
                      id: "expYear",
                      name: "expYear"
                    }}
                    value={expYear} // Optional.[String].Default: "".
                    optionList={yearList} // Required.[Array of Object(s)].Default: [].
                    // validate={true}
                    classNameSelect={"custom-select"}
                    onChange={(expYear, e) => {
                      onFormChange("expYear", expYear.id);
                      this.setState({ expYear: expYear.id }, () => this.setDateErrorMsg());


                    }} // Optional.[Func].Default: () => {}. Will return the value.
                    // onBlur={() => { }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                    customStyleOptionListContainer={{ maxHeight: '200px', overflow: 'auto', fontSize: '14px' }} // Optional.[Object].Default: {}.
                    validationOption={{
                      name: 'Year', // Optional.[String].Default: "". To display in the Error message. i.e Please select a .
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                      showMsg: true
                    }}
                    validationCallback={(invalid) => {
                      this.setState({ expYearError: invalid })
                    }}
                  />
                </div>
              </div>
              <div className="react-inputs-validation__msg_identifier react-inputs-validation__msg___pxv8o react-inputs-validation__error___2aXSp">{dateErrorMsg}</div>
            </div>

            <label>
              <span>Security code</span>
              <Textbox
                attributesInput={{
                  id: "security",
                  name: "security",
                  maxLength: maxSecurity,
                  placeholder: `Enter ${maxSecurity} digits security code`
                }}
                value={security} // Optional.[String].Default: "".
                disabled={false} // Optional.[Bool].Default: false.
                validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                onChange={(security, e) => {
                  onFormChange("security", security)
                }} // Required.[Func].Default: () => {}. Will return the value.
                onBlur={e => {

                }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                validationOption={{
                  name: "Security code", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                  check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                  required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                  customFunc: number => { // Optional.[Func].Default: none. Custom function. Returns true or err message
                    if (!new RegExp("^[0-9]*$").test(number)) {
                      return "Please only enter digits from 0 to 9"
                    } else if (number.length != maxSecurity) {
                      return `Security code must have only ${maxSecurity} digits`;
                    }
                    return true;
                  }
                }}
                validationCallback={(invalid) => {
                  this.setState({ securityError: invalid })
                }}
              />
            </label>
            <div className="row ml-1 mt-1">
              <br></br>
              <br></br>
              <button type="button" className="btn btn-danger" onClick={() => finishPayment()} disabled={disabledPay} >Pay now</button>
            </div>
          </div>
        })}

      </ProductConsumer>
    )
  }
}
export default withRouter(PaymentCardForm);