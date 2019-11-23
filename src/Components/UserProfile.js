import React, { Component } from 'react'
import { ButtonContainer } from './Button'
import { ProductConsumer } from '../context'
import { Checkbox } from 'react-inputs-validation';
import Title from './Title'

export default class UserProfile extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          let { onFormChange, help, username, email } = value;

          return (
            <div className="py-5">
              <div className="container">
                  <Title name="user" title="profile" />
                  <p>
                    <h3>Your account detail: </h3>
                  </p>
                  <p>
                    <h4>
                      Username: {username}
                    </h4>
                  </p>
                  <p>
                    <h4>
                      Email: {email}
                    </h4>
                  </p>
                  <p style={{"maxWidth": "300px"}}>
                    <Checkbox
                      attributesWrapper={{}} //Optional.
                      attributesInput={{ id: 'help', name: 'help' }} //Optional.
                      value={help} //Required.[String].Default: "".
                      checked={help} //Required.[Bool].Default: false.
                      disabled={false} //Optional.[Bool].Default: false.
                      validate={false} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                      classNameContainer="" // Optional.[String].Default: "".
                      classNameInputBox="subscribed-checkbox"
                      onChange={(isChecked, e) => {
                        onFormChange("help", isChecked);
                      }}
                      labelHtml={
                        <div style={{ color: '#4a4a4a', marginTop: '2px', "fontSize": "1.5rem" }}>
                          Turn on help message
                        </div>
                      } //Required.[Html].Default: none.
                      validationOption={{
                        name: 'help', //Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
                        check: false, //Optional.[Bool].Default: true. To determin if you need to validate.
                        required: false, //Optional.[Bool].Default: true. To determin if it is a required field.
                        showMsg: false
                      }}
                      validationCallback={res => { }} //Optional.[Func].Default: none. Return the validation result.
                    />
                  </p>
                  <p>
                    <ButtonContainer>
                      Edit my profile
                    </ButtonContainer>
                  </p>
                </div>
            </div>
          )
        }}
      </ProductConsumer>
    )
  }
}

