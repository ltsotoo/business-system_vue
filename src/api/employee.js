import request from './base'

export const entryEmployee = (employee) => {
    return request({
        url: '/employee',
        method: 'post',
        data: employee,
    })
}

export const delEmployee = (uid) => {
    return request({
        url: '/employee/' + uid,
        method: 'DELETE',
    })
}

export const editEmployee = (employee) => {
    return request({
        url: '/employee',
        method: 'PUT',
        data: employee,
    })
}

export const queryEmployee = (uid) => {
    return request({
        url: '/employee/' + uid,
        method: 'get',
    })
}

export const queryEmployees = (employee, pageSize, pageNo) => {
    return request({
        url: '/employees',
        method: 'post',
        data: employee,
        params: {
            "pageSize": pageSize,
            "PageNo": pageNo,
        }
    })
}

export const queryMy = () => {
    return request({
        url: '/my',
        method: 'get',
    })
}

export const editMyPwd = (object) => {
    return request({
        url: '/editMyPwd',
        method: 'POST',
        data: object,
    })
}

export const resetPwd = (uid) => {
    return request({
        url: '/resetPwd/' + uid,
        method: 'get',
    })
}