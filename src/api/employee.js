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
        method: 'GET',
    })
}

export const queryEmployees = (employee, pageSize, pageNo) => {
    return request({
        url: '/employees',
        method: 'POST',
        data: employee,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}

export const querySPEmployees = (queryObj) => {
    return request({
        url: '/spEmployees',
        method: 'POST',
        data: queryObj,
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