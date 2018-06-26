import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import PropTypes from 'prop-types'

import EasyListView from './EasyListView'

export default class EasyGridView extends Component {

  static propTypes = {
    column: PropTypes.number.isRequired,
    renderItem: PropTypes.func.isRequired
  }

  render() {
    return (
      <EasyListView
        {...this.props}
        pageSize={this.props.column + 1} // should be a multiple of the no. of visible cells per row
      />
    )
  }
}
