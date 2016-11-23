import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

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
