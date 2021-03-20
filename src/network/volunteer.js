import {request} from './request'

// 获取志愿者信息请求
export function getVolunteerMsg(pageno=1, pagesize=8, grade, name) {
    return request({
        url: '/getvolunteermsg',
        method: "get",
        params: {
            pagesize,
            pageno,
            grade,
            name
        }
    })
}

// 添加志愿者请求
export function addVolunteer(data) {
    return request ({
        url: '/addvolunteer',
        method: 'post',
        data
    })
}

// 更新志愿者信息请求
export function updateVolunteer(data) {
    return request({
        url: '/updatevolunteer',
        method: 'post',
        data
    })
}

// 删除志愿者信息请求
export function deleteVolunteer(id) {
    return request({
        url: '/deletevolunteer',
        method: 'post',
        data: {
            id
        }
    })
}

