import request from './system_axios'

export const queryAreas = () => {
    {
        return request({
            url: '/areas',
            method: 'get',
        })
    }
}

export const querySystemDictionaryValuesByKeyID = (keyID) => {
    {
        return request({
            url: '/systemDictionaryValuesByKeyID',
            method: 'get',
            params:{"keyID":keyID}
        })
    }
}

export const querySystemDictionaryValuesByParentID = (parentID) => {
    {
        return request({
            url: '/systemDictionaryValuesByParentID',
            method: 'get',
            params:{"parentID":parentID}
        })
    }
}

export const getImgCode = () => {
    return request({
        url:'/image/code',
        method:'get',
        responseType: "blob"
    })
}