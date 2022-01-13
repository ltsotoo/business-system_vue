import request from './base'

export const start = () => {
    return request({
        url: '/startYearPlan',
        method: 'GET',
    })
}

export const end = () => {
    return request({
        url: '/endYearPlan',
        method: 'GET',
    })
}

export const editYearOffice = (office) => {
    return request({
        url: '/yearOffice',
        method: 'PUT',
        data: office
    })
}