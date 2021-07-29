import request from './system_axios'

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

export const queryProducts = (pageSize, pageNo,queryObject) => {
    {
        return request({
            url: '/products',
            method: 'POST',
            data:queryObject,
            params: {
                "pageSize": pageSize,
                "pageNo": pageNo,
            }
        })
    }
}