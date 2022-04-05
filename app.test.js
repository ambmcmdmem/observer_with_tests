const Observer = require('./modules/observer');
const observer = new Observer();
const testArray = [];

observer.subscribe('output', () => {
  testArray.push(1);
  testArray.push(2);
});

test('Observer test.', () => {
  observer.publish('output');
  expect(testArray).toEqual([1, 2]);
});
