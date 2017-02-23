package com.bugsnagprojectnew;

import android.app.Activity;
import android.content.Intent;
import android.content.res.Configuration;

import com.facebook.react.ReactActivity;
import com.systango.rncrashreportermodule.RNCrashReporterModule;
import com.systango.rncrashreportermodule.RNCrashReporterModule;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.github.yamill.orientation.OrientationPackage;
import com.react.rnspinkit.RNSpinkitPackage;

public class MainActivity extends ReactActivity {

    public static Activity activity;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        activity = this;


        return "BugsNagProjectNew";
    }

    public static Activity getActivity() {
        return activity;
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}
