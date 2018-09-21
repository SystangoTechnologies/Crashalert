/**
 * Powered by Systango
 * http://www.systango.com
 */
import React, { Component } from 'react';
import {
  Image, View, Text, Alert, Dimensions
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, TouchableHighlight, TouchableOpacity } from 'rn-crash-reporter';
import CodePush from 'react-native-code-push';
import * as fetchRoute from '../../actions/route';
import * as authActions from '../../actions/user';
import styles from './styles';

class Home extends Component {
  /*
 * Home - Lifecycle
 */
  constructor(props) {
    super(props);

    this.state = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      restartAllowed: false
    };
  }

  async componentWillMount() {
    CodePush.allowRestart();

    CodePush.checkForUpdate().then((update) => {
      if (update) {
        Alert.alert(
          'Upgrade',
          'New update is available. Do you want to upgrade the app?',
          [
            { text: 'YES', onPress: () => {} },
            { text: 'NO', onPress: () => this.syncImmediate() },
          ],
          { cancelable: false }
        );
      }
    });
  }

  render() {
    if (this.state.progress) {
      progressView = (
        <Text style={styles.messages}>
          {this.state.progress.receivedBytes}
          {' '}
of
          {' '}
          {this.state.progress.totalBytes}
          {' '}
bytes received
        </Text>
      );
    }

    return (
      <View style={{ backgroundColor: '#59636C', width: this.state.width, height: this.state.height }}>
        <View style={styles.nameContainer}>
          <Image source={require('../../../assets/home/user.png')} />
        </View>
        <View style={styles.container}>
          <Button style={[styles.btn, { width: this.state.width - 70 }]} classRef={this.constructor.name} onPress={() => this.setState({ syncMessage: 'Step 1 clicked' })}>
                To record step 1, Click here!
          </Button>
          <Button style={[styles.btn, { width: this.state.width - 70 }]} classRef={this.constructor.name} onPress={() => this.setState({ syncMessage: 'Step 2 clicked' })} searchText="2912">
                To record step 2, Click here!
          </Button>
          <TouchableHighlight
            style={[styles.btn, { width: this.state.width - 70 }]}
            classRef={this.constructor.name}
            onPress={() => { throw new Error('Javascript error test successful!'); }
            }
          >
               <Text> For JS Crash, Click Here! </Text>
          </TouchableHighlight>
          <TouchableOpacity
            style={[styles.btn, { width: this.state.width - 70 }]}
            classRef={this.constructor.name}
            onPress={() => this.divideCrash()
            }
          >
            <Text> For Random Crash, Click Here! </Text>
          </TouchableOpacity>
          <Button style={[styles.btn, { width: this.state.width - 70 }]} classRef={this.constructor.name} onPress={() => this.pressViewCrashReport()}>
                Search
          </Button>
          <Text style={styles.messages}>{this.state.syncMessage || ''}</Text>
        </View>
      </View>
    );
  }

  onButtonPress() {
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.IMMEDIATE
    });
  }

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        this.setState({ syncMessage: 'Checking for update.' });
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ syncMessage: 'Downloading package.' });
        break;
      case CodePush.SyncStatus.AWAITING_USER_ACTION:
        this.setState({ syncMessage: 'Awaiting user action.' });
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        this.setState({ syncMessage: 'Installing update.' });
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        this.setState({ syncMessage: 'App up to date.', progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_IGNORED:
        this.setState({ syncMessage: 'Update cancelled by user.', progress: false });
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        CodePush.restartApp(false);
        this.setState({ syncMessage: 'Update installed and will be applied on restart.', progress: false });
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        this.setState({ syncMessage: 'An unknown error occurred.', progress: false });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({ progress });
  }

  toggleAllowRestart() {
    this.state.restartAllowed
      ? CodePush.disallowRestart()
      : CodePush.allowRestart();

    this.setState({ restartAllowed: !this.state.restartAllowed });
  }

  getUpdateMetadata() {
    CodePush.getUpdateMetadata(CodePush.UpdateState.RUNNING)
      .then((metadata) => {
        this.setState({ syncMessage: metadata ? JSON.stringify(metadata) : 'Running binary version', progress: false });
      }, (error) => {
        this.setState({ syncMessage: `Error: ${error}`, progress: false });
      });
  }

  /** Update is downloaded silently, and applied on restart (recommended) */
  sync() {
    CodePush.sync(
      {},
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  /** Update pops a confirmation dialog, and then immediately reboots the app */
  syncImmediate() {
    CodePush.sync(
      { installMode: CodePush.InstallMode.IMMEDIATE, updateDialog: true },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  /*
  * Home - Private Method
  */

  handleMenu() {
    const { menuOpen } = this.state;
    this.setState({
      menuOpen: !menuOpen
    });
  }

  pressViewCrashReport() {
    this.props.navigation.navigate('Search');
  }

  divideCrash() {
    txt = 'a';
    while (1) {
      txt = txt += 'a'; // add as much as the browser can handle
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.response,
    profileImage: state.user.profileImage,
    isFetching: state.user.isFetching,
  };
}

function bindActions(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
    route: bindActionCreators(fetchRoute, dispatch)
  };
}
Home = CodePush(Home);

export default connect(mapStateToProps, bindActions)(Home);
