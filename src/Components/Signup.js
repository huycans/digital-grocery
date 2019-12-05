import React, { Component } from 'react'
import Title from './Title'
import { Link, Redirect } from 'react-router-dom'
import { ProductConsumer } from '../context'
import { Textbox, Radiobox, Select } from 'react-inputs-validation';
import HelpTooltip from "./HelpTooltip"

export default class Signup extends Component {
  state = {
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    validate: false
  }
  handleChange(name, value){
    this.setState({[name]: value});
  }
  signin(onFormChange){
    //check inputs, if ok than move on, else do nothing
    console.log("signing in");
    this.setState({validate: true});
    const {
      emailError,
      passwordError,
      email, 
      password
    } = this.state;

    if (emailError || passwordError){
      return;
    }
    
    //set email and password
    onFormChange("email", email);
    onFormChange("password", password);

    //redirect to homepage
    this.props.history.push("/");

    //for app.js, when entering /signin or /signup, redirect to home page if already signed in

  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  render() {
    return (
      <ProductConsumer>
        {value => {
          let { onFormChange, password, email } = value;
          let {validate} = this.state;
          let { emailError, passwordError } = this.state;
          if (email.length != 0){
            return <Redirect to="/" />
          }

          return (
            <div className="container">
              <div className="row">
                <div className="mx-auto col-lg-8 col-sm-10">
                  <Title name="Sign" title="up" />
                  <br></br>
                  <div className="container">
                    <div className="row justify-content-center">
                      <label>
                        <h4>Email</h4>
                        <Textbox
                          attributesInput={{
                            id: "email",
                            name: "email",
                            placeholder: "Enter your email"
                          }}
                          classNameInput={"signin"}
                          value={email} // Optional.[String].Default: "".
                          disabled={false} // Optional.[Bool].Default: false.
                          validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                          onChange={(email, e) => {
                            this.handleChange("email", email)
                          }} // Required.[Func].Default: () => {}. Will return the value.
                          onBlur={e => {

                          }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                          validationOption={{
                            name: "Email", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: email => { // Optional.[Func].Default: none. Custom function. Returns true or err message
                              if (!this.validateEmail(email)) {
                                return "A valid email looks like this: example@example.com"
                              }
                              return true;
                            }
                          }}
                          validationCallback={(invalid) => {
                            this.setState({ emailError: invalid })
                          }}
                        />
                      </label>
                    </div>
                    <br></br>
                    <div className="row justify-content-center">
                      <label>
                        <h4>Password <HelpTooltip msg="Password must have at least 6 characters"  /></h4>
                        <Textbox
                          attributesInput={{
                            id: "password",
                            name: "password",
                            placeholder: `Enter password`,
                            type: "password"
                          }}
                          classNameInput="signin"
                          value={password} // Optional.[String].Default: "".
                          disabled={false} // Optional.[Bool].Default: false.
                          validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                          onChange={(password, e) => {
                            this.handleChange("password", password)
                          }} // Required.[Func].Default: () => {}. Will return the value.
                          onBlur={e => {

                          }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                          validationOption={{
                            name: "Password", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                            check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                            required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                            customFunc: password => { // Optional.[Func].Default: none. Custom function. Returns true or err message
                              if (password.length < 6) return "Password must be at least 6 characters"
                              return true;
                            }
                          }}
                          validationCallback={(invalid) => {
                            this.setState({ passwordError: invalid })
                          }}
                        />
                      </label>
                    </div>
                    <br></br>
                    <div className="row justify-content-center">
                      <button style={{ width: "200px" }} type="button" className="btn btn-primary" onClick={() => this.signin(onFormChange)}  >Signup</button>
                    </div>
                  </div>
                  <div className="row justify-content-center mt-2">
                    <Link to="/signin" >I already have an account</Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        }
      </ProductConsumer>
    )
  }
}
