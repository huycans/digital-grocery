import React, { Component } from 'react'
import Title from './Title'
import { ButtonContainer } from './Button'
import { Link, Redirect } from 'react-router-dom'
import { ProductConsumer } from '../context'

export default class PaymentSucessful extends Component {
  render() {

    return (
      <ProductConsumer>
        {value => {
          //TODO: fix logic: if enter normally, redirect 
          // let { onFormChange, password, email } = value;
          // let {validate} = this.state;
          // let { emailError, passwordError } = this.state;
          // if (email.length == 0){
          //   return <Redirect to="/" />
          // }
          // else 
          return (
            <div className="container">
              <div className="row">
                <div className="mx-auto col-lg-8 col-sm-10">
                  <Title name="Payment" title="successful" />
                  <div className="center-anchor my-4">
                    <Link to="/" >
                      <ButtonContainer>
                        <span className="mr-2">
                          <i className="fa fa-arrow-left text-green" aria-hidden="true">
                            Return to the store
                  </i>
                        </span>
                      </ButtonContainer>


                    </Link>
                  </div>

                  <div className="center-anchor my-4">
                    <Link to="/history" >
                      <ButtonContainer>
                        <span className="mr-2">
                          <i className="fa fa-arrow-left text-green" aria-hidden="true">
                            Or view your order here
                  </i>
                        </span>
                      </ButtonContainer>
                    </Link>
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
