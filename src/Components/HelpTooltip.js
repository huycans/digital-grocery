import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import { ProductConsumer } from "../context"

const HelpTooltip = ({ msg }) => {
  return (
    <ProductConsumer>
      {value => {
        const { help } = value;
        if (help) {
          return <React.Fragment>
            <i data-tip={msg} class="far fa-question-circle"></i>
            <ReactTooltip place="top" type="dark" effect="solid" />
            </React.Fragment>
        }
        else return null;
      }}
    </ProductConsumer>
  )
}
export default HelpTooltip;
