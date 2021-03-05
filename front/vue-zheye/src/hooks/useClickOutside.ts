import { Ref, ref, onMounted, onUnmounted } from 'vue'

// 抽象逻辑 点击落在传入DOM元素内部还是外部
export default function userClickOutside (domWrapper: Ref<null | HTMLElement>) {
  const isOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (domWrapper.value) {
      if (domWrapper.value.contains(e.target as HTMLElement)) {
        isOutside.value = true
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
