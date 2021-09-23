import request from './base'

export const contractApprove = (data) => {
    return request({
        url: '/task/contract/approve',
        method: 'PUT',
        data: data
    })
}