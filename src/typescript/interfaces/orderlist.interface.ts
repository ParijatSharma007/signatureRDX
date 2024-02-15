import { CommonApiCalls } from "./common.all.interface"
export interface GetOrderList extends CommonApiCalls {
    data: {
        count: number
        page: number
        perPage: number
        pages: number
        docs: GetOrderListDoc[]
    }
}

export interface phermacyBranch {
    id: number
    name: string
    logo?: string
    email: string
    address: string
    city: string
    postcode: string
    phone: string
    country: string
    pharmacy: {
        id: number
        name: string
        logo?: string
        applyLogoForAllBranches: boolean
        address: string
        city: string
        postcode: string
        phone: string
        country: string
    }
}

export interface GetOrderListDoc {
    id: number
    orderNumber: string
    prescriptionId: string
    prescriptionStatus: any
    orderInitiatedAt: string
    customerId: number
    pharmacyBranchId: number
    netBillAmount: string
    source: string
    patientName: string
    patientSurname: any
    clinicName: string
    branchName: string
    prescriberName: string
    prescriberSurname: string
    paidAmount: string
    platformFeeAmount: string
    paymentSessionId: string
    paymentStatus: string
    orderStatus: string
    paymentApproveDate: string
    orderAcceptedAt?: string
    orderRejectedAt?: string
    orderCollectedAt?: string
    payoutStatus: any
    updatedAt: string
    orderDetail: Array<{
        id: number
        orderMasterId: number
        APPID: string
        medicineName: string
        dosage: string
        quantity: number
        price: string
        totalAmount: string
        createdAt: string
        updatedAt: string
    }>
    pharmacyBranch: phermacyBranch
    user: {
        id: number
        name: string
        surname: any
        userProfile: {
            dob: string
        }
    }
    clinic: {
        id: number
        name: string
        logo_url: string
    }
    prescriber: {
        id: number
        name: string
        surname: string
    }
}