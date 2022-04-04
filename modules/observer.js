class Observer {
  constructor() {
    this.callback = {};
  }
  subscribe(eventName, callback, ...callbackArg) {
    this.callback[eventName] = callback(...callbackArg);
  }
  publish(eventName) {
    return this.callback[eventName];
  }
}

module.exports = new Observer();
