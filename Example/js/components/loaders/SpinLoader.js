/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

var React = require('react');
import { StyleSheet,View,TouchableOpacity,Text, Dimensions} from 'react-native';
import NativeBaseComponent from 'native-base/Components/Base/NativeBaseComponent';
import { connect } from 'react-redux';
import ScreenService from '../Screen/screenService.js'

var Spinner = require('react-native-spinkit');
let _this;
class SpinLoader extends NativeBaseComponent {

  constructor(props) {
    super(props);
    _this = this;
    _this.state = {
      index: 0,
      types: ['Bounce', 'CircleFlip', 'WordPress', 'Circle', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', '9CubeGrid', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#FFFFFF",
      isVisible: false,
      orientationChanged:'',
    }
  }

  componentDidMount() {
    if (typeof this.props.getVisibilityMethod === 'function') {
      _this.props.getVisibilityMethod(this.changeVisibility.bind(this));
    }
  }

  changeVisibility(visibility) {
  //  _this.setState({isVisible: visibility});
  }

  dismissSpin() {
      _this.setState({isVisible: false, isScrollEnable: true});

      if(_this.props.superObject)
      _this.props.superObject.setState({isScrollEnable:true});
  }

  render() {

    var type = _this.state.types[_this.state.index];
    if (!this.props.isVisible) {
      return (<View />)
    } else{

    return (
      <View style={[styles.container, {width:_this.props.width,height:_this.props.height}]}>
        <Spinner style={styles.spinner} isVisible={this.props.isVisible} size={_this.state.size} color={_this.state.color}/>
      </View>
    );
  }
}
}

var styles = StyleSheet.create({
  container: {
    top:0,
    left:0,
    right:0,
    bottom:0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  spinner: {
    alignSelf: 'center'
  },

  btn: {
    marginTop: 15,
  },

  text: {
    color: "white",
    fontSize:18,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#fff",
    fontWeight: "bold"
  }
});

export default connect(state =>({ isVisible: state.user.isFetching}), null)(SpinLoader);


// <TouchableOpacity style={styles.btn} onPress={_this.dismissSpin}>
//   <Text style={styles.text}>Exit</Text>
// </TouchableOpacity>
