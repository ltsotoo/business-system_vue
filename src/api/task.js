import request from './base'

export const delTask = (uid) => {
    return request({
        url: '/task/' + uid,
        method: 'DELETE',
    })
}

export const queryTasks = (queryObject) => {
    return request({
        url: '/tasks',
        method: 'POST',
        data: queryObject
    })
}

export const queryMyTasks = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/mytasks',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}