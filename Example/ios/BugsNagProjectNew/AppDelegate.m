/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"
#import "RNSystangoBugReporter.h"


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    NSURL *jsCodeLocation;

    jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.74:8081/index.ios.bundle?platform=ios&dev=true"];
    //jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
    //*> Initialize native module shared instance
    RNSystangoBugReporter *rnSBR = [RNSystangoBugReporter init];
  
    //*> Create ReactNative bridge
    RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation moduleProvider:^NSArray<id<RCTBridgeModule>> *{
        rnSBR.delegate = rnSBR;
      
        //*> Initialize RCTExceptionsManager with custom Exception Delegate
        id<RCTExceptionsManagerDelegate> customDelegate = rnSBR.delegate;
        RCTExceptionsManager *obj = [[RCTExceptionsManager alloc] init];
    
        return @[[obj initWithDelegate:customDelegate]];
      
    } launchOptions:launchOptions];
  
                                              
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"BugsNagProjectNew" initialProperties:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
