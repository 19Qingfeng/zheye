import { PostProp } from '@/components/PostList/interface'
/* 请求参数 */
export interface GetColumnsParams {
  id: string;
}

export interface CreatePostParams {
  title: string;
  content: string;
  image?: string;
  column: string;
  author: string;
}

/* 后台接口返回数据 */

export interface ImageProps {
  id: string;
  url: string;
}

/* 首页列表 */
export interface Columns {
  count: number;
  list: Column[];
  pageSize: number;
  currentPage: number;
}

export interface Column {
  createdAt: string;
  __v: number;
  avatar?: ImageProps;
  featured: true;
  author: string;
  description: string;
  title: string;
  _id: string;
  key: string;
}

/* 专栏 */

export interface PostProps {
  count: number;
  list: PostProp[];
  pageSize: number;
  currentPage: number;
}
