import request from './base'

export const taskApprove = (data) => {
    return request({
        url: '/task/flow/approve',
        method: 'PUT',
        data: data
    })
}