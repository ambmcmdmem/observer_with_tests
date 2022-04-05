class Observer {
  constructor() {
    this.callback = {};
  }
  subscribe(eventName, callback) {
    this.callback[eventName] = callback;
  }
  publish(eventName) {
    this.callback[eventName]();
  }
}

module.exports = Observer;
