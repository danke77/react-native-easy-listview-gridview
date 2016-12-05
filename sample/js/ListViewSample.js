import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native'

import EasyListView from 'react-native-easy-listview-gridview'
import Styles from './Styles'
import GridStyles from './GridStyles'

const DATA_SIZE_PER_PAGE = 10

export default class ListViewSample extends Component {

  static propTypes = {
    empty: PropTypes.bool,
    error: PropTypes.bool,
    noMore: PropTypes.bool,
    column: PropTypes.number
  }

  static defaultProps = {
    empty: false,
    error: false,
    noMore: false,
    column: 1
  }

  constructor(props) {
    super(props)

    this.renderListItem = this._renderListItem.bind(this)
    this.renderGridItem = this._renderGridItem.bind(this)
    this.onFetch = this._onFetch.bind(this)
  }

  render() {
    return (
      <EasyListView
        ref={component => this.listview = component}
        dataSizePerPage={DATA_SIZE_PER_PAGE}
        column={this.props.column}
        rowHeight={this.props.column === 1 ? 60 : Dimensions.get('window').width / 2}
        renderItem={this.props.column === 1 ? this.renderListItem : this.renderGridItem}
        refreshHandler={this.onFetch}
        loadMoreHandler={this.onFetch}
      />
    )
  }

  _renderListItem(rowData, sectionID, rowID, highlightRow) {
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

  _renderGridItem(index, rowData, sectionID, rowID, highlightRow) {
    return (
      <View
        key={index}
        style={GridStyles.rowContainer}>
        <TouchableHighlight
          style={{flex: 1}}
          onPress= {() => alert(rowData)}>
          <View
            style={GridStyles.rowContent}>
            <Text
              style={GridStyles.rowTitle}>
              {rowData}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  _onFetch(pageNo, success, failure) {
    this.timer = setTimeout(() => {
      if (this.props.empty) {
        success([])
      }
      else if (this.props.error) {
        if (pageNo === 1) {
          var list = []
          for (i = (pageNo - 1) * DATA_SIZE_PER_PAGE; i < pageNo * DATA_SIZE_PER_PAGE; i++) {
            list.push(i)
          }
          success(list)
        }
        else {
          failure('load fail...', null)
        }
      }
      else if (this.props.noMore) {
        if (pageNo === 1) {
          var list = []
          for (i = (pageNo - 1) * DATA_SIZE_PER_PAGE; i < pageNo * DATA_SIZE_PER_PAGE; i++) {
            list.push(i)
          }
          success(list)
        }
        else {
          success([])
        }
      }
      else {
        var list = []
        for (i = (pageNo - 1) * DATA_SIZE_PER_PAGE; i < pageNo * DATA_SIZE_PER_PAGE; i++) {
          list.push(i)
        }
        success(list)
      }
    }, 1000)
  }
}
