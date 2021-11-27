// 一些封装的通用的函数
import { ColumnProps, UserProps, ImageProps } from '../store'

// 1、封装用来获取阿里云服务器上图片自定义的大小的函数
export function generateFitUrl(data: ImageProps, width: number, height: number, format = ['m_pad']) {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

// 2、封装创建文章上传文件时，检查文件参数的方法
// 检查文件类型的类型接口
interface CheckCondition {
  format?: string[] // 允许文件上传的类型
  size?: number // 允许文件的大小，单位是 M
}

// 定义上传文件后，出错的类型定义
// 到底是 size 出错，还是 format 出错，还是没有错误
type ErrorType = 'size' | 'format' | null

// 封装用来检查上传文件的类型的函数
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  // 取出参数
  const { format, size } = condition

  // 一个标识符，用来检查上传的文件类型是否和自定义的规定类型一致
  const isValidFormat = format ? format.includes(file.type) : true
  // 一个标识符，用来检查上传的文件大小是否和自定义的规定大小一致
  // 上传文件的类型单位是字节，需要转换为 M
  const isValidSize = size ? file.size / 1024 / 1024 < size : true

  // 定义出错的原因
  let error: ErrorType = null
  // 如果上传文件的类型出错了，将错误原因的类型设为 format
  if (!isValidFormat) {
    error = 'format'
  }
  // 如果上传文件的大小出错了，将错误原因的类型设为 size
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed: isValidFormat && isValidSize, // 通没通过
    error // 错误原因
  }
}

// 3、封装的用户信息展示的参数
export function addColumnAvatar(data: ColumnProps | UserProps, width: number, height: number) {
  // 如果用户有头像的话
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    // 用户或者专栏没有头像的话，使用默认的照片
    const parseCol = data as ColumnProps

    // 改变专栏或用户数据的图片或头像
    data.avatar = {
      fitUrl: require(parseCol.title ? '../assets/images/column.jpg' : '../assets/images/avatar.jpg')
    }
  }
}

export const objToArr = <T>(obj: { [key: string]: T }) => {
  return Object.keys(obj).map((key) => obj[key])
}

export const arrToObj = <T extends { _id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current._id) {
      prev[current._id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
