import { EventEmitter } from 'events';
import { logEvents } from './log-event.middleware.js';

class Emitter extends EventEmitter {}

const myEmitter = new Emitter();

myEmitter.on('log', (msg) => logEvents('log', msg));

myEmitter.emit('log', 'Log event emitted!');

export default myEmitter;
