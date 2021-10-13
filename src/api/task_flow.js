import request from './base'

export const taskApprove = (data) => {
    return request({
        url: '/task/flow/approve',
        method: 'PUT',
        data: data
    })
}

export const last = (data) => {
    return request({
        url: '/task/flow/last',
        method: 'PUT',
        data: data
    })
}

export const next = (data) => {
    return request({
        url: '/task/flow/next',
        method: 'PUT',
        data: data
    })
}