class Observer {
  constructor() {
    this.callback = {};
  }
  subscribe(eventName, callback) {
    const validityAndErrors = [
      {
        validity: typeof eventName === 'undefined',
        error: new Error('イベント名が入力されていません。'),
      },
      {
        validity: typeof eventName !== 'string',
        error: new Error('イベント名の型は文字列としてください。'),
      },
      {
        validity: typeof callback === 'undefined',
        error: new Error('コールバック関数が入力されていません。'),
      },
      {
        validity: typeof callback !== 'function',
        error: new Error('コールバック関数が関数ではありません。'),
      },
    ];

    if (validityAndErrors.some((validityAndError) => validityAndError.validity))
      throw validityAndErrors.find(
        (validityAndError) => validityAndError.validity
      ).error;

    this.callback[eventName] = callback;
  }
  publish(eventName) {
    this.callback[eventName]();
  }
}

module.exports = Observer;
