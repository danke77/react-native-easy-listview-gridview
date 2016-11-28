import React from 'react-native'

module.exports = React.StyleSheet.create({
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
