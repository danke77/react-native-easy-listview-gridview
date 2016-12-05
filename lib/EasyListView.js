import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  Platform,
  View,
  ListView,
  RefreshControl,
  ActivityIndicator
} from 'react-native'

import EmptyView from './EmptyView'
import FooterView from './FooterView'

import * as Dimens from './Dimens'

export default class EasyListView extends Component {

  static propTypes = {
    isDataFixed: PropTypes.bool,
    autoRefresh: PropTypes.bool,
    timeout: PropTypes.number,
    contentContainerStyle: View.propTypes.style,
    containerHeight: PropTypes.number.isRequired,
    containerWidth: PropTypes.number.isRequired,
    dataSizePerPage: PropTypes.number,
    rowHeight: PropTypes.number,
    pageSize: PropTypes.number,
    emptyContent: PropTypes.string,
    renderEmpty: PropTypes.func,
    onChangeVisibleRows: PropTypes.func,
    renderSectionHeader: PropTypes.func,
    renderSeparator: PropTypes.func,
    renderHeader: PropTypes.func,
    renderFooterNoMore: PropTypes.func,
    renderFooterError: PropTypes.func,
    renderFooterLoading: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
    onEndReachedThreshold: PropTypes.number,
    loadingTitle: PropTypes.string,
    loadingTitleColor: PropTypes.string,
    loadingTintColor: PropTypes.string,
    loadingColors: PropTypes.array,
    loadingProgressBackgroundColor: PropTypes.string,
    loadFailContent: PropTypes.string,
    noMoreContent: PropTypes.string,
    fixedData: PropTypes.array,
    refreshHandler: PropTypes.func,
    loadMoreHandler: PropTypes.func,
    responseDataHandler: PropTypes.func,
    // GridView
    column: PropTypes.number
  }

  static defaultProps = {
    isDataFixed: false,
    autoRefresh: true,
    timeout: 10 * 1000,
    contentContainerStyle: {},
    containerHeight: Dimens.WINDOW_HEIGHT_NO_STATUS_BAR,
    containerWidth: Dimens.WINDOW_WIDTH,
    dataSizePerPage: 10,
    pageSize: 1,
    onEndReachedThreshold: 50,
    emptyContent: 'There is no content~',
    loadingTitle: 'loading...',
    loadingTitleColor: '#9b9b9b',
    loadingTintColor: '#9b9b9b',
    loadingColors: ['red', 'red'],
    loadingProgressBackgroundColor: 'white',
    loadFailContent: 'load fail...',
    noMoreContent: 'There is no more~',
    fixedData: [],
    responseDataHandler: (list) => {
      return list
    },
    // GridView
    column: 1
  }

  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({rowHasChanged: (prevRowData, nextRowData) => prevRowData !== nextRowData});
    this.state = {
      pageNo: 1,
      rawData: [],
      dataSource: ds,
      isFirstLoad: true,
      isRefreshing: false,
      isLoadingMore: false,
      isError: false,
      isEmpty: false,
      loadMoreEnable: !this.props.isDataFixed
    }

    this.onChangeVisibleRows = this._onChangeVisibleRows.bind(this)

    this.renderSectionHeader = this._renderSectionHeader.bind(this)
    this.renderSeparator = this._renderSeparator.bind(this)
    this.renderEmpty = this._renderEmpty.bind(this)
    this.renderHeader = this._renderHeader.bind(this)
    this.renderFooter = this._renderFooter.bind(this)
    this.renderFooterNoMore = this._renderFooterNoMore.bind(this)
    this.renderFooterError = this._renderFooterError.bind(this)
    this.renderFooterLoading = this._renderFooterLoading.bind(this)

    this.onLoadMore = this._onLoadMore.bind(this)
    this.onRefresh = this._onRefresh.bind(this)
    this.onSuccess = this._onSuccess.bind(this)
    this.onFailure = this._onFailure.bind(this)

