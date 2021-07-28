import request from './service'

export const entryProduct = (product) => {
    {
        return request({
            url: '/product',
            method: 'POST',
            data:product
        })
    }
}

export const delProduct = (id) => {
    {
        return request({
            url: '/product/' + id,
            method: 'DELETE',
        })
    }
}

export const editProduct = (product) => {
    {
        return request({
            url: '/product',
            method: 'PUT',
            data:product
        })
    }
}

export const queryProduct = (id) => {
    {
        return request({
            url: '/product/' + id,
            method: 'GET',
        })
    }
}

export const queryProducts = (pageSize, pageNo,queryForm) => {
    {
        return request({
            url: '/products',
            method: 'POST',
            data:queryForm,
            params: {
                "pageSize": pageSize,
                "pageNo": pageNo,
            }
        })
    }
}