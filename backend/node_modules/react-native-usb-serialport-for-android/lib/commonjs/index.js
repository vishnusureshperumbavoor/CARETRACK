"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Codes = void 0;
Object.defineProperty(exports, "Device", {
  enumerable: true,
  get: function () {
    return _native_module.Device;
  }
});
Object.defineProperty(exports, "EventData", {
  enumerable: true,
  get: function () {
    return _usb_serial.EventData;
  }
});
Object.defineProperty(exports, "Listener", {
  enumerable: true,
  get: function () {
    return _usb_serial.Listener;
  }
});
exports.Parity = void 0;
Object.defineProperty(exports, "UsbSerial", {
  enumerable: true,
  get: function () {
    return _usb_serial.default;
  }
});
exports.UsbSerialManager = void 0;

var _reactNative = require("react-native");

var _native_module = _interopRequireWildcard(require("./native_module"));

var _usb_serial = _interopRequireWildcard(require("./usb_serial"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  CODE_DEVICE_NOT_FOND,
  CODE_DRIVER_NOT_FOND,
  CODE_NOT_ENOUGH_PORTS,
  CODE_PERMISSION_DENIED,
  CODE_OPEN_FAILED,
  CODE_DEVICE_NOT_OPEN,
  CODE_SEND_FAILED,
  CODE_DEVICE_NOT_OPEN_OR_CLOSED
} = _reactNative.NativeModules.UsbSerialportForAndroid.getConstants();

const Codes = {
  DEVICE_NOT_FOND: CODE_DEVICE_NOT_FOND,
  DRIVER_NOT_FOND: CODE_DRIVER_NOT_FOND,
  NOT_ENOUGH_PORTS: CODE_NOT_ENOUGH_PORTS,
  PERMISSION_DENIED: CODE_PERMISSION_DENIED,
  OPEN_FAILED: CODE_OPEN_FAILED,
  DEVICE_NOT_OPEN: CODE_DEVICE_NOT_OPEN,
  SEND_FAILED: CODE_SEND_FAILED,
  DEVICE_NOT_OPEN_OR_CLOSED: CODE_DEVICE_NOT_OPEN_OR_CLOSED
};
exports.Codes = Codes;
const eventEmitter = new _reactNative.NativeEventEmitter(_reactNative.NativeModules.UsbSerialportForAndroid);
let Parity;
exports.Parity = Parity;

(function (Parity) {
  Parity[Parity["None"] = 0] = "None";
  Parity[Parity["Odd"] = 1] = "Odd";
  Parity[Parity["Even"] = 2] = "Even";
  Parity[Parity["Mark"] = 3] = "Mark";
  Parity[Parity["Space"] = 4] = "Space";
})(Parity || (exports.Parity = Parity = {}));

const defaultManager = {
  list() {
    return _native_module.default.list();
  },

  async tryRequestPermission(deviceId) {
    const result = await _native_module.default.tryRequestPermission(deviceId);
    return result === 1;
  },

  hasPermission(deviceId) {
    return _native_module.default.hasPermission(deviceId);
  },

  async open(deviceId, options) {
    await _native_module.default.open(deviceId, options.baudRate, options.dataBits, options.stopBits, options.parity);
    return new _usb_serial.default(deviceId, eventEmitter);
  }

};
const UsbSerialManager = _reactNative.Platform.OS === 'android' ? defaultManager : new Proxy({}, {
  get() {
    return () => {
      throw new Error(`Not support ${_reactNative.Platform.OS}`);
    };
  }

});
exports.UsbSerialManager = UsbSerialManager;
//# sourceMappingURL=index.js.map