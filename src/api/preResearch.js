import request from './base'

export const createPreResearch = (preResearch) => {
    return request({
        url: '/preResearch',
        method: 'POST',
        data: preResearch
    })
}

export const delPreResearch = (uid) => {
    return request({
        url: '/preResearch/' + uid,
        method: 'DELETE',
    })
}

export const queryPreResearch = (uid) => {
    return request({
        url: '/preResearch/' + uid,
        method: 'GET',
    })
}

export const queryPreResearchs = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/preResearchs',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}

export const queryPreResearchTasks = (queryObject, pageSize, pageNo) => {
    return request({
        url: '/preResearchTasks',
        method: 'POST',
        data: queryObject,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}

export const editPreResearch = (preResearchQuery) => {
    return request({
        url: '/preResearch',
        method: 'PUT',
        data: preResearchQuery
    })
}

export const editPreResearchTask = (preResearchTask) => {
    return request({
        url: '/preResearchTask',
        method: 'PUT',
        data: preResearchTask
    })
}