/**
 * Powered by Systango
 * http://www.systango.com
 */

'use strict';

import React, {Component} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native';
import isEqual from 'lodash/isEqual';
var SQLiteManager = require('./SQLiteManager').default
var Configuration = require('./Configuration')

export default class RNTouchableWithoutFeedback extends Component {

  componentWillMount()  {
    //*> Sqlite manager declaration
    this.sqlMngrObj = new SQLiteManager()
  }

 

  _renderChildren() {
    let childElements = [];
    React.Children.forEach(this.props.children, (item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        this.actionOn = item;
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
        if (item.type.displayName === 'Text') {
          React.Children.forEach(item.props.children, (level2Item) => {
            if (typeof level2Item === 'string' || typeof level2Item === 'number') {
              this.actionOn = level2Item
            } else{
              this.actionOn = `${level2Item.type.displayName}_Button`
            }
          })
        } else{
          this.actionOn = `${item.type.displayName}_Button`
        }

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

    if (RNTouchableWithoutFeedback.isAndroid) {
      touchableProps = Object.assign(touchableProps, {
        background: this.props.background || TouchableNativeFeedback.SelectableBackground()
      });


      if (this.props.title) {
        this.actionOn = this.props.title;

        return (
          <TouchableNativeFeedback {...touchableProps}
            style={[styles.button, this.props.style]}>
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
            <View style={[styles.button, this.props.style]}>
              {this._renderInnerText()}
            </View>
          </TouchableNativeFeedback>
        )
      }

    }else {
    
      if (this.props.title) {
        this.actionOn = this.props.title;

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
    }
  }

  _onPress() {
    if (this.props.onPress) {

      if (Configuration.getIsReportCrash()) {
        //*> store device id and db name into native code
        let className = ''
        if(__DEV__)
          className = this._reactInternalFiber.return.return.return.return.return.return.return.type.displayName;
        else
          className = this._reactInternalFiber.return.return.return.stateNode.props.navigation.state.routeName;

        this.sqlMngrObj.addUserStep(
          {
            className: className,
            methodName: this.constructor.name,
            actionOn: this.actionOn,
            searchText: this.props.searchText
          });
      }
      this.props.onPress()
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

