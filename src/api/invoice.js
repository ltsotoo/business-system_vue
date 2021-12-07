import request from './base'

export const createInvoice = (invoice) => {
    return request({
        url: '/invoice',
        method: 'post',
        data: invoice,
    })
}

export const delInvoice = (uid) => {
    return request({
        url: '/invoice/' + uid,
        method: 'DELETE',
    })
}

export const editInvoice = (invoice) => {
    return request({
        url: '/invoice',
        method: 'PUT',
        data: invoice,
    })
}

export const approve = (uid) => {
    return request({
        url: '/invoice/approve/' + uid,
        method: 'PUT',
    })
}

export const queryInvoices = (invoice, pageSize, pageNo) => {
    return request({
        url: '/invoices',
        method: 'post',
        data: invoice,
        params: {
            "pageSize": pageSize,
            "PageNo": pageNo,
        }
    })
}