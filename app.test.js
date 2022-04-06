const Observer = require('./modules/observer');
const toBeTested = new Observer();
const forConfirmationOfInteraction = new Observer();

const callbackInvocationToken = [];
toBeTested.subscribe('push', () => {
  callbackInvocationToken.push(1);
  callbackInvocationToken.push('test');
});
forConfirmationOfInteraction.subscribe('push', () => {
  callbackInvocationToken.push(100);
});

test('Observer test.', () => {
  toBeTested.publish('push');
  expect(callbackInvocationToken).toStrictEqual([1, 'test']);
  forConfirmationOfInteraction.publish('push');
  expect(callbackInvocationToken).toStrictEqual([1, 'test', 100]);

  expect(() => {
    toBeTested.subscribe();
  }).toThrow(new Error('イベント名の型は文字列としてください。'));
  expect(() => {
    toBeTested.subscribe(1000);
  }).toThrow(new Error('イベント名の型は文字列としてください。'));
  expect(() => {
    toBeTested.subscribe('emptyCallbackArgument');
  }).toThrow(new Error('コールバック関数が関数ではありません。'));
  expect(() => {
    toBeTested.subscribe('illegalCallbackArgument', 0);
  }).toThrow(new Error('コールバック関数が関数ではありません。'));
  expect(() => {
    toBeTested.publish();
  }).toThrow(new TypeError('this.callback[eventName] is not a function'));
  expect(() => {
    toBeTested.publish('eventUnregistered');
  }).toThrow(new TypeError('this.callback[eventName] is not a function'));
});
