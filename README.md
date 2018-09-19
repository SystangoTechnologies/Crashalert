# rn-crash-reporter

## What is RN Crash Reporter?

RN crash reporter is a software application whose function is to identify report crash details and to alert when there are runtime crashes, in production or on development / testing environments. Crash reports often include data such as user steps, stack traces, type of crash, trends and version of application.

A reporter that stores user actions step and runtime crashes info. You no longer need to change existing code, you just need to import our components in your js classes rather than `react-native`.

### Following are some components which can be used from our library:
- Button
- TouchableOpacity
- TouchableHeighlight
- TouchableWithoutFeedback
- TouchableNativeFeedback
- SRNViewTouchableHeighlight
- SRNView

Version 2.0.0 supports react-native >= 0.52.0

## Add it to your project

### Installation

Install Systango bug reporter by running the following command from within your app's root directory:
- $  `yarn rn-crash-reporter`


### You should follow Node server and Web client installation to track the crashes  [here](https://github.com/sytango-technologies/rn-crash-viewer)

### NOTE: Please follow the [link here](FLOW_README.md) for the complete implementation of `rn-crash-viewer`.

## Basic usage

First of all, you'll need to add following code in your `app.js` or any top hierarchy component in `counstructor` or  `componentWillMount()` method. This is required configuration for crash reporter.

```javascript

import { CrashReporter } from 'rn-crash-reporter'

CrashReporter.setConfiguration({
    hostURL: 'http://localhost:8000', // Replace this URL with your Server base url, in my case I have setup the node server on my machine itself using docker container
    enableReporter: true  // pass false here if you don't want to enable reporting the crashes
});

```

### Sample

The following code you can use something like this:

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

### With new version of react native you can use button component as follows without any changes in the existing code.

```javascript
<Button title="LOG IN" style={styles.button} onPress={()=> this.pressLogin()} classRef={this.constructor.name}/>
```
NOTE : Following are some additional props which might be used to pass manual information associated with the component otherwise the `default` information of the component will get passed.

## Additional props

- classRef : To get the current reference of class on which the components are wrapped.
- searchText : To get the searched text on the `TextInput` component.(NOTE : While using `TextInput` component, you need to pass the `text` value in this field)
- actionOn : To associate extra information related to the component used.
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

### Similarly, you can use the following components :-
- TouchableOpacity
- TouchableNativeFeedback
- TouchableHighlight


## License

License is MIT
