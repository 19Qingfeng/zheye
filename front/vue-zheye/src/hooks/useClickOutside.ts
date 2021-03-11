import { Ref, ref, onMounted, onUnmounted } from 'vue'

/**
 * @export
 * @param {(Ref<null | HTMLElement>)} domWrapper
 * @param {(?Ref<HTMLElement[]>)} otherWrapper
 * @returns {Ref<boolean>} isOutside true-点击外面 false-点击内部
 */
export default function userClickOutside (
  domWrapper: Ref<null | HTMLElement>,
  otherWrapper?: Ref<null | HTMLElement>[]
) {
  const isOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (domWrapper.value) {
      // 在元素内部
      if (domWrapper.value.contains(e.target as HTMLElement)) {
        console.log('点击内部')
        isOutside.value = true
        return
      }
      if (otherWrapper && otherWrapper.length > 0) {
        isOutside.value = otherWrapper.some(wrapper => {
          // nothing
          const dom = wrapper.value
          if (dom) {
            return dom.contains(e.target as HTMLElement)
          }
        })
        return
      }
      isOutside.value = false
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return {
    isOutside
  }
}
