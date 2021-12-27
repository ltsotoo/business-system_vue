import request from './base'

export const taskFlowApprove = (data) => {
    return request({
        url: '/task/flow/approve',
        method: 'PUT',
        data: data
    })
}