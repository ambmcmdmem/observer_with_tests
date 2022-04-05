const observer = require('./modules/observer');

observer.subscribe('output', () => 'test');
observer.subscribe('output2', (output) => output, 'test2');

test('Observer test.', () => {
  expect(observer.publish('output')).toBe('test');
  expect(observer.publish('output2')).toBe('test2');
});
