# rn-crash-reporter

A reporter that stores users actions steps and runtime crashes info. You no longer need to change existing code, you just need to import our components in your js classes.

Version 1.0.0 supports react-native >= 0.18.0

## Add it to your project


install Systango bug reporter as described below:

- Run `npm install rn-crash-reporter --save`


You can try linking the project automatically for react-native >= 0.29:

- Run `$ react-native link`

for react-native < 0.29:

- Run `$ rnpm link`

or:

## Manually on iOS

1. Open your project in XCode, right click on `Libraries` and click `Add
   Files to "Your Project Name"` Look under `node_modules/rn-crash-reporter/iOS` and add `RNSystangoBugReporter.xcodeproj`.  [(Screenshot)]().
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
`import {Button} from 'rn-crash-reporter';`



## Manually on Android

1. in `android/settings.gradle`
   ```java
   ...
   include ':rn-crash-reporter'
   project(':rn-crash-reporter').projectDir = new File(rootProject.projectDir, '../node_modules/rn-crash-reporter/android')
   ```

2. in `android/app/build.gradle` add:
   ```java
   dependencies {
       ...
       compile project(':rn-crash-reporter')
   }
   ```

3. and finally, in `android/src/main/java/com/{YOUR_APP_NAME}/MainActivity.java` for react-native < 0.29,
   or `android/src/main/java/com/{YOUR_APP_NAME}/MainApplication.java` for react-native >= 0.29 add:
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
 if you are using react-native >= 0.29 then you should create the static instance of Activity in MainActivity class like:

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

    //...

    ```
## In the iOS, add the following code in AppDelegate didFinishLaunchingWithOptions method

```objectivec

    #import "RNCrashReporter.h" // <---- This!

    NSURL *jsCodeLocation;

    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios&dev=true"];
    //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

    //*> Initialize native module shared instance
    RNCrashReporter *rnSBR = [RNCrashReporter init];

    //*> Create ReactNative bridge
    RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation moduleProvider:^NSArray<id<RCTBridgeModule>> *{
    rnSBR.delegate = rnSBR;

    //*> Initialize RCTExceptionsManager with custom Exception Delegate
    id<RCTExceptionsManagerDelegate> customDelegate = rnSBR.delegate;
    RCTExceptionsManager *obj = [[RCTExceptionsManager alloc] init];

    return @[[obj initWithDelegate:customDelegate]];

    } launchOptions:launchOptions];


    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"YourProjectName" initialProperties:nil];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];

```

## Examples

The following code you should include in your index.ios.js and index.android.js in componentWillMount() method. This is required configuration for bug reporter. If you are using Redux then you can add this configuration on any initial component class.

```javascript

    import {Configuration, BugReporter} from 'rn-crash-reporter'

    //*> Configure BugReporter
    Configuration.setIsReportCrash(true)     // <---- setting true will report users actions and steps
    Configuration.setIsSendOnRemote(false)   // <---- setting false will store information on local you can see the example project 
 ```

##Note: In this version we did not provide support to report crash and user actions on remote. It would come soon.

### Sample

The following code you can use something like this:


```javascript

    import {Button} from 'rn-crash-reporter';

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
### With new version of react native you can use button like this without any existing code changes
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
here actionOn props not required, you can pass this props to associate extra info about your cell. Also you can use the following component TouchableOpacity, TouchableNativeFeedback and TouchableHighlight


## License

License is MIT
