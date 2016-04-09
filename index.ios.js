/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict'

let React = require('react-native')
let url = require('url')

let HomeView = require('./app/home')
let config = require('./app/config/config')

let {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  LinkingIOS
  } = React

let OAUTH_URL = [
  'https://api.weibo.com/oauth2/authorize',
  '?client_id=' + config.app_key,
  '&response_type=code',
  '&redirect_uri=' + config.redirect_uri
].join('')

let Gzool = React.createClass({

  getInitialState () {
    return {
      login: false,
      messages: []
    }
  },

  componentDidMount() {
    this._loadInitialState().done()
  },

  async _loadInitialState() {
    try {
      let value = await AsyncStorage.getItem(config.STORAGE_KEY)
      if (value !== null) {
        this.setState({
          login: true,
          token: value
        })
        this._appendMessage('Recovered access_token from disk: ' + value)
      } else {
        this._appendMessage('Initialized with no access_token on disk.')
      }
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message)
    }
  },

  render () {

    if (this.state.login) {
      return (
        <HomeView token={this.state.token} />
      )
    }

    return (
      <View style={{flex: 1}}>
        <WebView
          ref={'webview'}
          source={{uri: OAUTH_URL}}
          automaticallyAdjustContentInsets={false}
          onNavigationStateChange={this.onNavigationStateChange}
          startInLoadingState={true}
          scalesPageToFit={true}/>
      </View>
    )
  },

  onNavigationStateChange (navState) {
    let urlObj = url.parse(navState.url, true)
    if (urlObj.pathname == url.parse(config.redirect_uri).pathname) {
      // 获取code
      let code = urlObj.query.code
      let auth_url = [config.auth_uri,
        '?client_id=' + config.app_key,
        '&client_secret=' + config.app_secret,
        '&grant_type=authorization_code',
        '&redirect_uri=' + config.redirect_uri,
        '&code=' + code
      ].join('')

      fetch(auth_url, {
        method: 'post'
      }).then((response) => response.json())
        .then((responseData) => {
          this.setState({
            login: true,
            token: responseData.access_token
          })
        })
        .catch((err) => console.log(err))
        .done()
    }
  },

  _appendMessage(message) {
    this.setState({messages: this.state.messages.concat(message)})
  }
})

AppRegistry.registerComponent('Gzool', () => Gzool)
