//
//  RNSystangoBugReporter.h
//  RNSystangoBugReporter
//
//  Created by stplmacmini6 on 08/12/16.
//  Copyright © 2016 Systango. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface RNCrashReporter : NSObject<RCTBridgeModule>
{
    int deviceID;
    NSString *DBName;
}
+ (RNCrashReporter*)init;
@end
