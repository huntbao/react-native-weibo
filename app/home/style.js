let React = require('react-native')

let {
  StyleSheet,
  } = React

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  rightContainer: {
    flex: 1
  },
  text: {
    fontSize: 14,
    marginBottom: 8
  },
  time: {
    fontSize: 12
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  }
});
