'use strict'

// Module dependencies
var React = require('react-native')
var Icon = require('react-native-vector-icons/FontAwesome')
var util = require('../util/util')

var {
  TabBarIOS,
  ListView,
  View,
  Text,
  Image,
  } = React

var styles = require('./style')

module.exports = React.createClass({

  getInitialState () {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false,
      selectedTab: 'home'
    }
  },

  componentDidMount () {
    this.fetchData()
  },

  fetchData() {
    var REQUEST_URL = `https://api.weibo.com/2/statuses/user_timeline.json?access_token=${this.props.token}`
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json.statuses || []),
          loaded: true
        })
      })
      .done()
  },

  renderContent (color:string, pageText:string) {
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderWeibo}
        style={styles.listView}
      />
    )
  },

  renderLoadingView () {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    )
  },

  renderWeibo (weibo) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: weibo.user.profile_image_url}}
          style={styles.profileImage}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.text}>{weibo.text}</Text>
          <Text style={styles.time}>{util.getDate(weibo.created_at)}</Text>
        </View>
      </View>
    )
  },

  render () {
    return (
      <TabBarIOS
        tintColor={'#5ac8fb'}>
        <Icon.TabBarItem
          title="Home"
          iconName="home"
          selectedIconName="home"
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            this.setState({
              selectedTab: 'home'
            })
          }}>
          {this.renderContent('#414A8C', 'Home')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Post"
          iconName="plus"
          selectedIconName="plus"
          selected={this.state.selectedTab === 'plus'}
          onPress={() => {
            this.setState({
              selectedTab: 'plus'
            })
          }}>
          {this.renderContent('#090', 'Post')}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          title="Me"
          iconName="user"
          selectedIconName="user"
          selected={this.state.selectedTab === 'user'}
          onPress={() => {
            this.setState({
              selectedTab: 'user'
            })
          }}>
          {this.renderContent('#090', 'Me')}
        </Icon.TabBarItem>
      </TabBarIOS>
    )
  }
})
