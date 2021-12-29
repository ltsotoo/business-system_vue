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

export const queryInvoices = (contractUID) => {
    return request({
        url: '/invoices/' + contractUID,
        method: 'GET',
    })
}