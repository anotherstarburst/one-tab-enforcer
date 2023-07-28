import oneTabEnforcer from '../src/index';
import MockBroadcastChannel from './mockBroadcastChannel';

describe('oneTabEnforcer', () => {
  let functionToRun;
  let options;

  beforeAll(() => {
    global.BroadcastChannel = MockBroadcastChannel as any;
  });

  beforeEach(() => {
    functionToRun = jest.fn();
    options = {
      appID: 'some-unique-name',
      timeout: 10,
      warningQuerySelector: '',
      warningMarkup: '',
    };
    jest.clearAllMocks();
  });

  afterEach(() => {
    MockBroadcastChannel.closeAll(); // close all channels after each test
  });

  test('should run function if no duplicate tabs are found', () => {
    jest.useFakeTimers();
    oneTabEnforcer(options, functionToRun);
    jest.advanceTimersByTime(10);
    expect(functionToRun).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('should not run function if duplicate tabs are found', () => {
    jest.useFakeTimers();
    oneTabEnforcer(options, functionToRun);
    setTimeout(() => oneTabEnforcer(options, functionToRun), 5);
    jest.advanceTimersByTime(10);
    expect(functionToRun).toHaveBeenCalledTimes(1); // only one tab runs the function
    jest.useRealTimers();
  });

  test('should not run function if timeout is not reached', () => {
    jest.useFakeTimers();
    oneTabEnforcer(options, functionToRun);
    jest.advanceTimersByTime(9); // time less than timeout
    expect(functionToRun).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
  test('should not throw error if a dummy functionToRun is provided', () => {
    expect(() => {
      oneTabEnforcer(options, jest.fn());
    }).not.toThrow();
  });

  test('should not throw error if options is undefined', () => {
    expect(() => {
      oneTabEnforcer(undefined, functionToRun);
    }).not.toThrow();
  });

  test('should not interfere with different appID', () => {
    jest.useFakeTimers();
    const tab1 = new MockBroadcastChannel('app1');
    const tab2 = new MockBroadcastChannel('app2');
    oneTabEnforcer({ ...options, appID: 'app1' }, functionToRun);
    oneTabEnforcer({ ...options, appID: 'app2' }, functionToRun);
    jest.advanceTimersByTime(10);
    expect(functionToRun).toHaveBeenCalledTimes(2); // function should run in both tabs
    jest.useRealTimers();
    tab1.close();
    tab2.close();
  });
});
