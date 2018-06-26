import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import PropTypes from 'prop-types'

export default class EmptyView extends Component {

  static propTypes = {
    containerStyle: View.propTypes.style,
    emptyContent: PropTypes.string,
    renderEmpty: PropTypes.func
  }

  static defaultProps = {
    emptyContent: 'There is no content~'
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        {
          this.props.renderEmpty
          ? this.props.renderEmpty()
          : <View style={styles.defaultView}>
              <Text style={styles.emptyContent}>
                {this.props.emptyContent}
              </Text>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  defaultView: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  emptyContent: {
    color: '#9b9b9b',
    fontSize: 15,
    marginTop: 100
  }
})
