import endpoints from "config/endpoints.config"
import request from "request"
import { GetOrderList } from "typescript/interfaces/orderlist.interface"

export interface RequestOrderInterface {
    page: number,
    length: number,
    column: string,
    order: 'ASC' | 'DESC',
    startDate: string,
    endDate: string,
    prescriptionId: string,
    orderNumber: string
}

export const getOderList = async ({
    page, length, column,
    order, startDate, endDate,
    prescriptionId, orderNumber
}: any) => {
    const response: GetOrderList = await request.post(endpoints.orderList, {
        page,
        length,
        sort: {
            column,
            order
        },
        startDate,
        endDate,
        prescriptionId,
        orderNumber
    })
    return response
}