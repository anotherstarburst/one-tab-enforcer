(global.channels as any) = [];

class MockBroadcastChannel {
  static instances: MockBroadcastChannel[] = [];

  name: string;

  listeners: any[];

  constructor(name: string) {
    this.name = name;
    this.listeners = [];
    MockBroadcastChannel.instances.push(this);
  }

  addEventListener(event: string, callback: any) {
    this.listeners.push(callback);
  }

  postMessage(message: string) {
    // Broadcast to all other instances (tabs) except this one
    MockBroadcastChannel.instances
      .filter((channel) => channel !== this)
      .forEach((channel) => channel.listeners.forEach((listener) => listener({ data: message })));
  }

  close() {
    this.listeners = [];
    const index = MockBroadcastChannel.instances.indexOf(this);
    if (index > -1) {
      MockBroadcastChannel.instances.splice(index, 1);
    }
  }

  static closeAll() {
    while (MockBroadcastChannel.instances.length) {
      MockBroadcastChannel.instances[0].close();
    }
  }
}

export default MockBroadcastChannel;
