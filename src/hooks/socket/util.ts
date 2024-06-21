import { resetWebSockets } from './globals';
import { resetSubscribers } from './manage-subscribers';
import { WebSocketLike } from './types';

export function assertIsWebSocket(
  webSocketInstance: WebSocketLike,
  skip?: boolean,
): asserts webSocketInstance is WebSocket {
  if (!skip && webSocketInstance instanceof WebSocket === false) throw new Error('');
}

export function resetGlobalState(url?: string): void {
  resetSubscribers(url);
  resetWebSockets(url);
}
