import { EventEmitter } from 'events';
import { logEvents } from './logEvent.middleware';

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on('log', (msg) => logEvents('log', msg));

myEmitter.emit('log', 'Log event emitted!');

export default myEmitter;
