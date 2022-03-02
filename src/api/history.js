import request from './base'

export const queryHistoryOffices = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/historyOffices',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}

export const queryHistoryEmployees = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/historyEmployees',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}
