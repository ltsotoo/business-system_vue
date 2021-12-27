import request from './base'

export const taskFlowApprove = (data) => {
    return request({
        url: '/task/flow/approve',
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