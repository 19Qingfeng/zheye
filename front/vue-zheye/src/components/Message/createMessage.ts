import Message from './index.vue'
import { createApp } from 'vue'
export type MessageType = 'primary' | 'success' | 'danger' | 'warning' | 'info';

/**
 * @param message 提示内容
 * @param type 类型 primary' | 'success' | 'danger' | 'warning' | 'info';
 * @param timeout 持续时间 默认2000ms
 * @return void
 * @example see @/api/config/request.ts
 */
const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  const instance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  instance.mount(mountNode)
  setTimeout(() => {
    // 删除组件实例 它是一个js object 删除
    instance.unmount()
    // 删除dom节点
    document.body.removeChild(mountNode)
  }, timeout)
}

export default createMessage
