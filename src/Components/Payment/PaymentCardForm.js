import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Textbox, Radiobox, Select } from 'react-inputs-validation';
import HelpTooltip from "../HelpTooltip"
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { ProductConsumer } from '../../context';
import { monthList, yearList } from '../constants';
import { withRouter, Redirect } from 'react-router-dom';
import {cards} from '../constants'

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
    expYear: "",
    validate: false,
    isRedirecting: false
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

  // toggleValidate() {
  //   this.setState({ validate: !this.state.validate });
  // }

  render() {
    if (this.state.isRedirecting){
      return <Redirect to={{
        pathname: "/history",
        state: { isFromPayment: true }
      }} />
    }
    return (
      <ProductConsumer>
        {(value => {
          // console.log("Rendering");
          let { onFormChange, name, cardnum, expMonth, expYear, security, pay } = value;
          let { paymethod, history } = this.props;
          let { paymethodError,
            nameError,
            cardnumError,
            securityError,
            dateErrorMsg,
            validate } = this.state;

          const checkAndPay = () => {
            this.setState({ validate: true });
            if (!(!nameError && !cardnumError && !(expMonth == "") && !(expYear == "") && !securityError && this.checkDate())) {
              return;
            }
            pay();
            this.setState({isRedirecting: true})
            // history.push("/history");
            // setTimeout(() => {
              
            // }, 300); 
          }

          let maxCardLength;
          let maxSecurity;
          if (paymethod == "amexpress") {
            maxCardLength = 15;
            maxSecurity = 4;
          }
          else {
            maxCardLength = 16;
            maxSecurity = 3;
          }
          let cardName = cards.find((card) => {
            return card.id == paymethod
          }).name;
          return <div className="column my-3">
            <h3>Enter your {cardName} card information below</h3>

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
              <span>Card number <HelpTooltip msg="Visa and Mastercard's number is 16 digits long, American Express is 15" /></span>
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
                  // onFormChange("cardnum", cardnum.replace(/\D/g, ''))
                  onFormChange("cardnum", cardnum)
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
                      return `Card number has ${maxCardLength} digits`;
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
              <span>Expiration date <HelpTooltip msg="Expiration date on your card should look like mm/yy or mm/yyyy" /></span>
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
                    validate={validate}
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
                    validate={validate}
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
              <span>Security code <HelpTooltip msg="Visa and Mastercard's security code is 3 digits long and on the back of the card, American Express's is 4 digits and on the front" /></span>
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
                      return "Please enter only digits from 0 to 9"
                    } else if (number.length != maxSecurity) {
                      return `Security code has ${maxSecurity} digits`;
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
              <button type="button" className="btn btn-danger" onClick={checkAndPay}
              // disabled={disabledPay} 
              >Pay now</button>
            </div>
          </div>
        })}

      </ProductConsumer>
    )
  }
}
export default withRouter(PaymentCardForm);