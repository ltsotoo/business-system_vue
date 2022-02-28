import request from './base'

export const uploadExcelToProcurementPlan = (excel, object) => {
    return request({
        url: '/uploadExcelToProcurementPlan',
        method: 'post',
        data: excel,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        params: {
            "no": object.no,
            "customer": object.customer,
            "employeeName": object.employeeName,
            "startDate": object.startDate,
        }
    })
}