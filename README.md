# rn-crash-reporter

## What is RN Crash Reporter?

RN crash reporter is a software application whose function is to identify report crash details and to alert when there are runtime crashes, in production or on development / testing environments. Crash reports often include data such as stack traces, type of crash, trends and version of application.

A reporter that stores user actions step and runtime crashes info. You no longer need to change existing code, you just need to import our components in your js classes. 

Version 1.0.7 supports react-native >= 0.18.0

Please follow the [link here](FLOW_README.md) for the complete implementation of `rn-crash-reporter`.

## Add it to your project

### Installation

Install Systango bug reporter by running the following command from within your app's root directory:
- Run `npm install rn-crash-reporter --save`

### Link libraries

You can try linking the project automatically for react-native version >= 0.29 by running the following command:
- Run `$ react-native link`

for react-native version < 0.29, please try the following command:
- Run `$ rnpm link`

or:

## Manual Installation Notes

###  iOS Configuration 

Once you've acquired the `rn-crash-reporter`, you need to integrate it into the Xcode project of your React Native app and configure it correctly. To do this, take the following steps:
1. Open your project in XCode, right click on `Libraries` and click `Add
Files to "Your Project Name"`  Look under ` node_modules/rn-crash-reporter/iOS`  and select  `RNSystangoBugReporter.xcodeproj`.  [(Screenshot)]().
2. Select the project node in Xcode and select the "Build Phases" tab of your project configuration. Drag `libRNSystangoBugReporter.a` from `Libraries/RNSystangoBugReporter.xcodeproj/Products` into the "Link Binary With Libraries" section of your project's "Build Phases" configuration. [(Screenshot)]().
3. Click on `RNSystangoBugReporter.xcodeproj` in `Libraries` and go the `Build
Settings` tab. Double click the text to the right of `Header Search Paths` and verify that it has `$(SRCROOT)/../react-native/React` - if it isn't, then add it. This is so XCode is able to find the headers that the `RNSystangoBugReporter` source files are referring to by pointing to the header files installed within the `react-native` `node_modules` directory. [(Screenshot)]().


### Android Configuration 

1. EDIT  `android/settings.gradle`
```java
...
// ADD the following lines
include ':rn-crash-reporter'
project(':rn-crash-reporter').projectDir = new File(rootProject.projectDir, '../node_modules/rn-crash-reporter/android')
```

2. EDIT  `android/app/build.gradle` ADD :
```java
dependencies {
...
// ADD the following in dependencies section
compile project(':rn-crash-reporter')
}
```

3. Make sure in `MainApplication.java` you have the following code : 
Source :  `android/src/main/java/com/{YOUR_APP_NAME}/MainActivity.java` for react-native < 0.29,
OR
Source :  `android/src/main/java/com/{YOUR_APP_NAME}/MainApplication.java` for react-native >= 0.29 ADD:

```java
//...
import com.systango.rncrashreportermodule.RNCrashReporterModule; <---- This!
//...
@Override
protected List<ReactPackage> getPackages() {
return Arrays.<ReactPackage>asList(
new MainReactPackage(),
new RNCrashReporterModule(this) // <---- and This!
);
}
```
For react-native >= 0.29 , then you should create the static instance of Activity in MainActivity class like:

```java

public class MainActivity extends ReactActivity {

public static Activity activity; // <----  This!

/**
* Returns the name of the main component registered from JavaScript.
* This is used to schedule rendering of the component.
*/
@Override
protected String getMainComponentName() {
activity = this;      // <---- and This!
return "Your_project_name";
}

public static Activity getActivity() {  // <---- and This!
return activity;
}
}

and in your MainApplication class you should change like:

//...
@Override
protected List<ReactPackage> getPackages() {
return Arrays.<ReactPackage>asList(
new MainReactPackage(),
new RNCrashReporterModule(MainActivity.getActivity()) // <---- This!
);
```

You should follow Node server and Web client installation for rn-crash-reporter [here](https://github.com/sytango-technologies/rn-crash-viewer)

## Basic usage

First you'll need to add following lines of code in your `index.ios.js` and `index.android.js` in `componentWillMount()` method your component class. This is required configuration for crash reporter and If you are using Redux then you can add this configuration on any initial component class.


```javascript

// Import the CrashReporter,Configuration 'rn-crash-reporter' module
import { CrashReporter, Configuration } from 'rn-crash-reporter'; //  <------- This

//*> Configure Crash Reporter                   // <---- This!
Configuration.setHostURL('Your server url or Local server url');
Configuration.setIsReportCrash(true)     // <---- setting true will report users actions and steps on host
new CrashReporter()

```

### Sample

The following code you can use something like this:

```javascript

// Import the component 'rn-crash-reporter' module
import {Button} from 'rn-crash-reporter';

// Within your render function
<Button style={styles.button} onPress={ ()=> this.pressLogin()}>
LOG IN
</Button>

// Adding your styles...
var styles = StyleSheet.create({
btn: {
height:35,
backgroundColor: '#F57B20',
alignSelf:'center',
marginTop:10,
width:100
}

});
```

### With new version of react native you can use button component as follows without any changes in the existing code.

```javascript
<Button title="LOG IN" style={styles.button} onPress={ ()=> this.pressLogin()} />
```

## Additional props

```javascript
// Passing the additional props
<Button style={styles.button} onPress={ ()=> this.pressLogin()} isBorder={false}>
LOG IN
</Button>
```

## Additional component

You can also use the `SRNView` component to capture `onPress` event on your custom cell of `ListView` component like following code:

```javascript

// Import the SRNView 'rn-crash-reporter' module
import {SRNView} from 'rn-crash-reporter';


// Within your render function
<ListView
dataSource = {this.state.dataSource}
renderRow = {this.renderRow.bind(this)}
enableEmptySections={true}>
</ListView>

// Within your component with renderRow function

renderRow(rowData:any, sectionID: number, rowID: number){

return (
<SRNView style={styles.ListViewBG} onPress={()=> this.pressRowItem(rowData, sectionID, rowID)}  actionOn={rowData.anyKey}>
<Your_CustomCell  data={rowData}/>
</SRNView>
)
}
```

Here on the above code `actionOn` props are not required, you can pass this props to associate extra info about your cell.

### Similarly, you can use the following components :-
- TouchableOpacity
- TouchableNativeFeedback
- TouchableHighlight


## License

License is MIT
