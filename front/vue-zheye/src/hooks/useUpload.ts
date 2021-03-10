import { reactive } from 'vue'
import createMessage from '@/components/Message/createMessage'

/**
 * @param {?number} size 上传文件限制大小
 * @param {?Array} typeList 上传文件支持的类型
 * @returns {Object} response reactive({ success,error })
 * success 上传成功返回信息
 * error 上传失败返回信息
 * @returns {Function} onBeforeUpload 上传前钩子
 * @returns {Function} onUploadError 上传错误钩子
 * @returns {Function} onUploadSuccess 上传成功钩子
 */
export function useUpload (size?: number, typeList?: string[]) {
  const response = reactive({
    success: null,
    error: null
  })
  const onBeforeUpload = (file: File) => {
    const { size: fileSize, type } = file
    if (size) {
      const mbSize = fileSize / 1024 / 1024
      if (mbSize > size) {
        createMessage(`上传文件大于${size}mb`, 'warning')
        return false
      }
    }
    if (typeList && typeList.length > 0 && !typeList.includes(type)) {
      createMessage(`上传文件不支持该类型${type}`, 'warning')
      return false
    }
    return true
  }
  const onUploadSuccess = (res: any, file: File) => {
    createMessage('上传成功', 'success')
    response.success = res
  }
  const onUploadError = (error: any, file: File) => {
    createMessage('上传失败', 'danger')
    response.error = error
  }
  return {
    response,
    onBeforeUpload,
    onUploadError,
    onUploadSuccess
  }
}
