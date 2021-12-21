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

export const editDictionary = (dictionary) => {
    return request({
        url: '/dictionary',
        method: 'PUT',
        data: dictionary
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

export const queryContractUnits = () => {
    return queryDictionaries("ContractUnit", "")
}

export const queryRegions = () => {
    return queryDictionaries("Region", "")
}

export const queryExpenseTypes = () => {
    return queryDictionaries("ExpenseType", "")
}

export const queryExpenseStatus = () => {
    return queryDictionaries("ExpenseStatus", "")
}

export const queryBidBondStatus = () => {
    return queryDictionaries("BidBondStatus", "")
}

export const queryPreResearchStatus = () => {
    return queryDictionaries("PreResearchStatus", "")
}

export const queryPreResearchTaskStatus = () => {
    return queryDictionaries("PreResearchTaskStatus", "")
}

export const queryContractStatus = () => {
    return queryDictionaries("ContractStatus", "")
}

export const queryContractProductionStatus = () => {
    return queryDictionaries("ContractProductionStatus", "")
}

export const queryContractCollectionStatus = () => {
    return queryDictionaries("ContractCollectionStatus", "")
}





