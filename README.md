# Crashalert


As a mobile app developer, you’ve likely faced your own unique challenges in detecting, reproducing and debugging run-time crashes in React Native applications. Of course we need a crash analyzer tool that can track these crashes.

## What is Crashalert?

This is a reporter that stores user action steps and runtime crashes info that you can analyze on [Crashlyzer](https://github.com/SystangoTechnologies/Crashlyzer) with a detailed specification of the tracked crashes.  You no longer need to change existing code, you just need to import `react-native-crashalert` components in your js classes rather than `react-native`.


### Supported Versions 

Version 3.0.2 supports react-native >= 0.52.0

### Platforms

`Crashalert` supports both the platforms `android` and `iOS`.

### Installation

`$ yarn react-native-crashalert` or `npm install --save react-native-crashalert`

## Demo
<a href="https://github.com/SystangoTechnologies/Crashalert/blob/master/Crashalert.gif"><img src="https://github.com/SystangoTechnologies/Crashalert/blob/master/Crashalert.gif"></a>

## How to analyze the crashes?

To analyze your app crashes, you should follow Node server and Web client installation [here](https://github.com/SystangoTechnologies/Crashlyzer)

**NOTE:** Please follow the [link here](FLOW_README.md) for the complete installation guide of `Crashlyzer`.

## Basic usage

First of all, you'll need to add following code in your `app.js` or any top hierarchy component in `constructor` or  `componentWillMount()` method. This is required configuration for crash reporter.

```javascript

import { CrashReporter } from 'react-native-crashalert'

CrashReporter.setConfiguration({
hostURL: 'http://localhost:8000', // Replace this URL with your Server base url, in my case I have setup the node server on my machine itself using docker container
enableReporter: true  // pass false here if you don't want to enable reporting the crashes
});

```

**NOTE:** In case `localhost` url is not working in any platform `android/iOS` then you need to replace the value of  `hostURL` to your machine's **local IP Address** in `setConfiguration` method.  


### Sample

You can simply try the following sample code :

```javascript

// Import the component 'react-native-crashalert' module
import {Button} from 'react-native-crashalert';

// Within your render function
<Button style={styles.button} onPress={()=> this.pressLogin()}>
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

**NOTE :** Following are some additional props which might be used to pass manual information associated with the component otherwise the `default` information of the component will get passed.

## Example:

The example app `RNCrashExamples` demonstrated the use of our crash reporter library. It is also having some additional features i.e. [`Eslint`](https://www.themarketingtechnologist.co/eslint-with-airbnb-javascript-style-guide-in-webstorm/), [`Code-Push`](https://github.com/Microsoft/react-native-code-push), [`React-Navigation`](https://reactnavigation.org/) and [`Redux`](https://redux.js.org/) are integrated. You need to add your code-push keys for android and iOS in their respective mapping files, you can follow the inline link of code-push for more details. The code-push is optional in the example app for debug mode.


### The components which can be used:
- Button
- TouchableOpacity
- TouchableHeighlight
- TouchableWithoutFeedback
- TouchableNativeFeedback

## Additional props

- searchText : To get the searched text on the `TextInput` component.(NOTE : While using `TextInput` component, you need to pass the `text` value in this field)
- actionOn : To associate extra information related to the component used.
- textStyle: To give a custom style of Text


### Troubleshoot

If you experience the following issue in **android** while building the example app:

`ENOENT: no such file or directory, open '/Users/macmini33/Desktop/demo/RNCrashExamples/android/app/build/intermediates/assets/debug/CodePushHash'`

**Fix:** You need to create two (assets and debug) folders to the following path:

`rootDir -> android -> app -> build -> intermediates -> assets -> debug`

## License

MIT

## Contributors
[Arpit Khandelwal](https://www.linkedin.com/in/arpitkhandelwal1984/), [Akhilesh Mourya](https://www.linkedin.com/in/akhilesh-mourya-54705232/), [Rituraj Mandloi](https://www.linkedin.com/in/rituraj-mandloi-57b97a171/)
