import {request} from './request'

// 登录请求函数
export function loginRequest(data) {
    return request({
        url: 'api/login',
        method: 'post',
        data
    })
}

// 注册请求函数
export function registerRequest(data) {
    return request({
        url: '/api/register',
        method: "post",
        data
    })
}

// 获取用户信息函数
export function getUserInfo() {
    return request({
        url: '/getuserinfo',
        method: 'get'
    })
}