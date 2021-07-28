import request from './service'

export const entryEmployee = (employee) => {
    return request({
        url: '/employee',
        method: 'post',
        data: employee,
    })
}

export const queryEmployee = (id) => {
    return request({
        url: '/employee/' + id,
        method: 'get',
    })
}

export const queryEmployees = (pageSize, pageNo) => {
    return request({
        url: '/employees',
        method: 'get',
        params: {
            "pageSize": pageSize,
            "PageNo": pageNo,
        }
    })
}