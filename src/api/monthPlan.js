import request from './base'

export const editMonthPlan = (monthPlan) => {
    return request({
        url: '/monthPlan',
        method: 'PUT',
        data: monthPlan,
    })
}

export const queryMonthPlans = () => {
    return request({
        url: '/monthPlans',
        method: 'GET',
    })
}