import {request} from './request'

// 上传文件请求函数
export function addFilePlan(fd) {
    return request({
        url: '/addfileplan',
        method: 'post',
        data: fd
    })
}

// 获取文件信息请求函数
export function getFilePlan(pageno=1, pagesize=8, search) {
    return request({
        url: '/getFilePlan',
        method: 'get',
        params: {
            pageno,
            pagesize,
            search
        }
    })
}

// 下载文件请求函数
export function downloadFilePlan(id) {
    return request({
        url: '/downloadfileplan',
        method: 'get',
        params: {
            id
        }
    })
}

// 删除文件请求函数
export function removeFilePlan(id) {
    return request({
        url: '/removefileplan',
        method: 'delete',
        params: {
            id
        }
    })
}

