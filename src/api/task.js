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

export const queryMyTasks1 = () => {
    return request({
        url: '/mytasks1',
        method: 'GET',
    })
}
export const queryMyTasks2 = () => {
    return request({
        url: '/mytasks2',
        method: 'GET',
    })
}
export const queryMyTasks3 = () => {
    return request({
        url: '/mytasks3',
        method: 'GET',
    })
}
export const queryMyTasks4 = () => {
    return request({
        url: '/mytasks4',
        method: 'GET',
    })
}
export const queryMyTasks5 = () => {
    return request({
        url: '/mytasks5',
        method: 'GET',
    })
}