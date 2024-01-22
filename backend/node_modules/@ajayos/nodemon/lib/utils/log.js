var colour = require('./colour');
var bus = require('./bus');
var colors = require('colors');
var required = false;
var useColours = true;

var coding = {
  log: 'green',
  info: 'yellow',
  status: 'green',
  detail: 'yellow',
  fail: 'red',
  error: 'red',
};
var codings = {
  log: 1,
  info: 2,
  status: 1,
  detail: 2,
  fail: 3,
  error: 3,
};

function log(type, text) {
  var st = type == 'log' ? `*`.green : type == 'info' ? `#`.yellow : type == 'status' ? `@`.green : type == 'detail' ? `$`.yellow : (type == 'fail' || type == 'error') ? `!`.red : `~`.magenta;
  var md = codings[type] == 1 ? `${text ? text : ' '}`.green : codings[type] == 2 ? `${text ? text : ' '}`.yellow : codings[type] == 3 ? `${text ? text : ' '}`.red : `${text ? text : ' '}`.magenta;
  var msg = `>`.cyan + ` [`.blue + st + `]`.blue + `> `.cyan + md;

  //if (useColours) {
  //  msg = colour(coding[type], msg);
  //}

  // always push the message through our bus, using nextTick
  // to help testing and get _out of_ promises.
  process.nextTick(() => {
    bus.emit('log', { type: type, message: text, colour: msg });
  });

  // but if we're running on the command line, also echo out
  // question: should we actually just consume our own events?
  if (!required) {
    if (type === 'error') {
      console.error(msg);
    } else {
      console.log(msg || `>-----------------------------<`.cyan);
    }
  }
}

var Logger = function (r) {
  if (!(this instanceof Logger)) {
    return new Logger(r);
  }
  this.required(r);
  return this;
};

Object.keys(coding).forEach(function (type) {
  Logger.prototype[type] = log.bind(null, type);
});

// detail is for messages that are turned on during debug
Logger.prototype.detail = function (msg) {
  if (this.debug) {
    log('detail', msg);
  }
};

Logger.prototype.required = function (val) {
  required = val;
};

Logger.prototype.debug = false;
Logger.prototype._log = function (type, msg) {
  if (required) {
    bus.emit('log', { type: type, message: msg || '', colour: msg || '' });
  } else if (type === 'error') {
    console.error(msg);
  } else {
    console.log(msg || '');
  }
};

Object.defineProperty(Logger.prototype, 'useColours', {
  set: function (val) {
    useColours = val;
  },
  get: function () {
    return useColours;
  },
});

module.exports = Logger;
