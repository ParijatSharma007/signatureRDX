import React from 'react'
import Layout from 'Layout/Layout'
import { Card } from 'antd/es/'
import { useParams } from 'react-router'

const OrderPrescriptionDetail = () => {
    const { id } = useParams()
    const contentTitle = <h1>{`Order #${id}`}</h1>

    // const {data, isLoading} = null

    return (
        <Layout>
            <Card title={contentTitle} bordered={false}
                style={{ marginLeft: "20px", marginRight: "20px" }}>
                Card content
            </Card>
        </Layout>
    )
}

export default OrderPrescriptionDetail
