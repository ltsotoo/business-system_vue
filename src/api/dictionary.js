import request from './base'

export const createDictionary = (object) => {
    return request({
        url: '/dictionary',
        method: 'POST',
        data: object
    })
}

export const delDictionary = (uid) => {
    return request({
        url: '/dictionary/' + uid,
        method: 'DELETE',
    })
}

export const queryDictionaries = (typeName, text) => {
    return request({
        url: '/dictionaries',
        method: 'get',
        params: {
            "TypeName": typeName,
            "Text": text,
        }
    })
}

export const queryDictionarieTypes = (category) => {
    return request({
        url: '/dictionarieTypes',
        method: 'get',
        params: {
            "Category": category,
        }
    })
}

export const queryProductTypes = () => {
    return queryDictionarieTypes("ProductType")
}


export const queryChilds = (parentID) => {
    return queryDictionaries("", parentID, "")
}

export const queryContractUnits = () => {
    return queryDictionaries("ContractUnit", "")
}

export const queryProductSelfs = () => {
    return queryDictionaries("ProductSelf", "")
}

export const queryThirdpartys = () => {
    return queryDictionaries("ProductThirdparty", "")
}

export const queryDepartmentTypes = () => {
    return queryDictionaries("DepartmentType", "")
}



