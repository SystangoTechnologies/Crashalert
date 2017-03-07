/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React, { PropTypes } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform
} from 'react-native';
import isEqual from 'lodash/isEqual';
var SQLiteManager = require('./SQLiteManager').default
var CrashReporter = require('./CrashReporter').default
var Configuration = require('./Configuration')

var sqlMngrObj;
var _this;
var _lblName='';

var actionValue = '';
var superClassName = '';
var actionOn = '';

var RNTouchableWithoutFeedback = React.createClass({

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
    background: PropTypes.any,
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

      if (this.props.title) {

        return (
          <TouchableWithoutFeedback {...touchableProps}
            style={[styles.button, this.props.style]}>
            <Text
              style={[styles.textButton, this.props.textStyle]}
              allowFontScaling={this.props.allowFontScaling}
              key={this.props.title}>
              {this.props.title}
            </Text>
          </TouchableWithoutFeedback>
        );


      } else {
        return (
          <TouchableWithoutFeedback {...touchableProps}
            style={[styles.button, this.props.style]}>
            <View>{this._renderInnerText()}</View>
          </TouchableWithoutFeedback>
        );
      }


    //}
  },

  _onPress: function() {
    if (this.props.onPress) {

      if (Configuration.getIsReportCrash()) {


          actionValue = ''
          if (this._reactInternalInstance._currentElement._owner._currentElement.type.name) {
            if (this._reactInternalInstance._currentElement._owner._currentElement.type.name == 'Constructor') {
              if (this._reactInternalInstance._currentElement._owner._currentElement.type.displayName) {
                superClassName = this._reactInternalInstance._currentElement._owner._currentElement.type.displayName;
              }
            } else if (this._reactInternalInstance._currentElement._owner._currentElement.type.name == 'e') {
              if (this._reactInternalInstance._currentElement._owner._currentElement.type.displayName) {
                superClassName = this._reactInternalInstance._currentElement._owner._currentElement.type.displayName;
              }
            } else {
              superClassName = this._reactInternalInstance._currentElement._owner._currentElement.type.name;
            }

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
        if (item != ' ') {
            actionValue = item;
          }

      } else if (React.isValidElement(item)) {

        flag = true;

        var type = ''

        if (item._owner._currentElement.type.name) {
          if (item._owner._currentElement.type.name == 'Constructor') {
            if (item._owner._currentElement.type.displayName) {
              type = item._owner._currentElement.type.displayName;
            }
          } else if (item._owner._currentElement.type.name == 'e') {
            if (item._owner._currentElement.type.displayName) {
              type = item._owner._currentElement.type.displayName;
            }
          } else {
            type = item._owner._currentElement.type.name;
          }
        }

        var display = '';
        if (item.type.display) {
          display = item.type.display;
        }else if (item.type.displayName) {
          display = item.type.displayName;
        }

        if (item.ref) {
          display = item.ref
        }
        if (actionValue != '') {
          actionValue = type;
        }else {
          actionValue = type;
        }

        return this.recursiveMethod(item.props.children)

      }
    })

    if (!flag) {
      sqlMngrObj.addUserStep(
      {
        className: superClassName,
        methodName: actionValue,
        actionOn: actionOn
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

module.exports = RNTouchableWithoutFeedback;
