import React, { Component } from 'react'
import {
  StyleSheet,
  Navigator,
  BackAndroid,
  StatusBar,
  Platform,
  View
} from 'react-native'

import Samples from './Samples'

const STATUS_BAR_HEIGHT = (Platform.OS === 'android' ? StatusBar.currentHeight : 20)
const getStatusBarHeight = () => new Promise((resolve, reject) => {
  if (Platform.OS === 'android') {
    resolve({platform: 'android', height: StatusBar.currentHeight})
  } else {
    StatusBarManager.getHeight(result => resolve({platform: 'ios', height: result.height}))
  }
})

export default class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      statusBarHeight: STATUS_BAR_HEIGHT
    }
    this.handleBack = this._handleBack.bind(this)
  }

  componentDidMount () {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.handleBack)
    }
  }

  componentWillUnmount () {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBack)
    }
  }

  _handleBack () {
    var navigator = this.navigator

    if (navigator && navigator.getCurrentRoutes().length > 1) {
      navigator.pop()
      return true
    }
    return false
  }

  render () {
    return (
      <View
        onLayout={() => getStatusBarHeight().then(result => this.setState({statusBarHeight: result.height}))}
        style = {styles.container}>
        {
          Platform.OS === 'android'
          ? <View
              style={{height: this.state.statusBarHeight, backgroundColor: '#222222'}}/>
          : null
        }
        <Navigator
          ref={component => this.navigator = component}
          initialRoute={{
            component: Samples
          }}
          renderScene={(route, navigator) => {
            return <route.component navigator={navigator} {...route} {...route.passProps}/>
          }}/>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  }
})
