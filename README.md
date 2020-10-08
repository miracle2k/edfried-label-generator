Setup development environment
=============================

yarn

Start dev server:

* `yarn run start`
* `npm run android` (still has a bug starting the packager?)


Build for release
=================

APK: 

$ cd ./android && ./gradlew assembleRelease
$ adb install ./app/build/outputs/apk/release/app-release.apk


App Bundle:

$ cd ./android && ./gradlew bundleRelease
$ ls ./app/build/outputs/bundle/release/app.aab


Configuring Packager IP Address
===============================

When starting your project, you'll see something like this for your project URL:

```
exp://192.168.0.2:19000
```

The "manifest" at that URL tells the Expo app how to retrieve and load your app's JavaScript bundle, so even if you load it in the app via a URL like `exp://localhost:19000`, the Expo client app will still try to retrieve your app at the IP address that the start script provides.

In some cases, this is less than ideal. This might be the case if you need to run your project inside of a virtual machine and you have to access the packager via a different IP address than the one which prints by default. In order to override the IP address or hostname that is detected by Create React Native App, you can specify your own hostname via the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable:

Mac and Linux:

```
REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname' npm start
```

Windows:
```
set REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname'
npm start
```

The above example would cause the development server to listen on `exp://my-custom-ip-address-or-hostname:19000`.
