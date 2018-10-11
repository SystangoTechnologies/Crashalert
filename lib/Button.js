/**
 * Powered by Systango
 * http://www.systango.com
 */

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import isEqual from 'lodash/isEqual';
var Configuration = require('./Configuration')
var SQLiteManager = require('./SQLiteManager').default

export default class Button extends Component {

  constructor(props){
    super(props)
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
              this.actionOn = level2Item.type.displayName?`${level2Item.type.displayName}_Button` : 'Button'
            }
          })
        } else{
          this.actionOn = item.type.displayName?`${item.type.displayName}_Button` : 'Button'
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
    if (Button.isAndroid) {
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



    } else {

      if (this.props.title) {
        this.actionOn = this.props.title;

        return (
          <TouchableOpacity {...touchableProps}
            style={[styles.button, this.props.style]}>
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
            style={[styles.button, this.props.style]}>
            {this._renderInnerText()}
          </TouchableOpacity>
        );
      }


    }
  }


  _onPress() {
    if (this.props.onPress) {

      if (Configuration.getIsReportCrash()) {

        if(this.props.className) {
          this.className = this.props.className
        } else {
          //*> store device id and db name into native code
          this.className = 'View'
          if(__DEV__ && (this._reactInternalFiber.return.return.return.return.return.return.return.type && this._reactInternalFiber.return.return.return.return.return.return.return.type.hasOwnProperty('displayName')))
            this.className = this._reactInternalFiber.return.return.return.return.return.return.return.type.displayName;
          else if(!__DEV__)
            this.className = this._reactInternalFiber.return.return.return.stateNode.props.navigation.state.routeName;
        }
       

        this.sqlMngrObj.addUserStep(
          {
            className: this.className,
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

    if ( this.props.onPressOut) {
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

