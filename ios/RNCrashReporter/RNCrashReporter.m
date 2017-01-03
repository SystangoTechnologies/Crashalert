//
//  RNSystangoBugReporter.m
//  RNSystangoBugReporter
//
//  Created by stplmacmini6 on 08/12/16.
//  Copyright © 2016 Systango. All rights reserved.
//

#import "RNCrashReporter.h"

@implementation RNCrashReporter

+ (RNCrashReporter*)init
{
    static RNCrashReporter *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [[RNCrashReporter alloc] init];
    });
    return sharedInstance;
}

- (void)handleSoftJSExceptionWithMessage:(NSString *)message stack:(NSArray *)stack exceptionId:(NSNumber *)exceptionId{
    if([RNCrashReporter init]->block){
        [RNCrashReporter init]->block(@[message, stack]);
    }
}

- (void)handleFatalJSExceptionWithMessage:(NSString *)message stack:(NSArray *)stack exceptionId:(NSNumber *)exceptionId{
    if([RNCrashReporter init]->block){
        [RNCrashReporter init]->block(@[message, stack]);
    }
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setExceptionHandler:(RCTResponseSenderBlock)callback)
{
    [RNCrashReporter init]->block = callback;
}

@end
