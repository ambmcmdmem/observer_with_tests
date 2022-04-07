import Observer from './modules/observer';

const toBeTested = new Observer();
const forConfirmationOfInteraction = new Observer();

const callbackInvocationToken = [];
toBeTested.subscribe('push', () => {
  callbackInvocationToken.push(1);
  callbackInvocationToken.push('first push');
});
toBeTested.subscribe('push', () => {
  callbackInvocationToken.push(1000);
  callbackInvocationToken.push('second push');
});
forConfirmationOfInteraction.subscribe('push', () => {
  callbackInvocationToken.push(100);
});

test('Observer test.', () => {
  toBeTested.publish('push');
  expect(callbackInvocationToken).toStrictEqual([
    1,
    'first push',
    1000,
    'second push',
  ]);
  forConfirmationOfInteraction.publish('push');
  expect(callbackInvocationToken).toStrictEqual([
    1,
    'first push',
    1000,
    'second push',
    100,
  ]);

  expect(() => {
    toBeTested.subscribe();
  }).toThrow(new Error('イベント名が入力されていません。'));
  expect(() => {
    toBeTested.subscribe(1000);
  }).toThrow(new Error('イベント名の型は文字列としてください。'));
  expect(() => {
    toBeTested.subscribe('emptyCallbackArgument');
  }).toThrow(new Error('コールバック関数が入力されていません。'));
  expect(() => {
    toBeTested.subscribe('illegalCallbackArgument', 0);
  }).toThrow(new Error('コールバック関数が関数ではありません。'));
  expect(() => {
    toBeTested.publish();
  }).toThrow(
    new TypeError("Cannot read properties of undefined (reading 'forEach')")
  );
  expect(() => {
    toBeTested.publish('eventUnregistered');
  }).toThrow(
    new TypeError("Cannot read properties of undefined (reading 'forEach')")
  );
});
