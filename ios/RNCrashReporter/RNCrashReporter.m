//
//  RNSystangoBugReporter.m
//  RNSystangoBugReporter
//
//  Created by stplmacmini6 on 08/12/16.
//  Copyright © 2016 Systango. All rights reserved.
//

#import "RNCrashReporter.h"
//#import "SQLite/SQLite.h"
//#import <SQLite/SQLiteResult.h>

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
    
}

- (void)handleFatalJSExceptionWithMessage:(NSString *)message stack:(NSArray *)stack exceptionId:(NSNumber *)exceptionId{
       
}


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setDBAndDeviceID:(NSString *)dbName deviceId:(NSString *)deviceId)
{
    [RNCrashReporter init]->deviceID = [deviceId intValue];
    [RNCrashReporter init]->DBName = dbName;
}



@end
