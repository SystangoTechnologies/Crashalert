//
//  RNSystangoBugReporter.h
//  RNSystangoBugReporter
//
//  Created by stplmacmini6 on 08/12/16.
//  Copyright © 2016 Systango. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"
#import "RCTExceptionsManager.h"

@interface RNCrashReporter : NSObject<RCTBridgeModule, RCTExceptionsManagerDelegate>
{
    RCTResponseSenderBlock block;
}
+ (RNCrashReporter*)init;
@property (nonatomic, strong) id<RCTExceptionsManagerDelegate> delegate;
@end
