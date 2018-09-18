/**
 * Powered by Systango
 * http://www.systango.com
 */

 'use strict';

 import React, {Component} from 'react';
 import {
   View,
   TouchableOpacity,
   Text,
   StyleSheet,
   ActivityIndicator,
   TouchableNativeFeedback,
   Platform
 } from 'react-native';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types'
 var SQLiteManager = require('./SQLiteManager').default
 var CrashReporter = require('./CrashReporter').default
 var Configuration = require('./Configuration')

 var sqlMngrObj;
var actionValue = '';

var superClassName = '';
var actionOn = '';

export default class SRNView extends Component <{}> {


    componentWillMount ()  {
      //*> Initialize bug RNSystangoBugReporter
      new CrashReporter()
      sqlMngrObj = new SQLiteManager()
    }


    _renderChildren() {
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
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (!isEqual(nextProps, this.props)) {
        return true;
      }
      return false;
    }

    _renderInnerText() {
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
    }

    render() {

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
        onPress: this._onPress.bind(this),
        onPressIn: this._onPressIn.bind(this),
        onPressOut: this._onPressOut.bind(this),
        onLongPress: this._onLongPress.bind(this),
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
    }

    _onPress() {

      if (this.props.onPress) {

        // if (Configuration.getIsReportCrash()) {
        //   actionValue = ''
        //   this.recursiveMethod(this.props.children)
        // }
        this.props.onPress()
      }
    }

    recursiveMethod(items) {

      var flag = false;
      React.Children.forEach(items, (item) => {

        if (typeof item === 'string' || typeof item === 'number') {
          if (item != ' ') {
              actionValue = item;
            }

        } else if (React.isValidElement(item)) { // Rendered Class name

          flag = true;
          var type = ''

          if (item._owner._currentElement._owner) {
            if (item._owner._currentElement._owner._currentElement) {
              if (item._owner._currentElement._owner._currentElement._owner) {

                if (item._owner._currentElement._owner._currentElement._owner._currentElement.type.name == 'Constructor') {
                  superClassName = item._owner._currentElement._owner._currentElement._owner._currentElement.type.displayName;
                } else if (item._owner._currentElement._owner._currentElement._owner._currentElement.type.name == 'e') {
                  superClassName = item._owner._currentElement._owner._currentElement._owner._currentElement.type.displayName;
                } else {
                  superClassName = item._owner._currentElement._owner._currentElement._owner._currentElement.type.name;
                }
              }
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

            actionValue = display;


          return this.recursiveMethod(item.props.children)

        }
      })

        var action = '';
        if (this.props.actionOn) {   //Action on
          action = this.props.actionOn;
        }

        if (!flag) {

          sqlMngrObj.addUserStep(
          {
            className: superClassName,
            methodName: actionValue,
            actionOn: action
          });
        }


    }

    _onPressIn() {

      if (this.props.onPressIn) {
        this.props.onPressIn()
      }
    }

    _onPressOut() {

      if (this.props.onPressOut) {
        this.props.onPressOut()
      }
    }

    _onLongPress() {

      if (this.props.onLongPress) {
        this.props.onLongPress()
      }
    }


  }

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

