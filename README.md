# rn-crash-reporter


As a mobile app developer, you’ve likely faced your own unique challenges in detecting, reproducing and debugging run-time crashes in React Native applications. Of course we need a crash analyzer tool that can track these crashes.

## What is rn-crash-reporter?

This is a reporter that stores user action steps and runtime crashes info that you can analyze on [Crash Viewer](https://github.com/sytango-technologies/rn-crash-viewer) with a detailed specification of the tracked crashes.  You no longer need to change existing code, you just need to import `rn-crash-reporter` components in your js classes rather than `react-native`.


### Version Supports

Version 2.0.0 supports react-native >= 0.52.0


### Installation

`$ yarn rn-crash-reporter` or `npm install --save react-native-node`


## To analyze your app crashes, you should follow Node server and Web client installation [here](https://github.com/sytango-technologies/rn-crash-viewer)

### NOTE: Please follow the [link here](FLOW_README.md) for the complete installation guide of `rn-crash-viewer`.


## Example:

The example app `RNCrashExamples` demonstrated the use of our crash reporter library. It is also having some additional features i.e. [`Eslint`](https://www.themarketingtechnologist.co/eslint-with-airbnb-javascript-style-guide-in-webstorm/), [`Code-Push`](https://github.com/Microsoft/react-native-code-push), [`React-Navigation`](https://reactnavigation.org/) and [`Redux`](https://redux.js.org/) are integrated. 


### The components which can be used:
- Button
- TouchableOpacity
- TouchableHeighlight
- TouchableWithoutFeedback
- TouchableNativeFeedback

## Basic usage

First of all, you'll need to add following code in your `app.js` or any top hierarchy component in `constructor` or  `componentWillMount()` method. This is required configuration for crash reporter.

```javascript

import { CrashReporter } from 'rn-crash-reporter'

CrashReporter.setConfiguration({
hostURL: 'http://localhost:8000', // Replace this URL with your Server base url, in my case I have setup the node server on my machine itself using docker container
enableReporter: true  // pass false here if you don't want to enable reporting the crashes
});

```

### Sample

You can simply try the following sample code :

```javascript

// Import the component 'rn-crash-reporter' module
import {Button} from 'rn-crash-reporter';

// Within your render function
<Button style={styles.button} onPress={()=> this.pressLogin()} classRef={this.constructor.name}>
LOG IN
</Button>

// Adding your styles...
var styles = StyleSheet.create({
button: {
height:35,
backgroundColor: '#F57B20',
alignSelf:'center',
marginTop:10,
width:100
}

});
```
NOTE : Following are some additional props which might be used to pass manual information associated with the component otherwise the `default` information of the component will get passed.

## Additional props

- classRef : To get the current reference of class on which the components are wrapped.
- searchText : To get the searched text on the `TextInput` component.(NOTE : While using `TextInput` component, you need to pass the `text` value in this field)
- actionOn : To associate extra information related to the component used.


## License

MIT
