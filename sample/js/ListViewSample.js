import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import EasyListView from './lib/EasyListView'
import Styles from './Styles'

const DATA_SIZE_PER_PAGE = 10

export default class ListViewSample extends Component {

  constructor(props) {
    super(props)

    this.renderItem = this._renderItem.bind(this)
    this.onFetch = this._onFetch.bind(this)
  }

  render() {
    return (
      <EasyListView
        ref={component => this.listview = component}
        dataSizePerPage={DATA_SIZE_PER_PAGE}
        rowHeight={50}
        renderItem={this.renderItem}
        refreshHandler={this.onFetch}
        loadMoreHandler={this.onFetch}
      />
    )
  }

  _renderItem(rowData, sectionID, rowID, highlightRow) {
    return (
      <View
        style={Styles.rowContainer}>
        <TouchableHighlight
          style={{flex: 1}}
          onPress= {() => alert(rowData)}>
          <View
            style={Styles.rowContent}>
            <Text
              style={Styles.rowTitle}>
              {rowData}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={Styles.separate}/>
      </View>
    )
  }

  _onFetch(pageNo, success, failure) {
    this.timer = setTimeout(() => {
      var list = []
      for (i = (pageNo - 1) * DATA_SIZE_PER_PAGE; i < pageNo * DATA_SIZE_PER_PAGE; i++) {
        list.push(i)
      }
      success(list)
    }, 1000)
  }
}
