class Observer {
  constructor() {
    this.callback = {};
  }
  subscribe(eventName, callback) {
    if (typeof eventName !== 'string')
      throw new Error('イベント名の型は文字列としてください。');
    else if (typeof callback !== 'function')
      throw new Error('コールバック関数が関数ではありません。');

    this.callback[eventName] = callback;
  }
  publish(eventName) {
    this.callback[eventName]();
  }
}

module.exports = Observer;