    // GridView
    this.renderGroup = this._renderGroup.bind(this)
  }

  componentDidMount() {
    if (this.props.isDataFixed) {
      this.setState({
        rawData: this.props.fixedData,
        dataSource: this._getDataSource(this.props.fixedData)
      })
    }
    else if (this.props.autoRefresh) {
      this._onRefresh()
    }
  }

  render() {
    return (
      <View style={{height: this.props.containerHeight, width: this.props.containerWidth}}>
        {
          this.state.isEmpty
          ? (this.props.renderEmpty ? this.props.renderEmpty() : this.renderEmpty())
          : null
        }
        <ListView
          style={{flex: 1}}
          contentContainerStyle={this.props.contentContainerStyle}
          dataSource={this.state.dataSource}
          initialListSize={this.props.rowHeight ? (this.props.containerHeight / this.props.rowHeight + this.props.column) : 10}
          pageSize={this.props.column === 1 ? this.props.pageSize : this.props.column + 1}
          removeClippedSubviews={true}
          enableEmptySections={true}
          onChangeVisibleRows={this.props.onChangeVisibleRows ? this.props.onChangeVisibleRows : this.onChangeVisibleRows}
          renderSectionHeader={this.props.renderSectionHeader ? this.props.renderSectionHeader : this.renderSectionHeader}
          renderSeparator={this.props.renderSeparator ? this.props.renderSeparator : this.renderSeparator}
          renderHeader={this.props.renderHeader ? this.props.renderHeader : this.renderHeader}
          renderFooter={this.renderFooter}
          renderRow={this.props.column === 1 ? this.props.renderItem : this.renderGroup}
          onEndReached={this.onLoadMore}
          onEndReachedThreshold={this.props.onEndReachedThreshold}
          refreshControl={
            this.props.isDataFixed
            ? null
            : <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              title={this.props.loadingTitle}
              titleColor={this.props.loadingTitleColor}
              tintColor={this.props.loadingTintColor}
              colors={this.props.loadingColors}
              progressBackgroundColor={this.props.loadingProgressBackgroundColor}
            />
          }
        />
      </View>
    )
  }

  _onChangeVisibleRows(visibleRows, changedRows) {

  }

  _renderSectionHeader(sectionData, sectionID) {
    return null
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return null
  }

  _renderEmpty() {
    return (
      <EmptyView
        containerStyle={{position: 'absolute', height: this.props.containerHeight, width: this.props.containerWidth}}
        emptyContent={this.props.emptyContent}
      />
    )
  }

  _renderHeader() {
    return null
  }

  _renderFooter () {
    if (this.props.isDataFixed) {
      return null
    }

    if (!this.state.loadMoreEnable
        && !this.state.isEmpty
        && !this.state.isLoadingMore
        && !this.state.isRefreshing) {
      return (
        <View>
          {
            this.props.renderFooterNoMore
            ? this.props.renderFooterNoMore()
            : this.renderFooterNoMore()
          }
        </View>
      )
    }

    if (this.state.loadMoreEnable
        && !this.state.isEmpty
        && !this.state.isRefreshing
        && !this.state.isError
        && this.state.rawData.length !== 0) {
      return (
        <View>
          {
            this.props.renderFooterLoading
            ? this.props.renderFooterLoading()
            : this.renderFooterLoading()
          }
        </View>
      )
    }

    if (this.state.isError
        && this.state.rawData.length !== 0) {
      return (
        <View>
          {
            this.props.renderFooterError
            ? this.props.renderFooterError()
            : this.renderFooterError()
          }
        </View>
      )
    }

    return null
  }

  _renderFooterNoMore() {
    return (
      <FooterView
        footerContent={this.props.noMoreContent}
      />
    )
  }

  _renderFooterError() {
    return (
      <FooterView
        footerContent={this.props.loadFailContent}
      />
    )
  }

  _renderFooterLoading() {
    return (
      <FooterView
        renderFooter={() => {
          return (
            <ActivityIndicator
              animating={true}
              color={'#9b9b9b'}
              size='small'
            />
          )
        }}
      />
    )
  }

  removeItem(removedItem) {
    var allData = this.state.rawData.filter(item => item !== removedItem)

    this.setState({
      rawData: allData,
      dataSource: this._getDataSource(allData)
    })
  }

  _onRefresh() {
    if (this.state.isRefreshing) {
      return
    }

    this._setRefreshTimeout()

    this.setState({
      pageNo: 1,
      isFirstLoad: true,
      isRefreshing: true,
      isLoadingMore: false,
      isError: false,
      isEmpty: false,
      loadMoreEnable: false
    }, () => {
      this.props.refreshHandler &&
      this.props.refreshHandler(this.state.pageNo, this.onSuccess, this.onFailure)
    })
  }

  _onLoadMore() {
    if (this.state.isRefreshing
        || this.state.isLoadingMore
        || !this.state.loadMoreEnable
        || this.state.isFirstLoad) {
      return
    }

    this.setState({
      isRefreshing: false,
      isLoadingMore: true,
      isError: false,
      isEmpty: false,
      loadMoreEnable: true
    }, () => {
      this.props.loadMoreHandler &&
      this.props.loadMoreHandler(this.state.pageNo, this.onSuccess, this.onFailure)
    })
  }

  _onSuccess(list) {
    var newData = list instanceof Array ? list : JSON.parse(list)
    var allData = this.state.isFirstLoad ? newData : this.state.rawData.concat(newData)

    this._clearRefreshTimeout()

    this.setState({
      pageNo: this.state.pageNo + 1,
      rawData: allData,
      dataSource: this._getDataSource(allData),
      isFirstLoad: false,
      isRefreshing: false,
      isLoadingMore: false,
      isError: false,
      isEmpty: allData.length === 0,
      loadMoreEnable: newData.length >= this.props.dataSizePerPage // newData.length !== 0
    })
  }

  _onFailure(msg, error) {
    this._clearRefreshTimeout()

    this.setState({
      isFirstLoad: false,
      isRefreshing: false,
      isLoadingMore: false,
      isError: true,
      isEmpty: false,
      loadMoreEnable: true
    })

    alert(msg.toString())
  }

  _setRefreshTimeout() {
    this.timer = setTimeout(() => {
      if (this.state.isRefreshing) {
        this.onFailure('load fail...', null)
      }
    }, this.props.timeout)
  }

  _clearRefreshTimeout() {
    this.timer && clearTimeout(this.timer)
  }

  _getDataSource(data) {
    return this.state.dataSource.cloneWithRows(this.props.column === 1
              ? this.props.responseDataHandler(data)
              : this._groupItems(this.props.responseDataHandler(data)))
  }

  // GridView
  _renderGroup(group) {
    var items = group.map((item, index) => {
      return this.props.renderItem(index, item)
    })

    return (
      <View style={styles.group}>
        {items}
      </View>
    )
  }

  _groupItems(items) {
    var itemsGroups = []
    var group = []
    items.map((item, index) => {
      if (group.length === this.props.column) {
        itemsGroups.push(group)
        group = [item]
      } else {
        group.push(item)
      }
    })

    if (group.length > 0) {
      itemsGroups.push(group)
    }

    return itemsGroups
  }
}

const styles = StyleSheet.create({
  // GridView
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'hidden'
  }
})
