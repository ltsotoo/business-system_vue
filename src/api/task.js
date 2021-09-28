import request from './base'

export const delTask = (uid) => {
    return request({
        url: '/task/' + uid,
        method: 'DELETE',
    })
}

export const queryTasks = (querObject) => {
    return request({
        url: '/tasks',
        method: 'POST',
        data: querObject
    })
}

export const queryMyTasks = () => {
    return request({
        url: '/mytasks',
        method: 'GET',
    })
}