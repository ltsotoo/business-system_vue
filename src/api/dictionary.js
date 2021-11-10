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

export const queryDictionaries = (typeName, parentUID, text) => {
    return request({
        url: '/dictionaries',
        method: 'get',
        params: {
            "TypeName": typeName,
            "ParentUID": parentUID,
            "Text": text,
        }
    })
}

export const queryChilds = (parentID) => {
    return queryDictionaries("", parentID, "")
}

export const queryContractUnits = () => {
    return queryDictionaries("ContractUnit", "", "")
}

export const queryProductTypes = () => {
    return queryDictionaries("ProductType", "", "")
}

export const queryDepartmentType = () => {
    return queryDictionaries("DepartmentType", "", "")
}



