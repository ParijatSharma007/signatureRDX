import { useQuery } from "@tanstack/react-query";
import Layout from "Layout/Layout";
import { Image, Tag } from "antd";
// import CustomTab from "UI/CustomTab/CustomTab";
// import { TabsProps } from "antd";
// import BranchesTabpage from "components/BranchesTabPage/BranchesTabpage";
// import PharmacyTab from "components/PharmacyTab/PharmacyTab";
import { ColumnsType } from "antd/es/table";
import CustomTable, { TableHeader } from "UI/CustomTable/CustomTable";
import { Typography } from "antd";
import { RequestOrderInterface, getOderList } from "lib/helpers/axios/axiosCalls";
import { useEffect, useState } from "react";
// import { GetOrderListDoc } from "typescript/interfaces/orderlist.interface";
import FilterRow from "components/FilterRow/FilterRow";
import { useDebounceValue } from "lib/hooks/useDebounceValue";
import { useSearchParams } from "react-router-dom";

interface DataType {
    prescriptionId: string,
    prescriberName: string,
    address: string,
    source: string,
    logo?: string | undefined
    paymentStatus: string,
    orderStatus: string,
    orderNumber: string
}

export default function OrdersPrescriptions() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [dataSource, setDataSource] = useState<DataType[]>([])
    const [queryParams, setQueryParams] = useState<RequestOrderInterface>({
        page: 1,
        length: 10,
        column: 'id',
        order: 'ASC',
        startDate: '2024-01-01',
        endDate: '2024-02-12',
        prescriptionId: "",
        orderNumber: ""
    })
    const [customtableProps, setCustomTableProps] = useState({
        page: 20
    })

    const debouncedPrescriptionid = useDebounceValue(queryParams.prescriptionId, 500)
    const debouncedOrderid = useDebounceValue(queryParams.orderNumber, 500)
    const { data, isLoading } = useQuery({
        queryKey: [`data-list-${queryParams.page}-${queryParams.length}-
        ${queryParams.column}-${queryParams.order}-${queryParams.startDate}-${queryParams.endDate}-
        ${debouncedPrescriptionid}-${debouncedOrderid}`],
        queryFn: () => getOderList(queryParams)
    })

    const getDates = (dates: { startDate: string, endDate: string }) => {
        if (dates.endDate && dates.startDate) {
            setQueryParams({
                ...queryParams,
                ...dates
            })
            setSearchParams({
                ...searchParams,
                ...dates
            })
        }
    }


    const handleSort = (key: string) => {
        if (key === "id") {
            setSearchParams({
                ...searchParams,
                column: key,
                order: 'ASC'
            })
            return setQueryParams({
                ...queryParams,
                column: key,
                order: 'ASC'
            })
        } else {
            if (queryParams.order === "ASC") {
                setSearchParams({
                    ...searchParams,
                    order: 'DESC'
                })
                return setQueryParams({ ...queryParams, order: "DESC" })
            }
            setSearchParams({
                ...searchParams,
                column: "id",
                order: "ASC"
            })
            return setQueryParams({
                ...queryParams,
                column: "id",
                order: "ASC"
            })
        }
    }

    const handleSearch = (val: { [key: string]: string }) => {
        setQueryParams({
            ...queryParams,
            ...val
        })
        setSearchParams({
            ...searchParams,
            ...val
        })
    }

    useEffect(() => {
        const page = searchParams.get("page")
        const length = searchParams.get("length")
        const column = searchParams.get("column")
        const order = searchParams.get("order")
        const startDate = searchParams.get("startDate")
        const endDate = searchParams.get("endDate")
        const prescriptionId = searchParams.get("prescriptionId")
        const orderNumber = searchParams.get("orderNumber")
        setQueryParams({
            page: typeof page === "number" ? page : 1,
            length: typeof length === 'number' ? length : 10,
            column: typeof column === 'string' ? column : "id",
            order: order === 'ASC' || order === 'DESC' ? order : 'ASC',
            startDate: typeof startDate === 'string' ? startDate : queryParams.startDate,
            endDate: typeof endDate === 'string' ? endDate : queryParams.endDate,
            prescriptionId: typeof prescriptionId === 'string' ? prescriptionId : queryParams.prescriptionId,
            orderNumber: typeof orderNumber === 'string' ? orderNumber : queryParams.orderNumber
        })
        console.log("query params updated", queryParams);
    }, [])

    const columns: ColumnsType<DataType> = [
        {
            title: <TableHeader title="prescriptionId" sort passingSortingProps={handleSort} />,
            dataIndex: "prescriptionId",
            key: "prescriptionId",
            render: (prescriptionId) => (
                <p>{prescriptionId}</p>
            ),
            sorter: true,
            width: 323,
        },
        {
            title: <TableHeader title="prescriberName" passingSortingProps={handleSort} />,
            dataIndex: "prescriberName",
            key: "prescriberName",
            render: (prescriberName) => (
                <p>{prescriberName}</p>
            ),
            width: 160,
        },

        {
            title: <TableHeader title="paymentStatus" passingSortingProps={handleSort} />,
            key: "paymentStatus",
            dataIndex: "paymentStatus",
            render: (paymentStatus) => {
                if (paymentStatus === "Voided") {
                    return (
                        <p>___</p>
                    )
                } else {
                    return <Tag color="green">
                        {paymentStatus}
                    </Tag>
                }
            },
            align: "end",
            width: 160,
        },

        {
            title: <TableHeader title="orderNumber" passingSortingProps={handleSort} sort />,
            key: "orderNumber",
            dataIndex: "orderNumber",
            render: (orderNumber) => (
                <p>{orderNumber}</p>
            ),
            align: "end",
            width: 160,
            sorter: true
        },

        {
            title: <TableHeader title="orderStatus" passingSortingProps={handleSort} />,
            key: "orderStatus",
            dataIndex: "orderStatus",
            render: (orderStatus) => (
                <Tag color={orderStatus === "pending" ? "yellow" : orderStatus === "rejected" ? "red" : "green"}>
                    {orderStatus}
                </Tag>
            ),
            align: "end",
            width: 160,
        },

        {
            title: <TableHeader title="source" passingSortingProps={handleSort} />,
            dataIndex: "source",
            key: "source",
            render: (source, logo: DataType) => (
                <div style={{ textAlign: "center" }}>
                    <Image src={logo.logo} />
                    <p>{source}</p>
                </div>),
            align: "end",
            width: 160,
        },

        {
            title: <TableHeader title="address" passingSortingProps={handleSort} />,
            dataIndex: "address",
            key: "address",
            render: (address) => (
                <Typography.Text>{address}</Typography.Text>
            ),
            width: 323,
        },

    ];

    // const [dataCol, setDataCol] = useState<any>([])

    useEffect(() => {
        if (data && !isLoading) {
            const newDataSource = data.data.docs.map((item) => {
                return {
                    prescriptionId: item.prescriptionId,
                    prescriberName: item.prescriberName,
                    address: item.pharmacyBranch.address,
                    source: item.source,
                    logo: item.clinic.logo_url,
                    paymentStatus: item.paymentStatus,
                    orderStatus: item.orderStatus,
                    orderNumber: item.orderNumber
                }
            })
            setDataSource(newDataSource)
            setCustomTableProps({
                page: data.data.pages * queryParams.length
            })

        }
    }, [queryParams, data, isLoading])

    useEffect(() => {
        console.log("herf", window.location.href);
    }, [queryParams])


    return (
        <Layout Headertext={"Orders & Prescriptions"}>
            <FilterRow hidefilter hideCheckbox passingDates={getDates}
                passingCheckedFillters={() => { }}
                passingInput={handleSearch}
                urlOrderId={queryParams.orderNumber}
                urlPrescriptionId={queryParams.prescriptionId}
            />
            <CustomTable passingSelecter={(length) => setQueryParams({
                ...queryParams,
                length,
            })}
                columns={columns} dataSource={dataSource}
                currentPage={queryParams.page}
                pages={customtableProps.page}
                passingPageNumber={(pageNumber) => setQueryParams({ ...queryParams, page: pageNumber })}
            />
        </Layout>
    );
}
