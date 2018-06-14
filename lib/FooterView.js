import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import PropTypes from 'prop-types';

export default class FooterView extends Component {

  static propTypes = {
    containerStyle: View.propTypes.style,
    footerContent: PropTypes.string,
    renderFooter: PropTypes.func
  }

  static defaultProps = {
    footerContent: 'There is no more~'
  }

  render() {
    return (
      <View
        style={[styles.container, this.props.containerStyle]}>
        {
          this.props.renderFooter
          ? this.props.renderFooter()
          : <Text style={styles.footerContent}>
              {this.props.footerContent}
            </Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  footerContent: {
    color: '#9b9b9b',
    fontSize: 14
  }
})
