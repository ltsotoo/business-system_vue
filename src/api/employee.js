import request from './base'

export const entryEmployee = (employee) => {
    return request({
        url: '/employee',
        method: 'post',
        data: employee,
    })
}

export const delEmployee = (id) => {
    return request({
        url: '/employee/'+id,
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

export const queryEmployee = (id) => {
    return request({
        url: '/employee/' + id,
        method: 'get',
    })
}

export const queryEmployees = (employee,pageSize, pageNo) => {
    return request({
        url: '/employees',
        method: 'post',
        data:employee,
        params: {
            "pageSize": pageSize,
            "PageNo": pageNo,
        }
    })
}