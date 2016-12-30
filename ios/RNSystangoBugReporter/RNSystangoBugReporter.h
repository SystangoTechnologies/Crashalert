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

@interface RNSystangoBugReporter : NSObject<RCTBridgeModule, RCTExceptionsManagerDelegate>
{
    RCTResponseSenderBlock block;
}
+ (RNSystangoBugReporter*)init;
@property (nonatomic, strong) id<RCTExceptionsManagerDelegate> delegate;
@end
