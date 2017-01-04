/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React, { PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import isEqual from 'lodash.isequal';

var SQLiteManager = require('./SQLiteManager').default
var CrashReporter = require('./CrashReporter').default
var Configuration = require('./Configuration')

var sqlMngrObj;
var _this;
var _lblName='';

var actionValue = '';
var superClassName = '';
var actionOn = '';

var Button = React.createClass({

  componentWillMount: function ()  {
    //*> Initialize bug RNSystangoBugReporter
    new CrashReporter()
    sqlMngrObj = new SQLiteManager()
    _this = this;

    console.log("button calling ");
  },

  propTypes: {
    textStyle: Text.propTypes.style,
    disabledStyle: Text.propTypes.style,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.element
    ]),
    accessibilityLabel: PropTypes.string,
    activeOpacity: PropTypes.number,
    allowFontScaling: PropTypes.bool,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    activityIndicatorColor: PropTypes.string,
    delayLongPress: PropTypes.number,
    delayPressIn: PropTypes.number,
    delayPressOut: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    background: (TouchableNativeFeedback.propTypes) ? TouchableNativeFeedback.propTypes.background : PropTypes.any,
  },

  statics: {
    isAndroid: (Platform.OS === 'android'),
  },

  _renderChildren: function() {
    let childElements = [];
    React.Children.forEach(this.props.children, (item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        var element = (
          <Text
            style={[styles.textButton, this.props.textStyle]}
            allowFontScaling={this.props.allowFontScaling}
            key={item}>
            {item}
          </Text>
        );
        childElements.push(element);
      } else if (React.isValidElement(item)) {
        childElements.push(item);
      }
    });
    return (childElements);
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    if (!isEqual(nextProps, this.props)) {
      return true;
    }
    return false;
  },

  _renderInnerText: function () {
    if (this.props.isLoading) {
      return (
        <ActivityIndicator
          animating={true}
          size='small'
          style={styles.spinner}
          color={this.props.activityIndicatorColor || 'black'}
        />
      );
    }
    return this._renderChildren();
  },

  render: function () {

    if (this.props.isDisabled === true || this.props.isLoading === true) {
      return (
        <View style={[styles.button, this.props.style, (this.props.disabledStyle || styles.opacity)]}>
          {this._renderInnerText()}
        </View>
      );
    }
    // Extract Touchable props
    let touchableProps = {
      accessibilityLabel: this.props.accessibilityLabel,
      onPress: this._onPress,
      onPressIn: this._onPressIn,
      onPressOut: this._onPressOut,
      onLongPress: this._onLongPress,
      activeOpacity: this.props.activeOpacity,
      delayLongPress: this.props.delayLongPress,
      delayPressIn: this.props.delayPressIn,
      delayPressOut: this.props.delayPressOut,
    };
    if (Button.isAndroid) {
      touchableProps = Object.assign(touchableProps, {
        background: this.props.background || TouchableNativeFeedback.SelectableBackground()
      });


      if (this.props.title) {

        return (
          <TouchableNativeFeedback {...touchableProps}
            style={[styles.button, this.props.style, {borderWidth: _this.props.isBorder != null ? (_this.props.isBorder ? 1 : 0) : 1}]}>
            <Text
              style={[styles.textButton, this.props.textStyle]}
              allowFontScaling={this.props.allowFontScaling}
              key={this.props.title}>
              {this.props.title}
            </Text>
          </TouchableNativeFeedback>
        );


      } else {
        return (
          <TouchableNativeFeedback {...touchableProps}>
            <View style={[styles.button, this.props.style, {borderWidth: _this.props.isBorder != null ? (_this.props.isBorder ? 1 : 0) : 1}]}>
              {this._renderInnerText()}
            </View>
          </TouchableNativeFeedback>
        )
      }



    } else {

      if (this.props.title) {

        return (
          <TouchableOpacity {...touchableProps}
            style={[styles.button, this.props.style, {borderWidth: _this.props.isBorder != null ? (_this.props.isBorder ? 1 : 0) : 1}]}>
            <Text
              style={[styles.textButton, this.props.textStyle]}
              allowFontScaling={this.props.allowFontScaling}
              key={this.props.title}>
              {this.props.title}
            </Text>
          </TouchableOpacity>
        );


      } else {
        return (
          <TouchableOpacity {...touchableProps}
            style={[styles.button, this.props.style, {borderWidth: _this.props.isBorder != null ? (_this.props.isBorder ? 1 : 0) : 1}]}>
            {this._renderInnerText()}
          </TouchableOpacity>
        );
      }


    }
  },

  _onPress: function() {
    if (this.props.onPress) {

      if (Configuration.getIsReportCrash()) {

          actionValue = ''
          if (this._reactInternalInstance._currentElement._owner._currentElement.type.name) {
            superClassName = this._reactInternalInstance._currentElement._owner._currentElement.type.name;
          }

          if (this.props.actionOn) {
            actionOn = this.props.actionOn;
          }

            this.recursiveMethod(this.props.children)
          }

          this.props.onPress()
    }
  },

  recursiveMethod(items) {

    var flag = false;

    React.Children.forEach(items, (item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        if (actionValue != '') {
          actionValue = actionValue+ ", "+ item;
        }else {
          actionValue = item;
        }

      } else if (React.isValidElement(item)) {

        flag = true;

        var type = item._owner._currentElement.type.name

        var display = item.type.display;
        if (item.ref) {
          display = item.ref
        }
        if (actionValue != '') {
          actionValue = actionValue+ ", "+ display +" + "+type;
        }else {
          actionValue = display +" + "+type;
        }

        return this.recursiveMethod(item.props.children)

      }
    })

    if (!flag) {
      sqlMngrObj.addUserStep(
      {
        className: superClassName,
        methodName: actionValue,
        actionOn: ''
      });
    }


  },

  _onPressIn: function() {

    if (this.props.onPressIn) {
      this.props.onPressIn()
    }
  },

  _onPressOut: function() {

    if (this.props.onPressOut) {
      this.props.onPressOut()
    }
  },

  _onLongPress: function() {

    if (this.props.onLongPress) {
      this.props.onLongPress()
    }
  }


});

const styles = StyleSheet.create({
  button: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  textButton: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },
});

module.exports = Button;
