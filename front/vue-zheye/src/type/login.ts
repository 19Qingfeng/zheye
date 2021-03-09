/* 登陆  */
export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

/* 获取用户信息 */
export interface UserInfoRes {
  _id: string;
  email: string;
  nickName: string;
  column: string;
  description: string;
  avatar?: {
    _id: string;
    url: string;
  };
}
