import request from './base'

export const createBidBond = (bidBond) => {
    return request({
        url: '/bidBond',
        method: 'post',
        data: bidBond,
    })
}

export const delBidBond = (uid) => {
    return request({
        url: '/bidBond/' + uid,
        method: 'DELETE',
    })
}

export const editBidBond = (bidBond) => {
    return request({
        url: '/bidBond',
        method: 'PUT',
        data: bidBond,
    })
}

export const approve = (uid) => {
    return request({
        url: '/bidBond/approve/' + uid,
        method: 'PUT',
    })
}

export const queryBidBonds = (bidBond, pageSize, pageNo) => {
    return request({
        url: '/bidBonds',
        method: 'post',
        data: bidBond,
        params: {
            "pageSize": pageSize,
            "pageNo": pageNo,
        }
    })
}