import request from './service'

export const querySystemDictionaryValuesByKeyId = (keyId) => {
    {
        return request({
            url: '/systemDictionaryValuesByKeyId',
            method: 'get',
            params:{"keyId":keyId}
        })
    }
}

export const querySystemDictionaryValuesByParentId = (parentId) => {
    {
        return request({
            url: '/systemDictionaryValuesByParentId',
            method: 'get',
            params:{"parentId":parentId}
        })
    }
}