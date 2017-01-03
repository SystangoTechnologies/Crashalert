# systango-bug-reporter

A reporter that stores users actions steps and runtime crashes info. You no longer need to change existing code, you just need to import our components in your js classes.

Version 1.0.0 supports react-native >= 0.18.0

## Add it to your project


install Systango bug reporter as described below:

- Run `npm install systango-bug-reporter --save`


You can try linking the project automatically for react-native >= 0.29:

- Run `$ react-native link`

for react-native < 0.29:

- Run `$ rnpm link`

or:

## Manually on iOS

1. Open your project in XCode, right click on `Libraries` and click `Add
   Files to "Your Project Name"` Look under `node_modules/systango-bug-reporter/iOS` and add `RNSystangoBugReporter.xcodeproj`.  [(Screenshot)]().
2. Add `libRNSystangoBugReporter.a` to `Build Phases -> Link Binary With Libraries`
   [(Screenshot)]().
3. Click on `RNSystangoBugReporter.xcodeproj` in `Libraries` and go the `Build
   Settings` tab. Double click the text to the right of `Header Search
   Paths` and verify that it has `$(SRCROOT)/../react-native/React` - if it
   isn't, then add it. This is so XCode is able to find the headers that
   the `RNSystangoBugReporter` source files are referring to by pointing to the
   header files installed within the `react-native` `node_modules`
   directory. [(Screenshot)]().`

Then:


- Whenever you want to use it within React code now you can:
`import {Button} from 'systango-bug-reporter';`



## Manually on Android

1. in `android/settings.gradle`
   ```java
   ...
   include ':systango-bug-reporter'
   project(':systango-bug-reporter').projectDir = new File(rootProject.projectDir, '../node_modules/systango-bug-reporter/android')
   ```

2. in `android/app/build.gradle` add:
   ```java
   dependencies {
       ...
       compile project(':systango-bug-reporter')
   }
   ```

3. and finally, in `android/src/main/java/com/{YOUR_APP_NAME}/MainActivity.java` for react-native < 0.29,
   or `android/src/main/java/com/{YOUR_APP_NAME}/MainApplication.java` for react-native >= 0.29 add:
   ```java
   //...
   import com.example.rnsystangobugreportermanager.RNSystangoBugReporterManager; // <--- This!
   //...
   @Override
   protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
       new MainReactPackage(),
       new RNSystangoBugReporterManager(this) // <---- and This!
     );
}
   ```
 if you are using react-native >= 0.29 then you should create the static instance of Activity in MainActivity class like:

    ```java
    public class MainActivity extends ReactActivity {

    public static Activity activity; <---- and This!

        /**
        * Returns the name of the main component registered from JavaScript.
        * This is used to schedule rendering of the component.
        */
        @Override
        protected String getMainComponentName() {
        activity = this;      <---- and This!
        return "Your_project_name";
    }

    public static Activity getActivity() {  <---- and This!
        return activity;
    }
  }

    and in your MainApplication class you should change like:

    //...
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNSystangoBugReporterManager(MainActivity.getActivity()) // <---- and This!
    );

    //...

    ```

## Examples

The following code you should include in your index.ios.js and index.android.js in componentWillMount() method. This is required configuration for bug reporter. If you are using Redux then you can add this configuration on any initial component class.

```javascript

    import {Configuration, BugReporter} from 'systango-bug-reporter'

    //*> Configure BugReporter
    new BugReporter()
    Configuration.setIsReportCrash(true)     // <---- setting true will report users actions and steps
    Configuration.setIsSendOnRemote(false)   // <---- setting false will store information on local you can see the example project 
 ```

##Note: In this version we did not provide support to report crash and user actions on remote. It would come soon.

## Sample

The following code you can use something like this:


```javascript

    import {Button} from 'systango-bug-reporter';

    // Within your render function
    <Button style={styles.button} onPress={ ()=> this.pressLogin()}>
        LOG IN
    </Button>

    // Later on in your styles..
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
## With new version of react native you can use button like this without any existing code changes
```javascript
    <Button title="LOG IN" style={styles.button} onPress={ ()=> this.pressLogin()} />
```

## Additional props

```javascript
    <Button style={styles.button} onPress={ ()=> this.pressLogin()} isBorder={false}>
        LOG IN
    </Button>
```


## Additional component

You can also use the SRNView component to capture onPress event on your custom cell of ListView like following code:

```javascript

    import {SRNView} from 'systango-bug-reporter';


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
here actionOn props not required, you can pass this props to associate extra info about your cell. Also you can use the following component TouchableOpacity, TouchableNativeFeedback and TouchableHighlight


## License

License is MIT
