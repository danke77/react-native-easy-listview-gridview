import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import EasyListView from './lib/EasyListView'

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

  _renderItem(index, rowData, sectionID, rowID, highlightRow) {
    return (
      <View
        key={index}
        style={styles.rowContainer}>
        <TouchableHighlight
          style={{flex: 1}}
          onPress= {() => alert(rowData)}>
          <View
            style={styles.rowContent}>
            <Text
              style={styles.rowTitle}>
              {rowData}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separate}/>
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

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    overflow: 'hidden',
    height: 50,
    flexDirection: 'column'
  },
  rowContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  rowTitle: {
    color: '#333333',
    fontSize: 15
  },
  separate: {
    height: 0.5,
    backgroundColor: '#bbbbbb'
  }
})
