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
import useUrlState from "@ahooksjs/use-url-state";
import dayjs from "dayjs";
import PopOver from "UI/Popover/Popover";
import { Link } from "react-router-dom";

interface DataType {
    prescriptionId: string,
    prescriberName: string,
    address: string,
    source: string,
    logo?: string | undefined
    paymentStatus: string,
    orderStatus: string,
    orderNumber: string,
    width?: string,
    id: number
}

export default function OrdersPrescriptions() {
    const [dataSource, setDataSource] = useState<DataType[]>([])
    const [queryParams, setQueryParams] = useUrlState<RequestOrderInterface>({
        page: 1,
        length: 10,
        column: 'id',
        order: 'ASC',
        startDate: dayjs().startOf('month').format('YYYY-MM-DD').toString(),
        endDate: dayjs().endOf('month').format('YYYY-MM-DD').toString(),
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
        }
    }


    const handleSort = (key: string) => {
        if (key === queryParams.column) {
            if (queryParams.order === 'DESC') {
                return setQueryParams({
                    ...queryParams,
                    column: "id",
                    order: "ASC"
                })
            }
            return setQueryParams({
                ...queryParams,
                order: "DESC"
            })
        }
        return setQueryParams({
            ...queryParams,
            column: key,
            order: 'ASC'
        })
    }

    const handleSearch = (val: { [key: string]: string }) => {
        setQueryParams({
            ...queryParams,
            ...val
        })
    }

    const columns: ColumnsType<DataType> = [
        {
            title: <TableHeader title="prescriptionId" sort passingSortingProps={handleSort} />,
            dataIndex: "prescriptionId",
            key: "prescriptionId",
            render: (prescriptionId, item) => (
                <Link to={`${item.id}`}>{prescriptionId}</Link>
            ),
            sorter: true,
            width: 220,
            align: "left",
            fixed: "left",
        },
        {
            title: <TableHeader title="prescriberName" passingSortingProps={handleSort} />,
            dataIndex: "prescriberName",
            key: "prescriberName",
            render: (prescriberName) => (
                <p>{prescriberName}</p>
            ),
            width: 160,
            align: "left",
            fixed: "left"
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
                        <p style={{ margin: '3px', fontSize: "14px", fontWeight: "bold" }}>
                            {paymentStatus}
                        </p>
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
            render: (orderNumber, item) => (
                <Link to={`${item.id}`}>{orderNumber}</Link>
            ),
            align: "center",
            width: 160,
            sorter: true
        },

        {
            title: <TableHeader title="orderStatus" passingSortingProps={handleSort} />,
            key: "orderStatus",
            dataIndex: "orderStatus",
            render: (orderStatus) => (
                <Tag color={orderStatus === "pending" ? "yellow" : orderStatus === "rejected" ? "red" : "green"}>
                    <p style={{ margin: '3px', fontSize: "14px", fontWeight: "bold" }}>
                        {orderStatus}
                    </p>
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
            align: "center",
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
            align: 'center',
        },

        {
            title: <TableHeader title="action" />,
            dataIndex: "action",
            key: "action",
            // render: () => (
            //     null
            // ),
            width: 75,
            align: 'center',
            fixed: 'right'
        }

    ];

    // const [dataCol, setDataCol] = useState<any>([])

    useEffect(() => {
        if (data && !isLoading) {
            if (data.data.docs.length === 0 && queryParams.length !== 1) {
                setQueryParams({
                    ...queryParams,
                    page: 1
                })
            }
            const newDataSource = data.data.docs.map((item) => {
                return {
                    prescriptionId: item.prescriptionId,
                    prescriberName: item.prescriberName,
                    address: item.pharmacyBranch.address,
                    source: item.source,
                    logo: item.clinic.logo_url,
                    paymentStatus: item.paymentStatus,
                    orderStatus: item.orderStatus,
                    orderNumber: item.orderNumber,
                    action: <PopOver
                        startedAt={item.orderDetail[0].createdAt}
                        updatedAt={item.orderDetail[0].updatedAt}
                    />,
                    id: item.id
                }
            })
            setDataSource(newDataSource)
            setCustomTableProps({
                page: data.data.pages * queryParams.length
            })

        }
    }, [queryParams, data, isLoading])

    // console.log(dataSource);

    return (
        <Layout Headertext={"Orders & Prescriptions"}>
            <FilterRow hidefilter hideCheckbox passingDates={getDates}
                passingCheckedFillters={() => { }}
                passingInput={handleSearch}
                defaultStartDate={queryParams.startDate}
                defaultEndDate={queryParams.endDate}
                urlPrescriptionId={queryParams.prescriptionId}
                urlOrderId={queryParams.orderNumber}
            />
            <CustomTable defaultSelect={queryParams.length}
                passingSelecter={(length) => setQueryParams({
                    ...queryParams,
                    length,
                })}
                columns={columns} dataSource={dataSource}
                currentPage={queryParams.page}
                pages={customtableProps.page}
                pageSize={queryParams.length}
                passingPageNumber={(pageNumber) => setQueryParams({ ...queryParams, page: pageNumber })}
            />
        </Layout>
    );
}
