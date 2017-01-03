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
var actionValue = '';

var superClassName = '';
var actionOn = '';

var SRNView = React.createClass ({


    componentWillMount: function ()  {
      //*> Initialize bug RNSystangoBugReporter
      new CrashReporter()
      sqlMngrObj = new SQLiteManager()
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
          const element = (
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
      if (SRNView.isAndroid) {
        touchableProps = Object.assign(touchableProps, {
          background: this.props.background || TouchableNativeFeedback.SelectableBackground()
        });
        return (
          <TouchableNativeFeedback {...touchableProps}>
            <View style={[styles.button, this.props.style]}>
              {this._renderInnerText()}
            </View>
          </TouchableNativeFeedback>
        )
      } else {
        return (
          <TouchableOpacity {...touchableProps}
            style={[styles.button, this.props.style]}>
            {this._renderInnerText()}
          </TouchableOpacity>
        );
      }
    },

    _onPress: function() {

      if (this.props.onPress) {

        if (Configuration.getIsReportCrash()) {
          actionValue = ''
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

        } else if (React.isValidElement(item)) { // Rendered Class name
          flag = true;
          if (item._owner._currentElement._owner) {
            if (item._owner._currentElement._owner._currentElement) {
              if (item._owner._currentElement._owner._currentElement._owner) {
                superClassName = item._owner._currentElement._owner._currentElement._owner._currentElement.type.name;
              }
            }
          }

          if (actionValue != '') {
            actionValue = actionValue+ ", "+ item.type.name ? item.type.name : item.type.displayName;
          }else {
            actionValue = item.type.name ? item.type.name : item.type.displayName;
          }

          return this.recursiveMethod(item.props.children)

        }
      })
        var action = '';
        if (this.props.actionOn) {   //Action on
          action = this.props.actionOn;
        }

        if (!flag) {
          var met = actionValue + " + "+ action
          sqlMngrObj.addUserStep(
          {
            className: superClassName,
            methodName: met,
            actionOn: action
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

module.exports = SRNView;
