"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

const LINKING_ERROR = `The package 'react-native-usb-serialport-for-android' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo managed workflow\n';
const UsbSerialportForAndroid = _reactNative.NativeModules.UsbSerialportForAndroid ? _reactNative.NativeModules.UsbSerialportForAndroid : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }

});
var _default = UsbSerialportForAndroid;
exports.default = _default;
//# sourceMappingURL=native_module.js.map