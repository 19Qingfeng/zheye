import mitt from 'mitt'

const emitter = mitt()

export function $on (eventName: string, eventHandler: any) {
  emitter.on(eventName, eventHandler)
}
// listen to an event

// listen to all events
export function $emit (eventName: string, params?: any) {
  emitter.emit(eventName, params)
}

export function $off (eventName: string, handler: any) {
  emitter.off(eventName, handler)
}
