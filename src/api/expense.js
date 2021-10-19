import request from './base'

export const entryExpense = (expense) => {
    return request({
        url: '/expense',
        method: 'POST',
        data: expense
    })
}

export const editExpense = (expense) => {
    return request({
        url: '/expense',
        method: 'PUT',
        data: expense
    })
}

export const queryExpense = (uid) => {
    return request({
        url: '/expense/' + uid,
        method: 'GET',
    })
}

export const queryExpenses = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/expenses',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}

export const queryMyExpenses = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/myexpenses',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}