export default class Observer {
  constructor() {
    this.callback = {};
    this.validationAndErrors = [
      {
        validation: ({ eventName }) => eventName !== undefined,
        error: new Error('イベント名が入力されていません。'),
      },
      {
        validation: ({ eventName }) => typeof eventName === 'string',
        error: new Error('イベント名の型は文字列としてください。'),
      },
      {
        validation: ({ callback }) => callback !== undefined,
        error: new Error('コールバック関数が入力されていません。'),
      },
      {
        validation: ({ callback }) => typeof callback === 'function',
        error: new Error('コールバック関数が関数ではありません。'),
      },
    ];
  }
  subscribe(eventName, callback) {
    const validationAndError = this.validationAndErrors.find(
      ({ validation }) => !validation({ eventName, callback })
    );

    if (validationAndError) throw validationAndError.error;

    this.callback[eventName] = this.callback[eventName]
      ? [...this.callback[eventName], callback]
      : [callback];
  }
  publish(eventName) {
    this.callback[eventName].forEach((callback) => callback());
  }
}
