package com.systango.rncrashreportermodule;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.util.Log;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.Nullable;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.ReactConstants;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class RNCrashReporter extends ReactContextBaseJavaModule {

    Activity currentActivity;

    public RNCrashReporter(ReactApplicationContext reactContext, Activity activity) {
        super(reactContext);
        currentActivity = activity;
    }

    @Override
    public String getName() {
        return "RNCrashReporter";
    }


    @ReactMethod
    public void setExceptionHandler(final Callback success) {
    }

    @ReactMethod
    public void reload() {
        Activity activity = getCurrentActivityInstance();
        Intent intent = activity.getIntent();
        activity.finish();
        activity.startActivity(intent);
    }


    public Activity getCurrentActivityInstance() {
        return currentActivity;
    }
}
