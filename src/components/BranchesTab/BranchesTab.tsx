/* eslint-disable @typescript-eslint/no-unused-vars */
import CustomButtonPrimary from "UI/CustomButton/CustomButtonPrimary";
import CustomSwitch from "UI/CustomSwichWithLabel/CustomSwitch";
import CustomTable, { TableHeader } from "UI/CustomTable/CustomTable";
import CustomTag from "UI/CustomTag/CustomTag";
import CircleCheck from "UI/Icons/CircleCheck";
import CircleCross from "UI/Icons/CircleCross";
import { Space, Avatar, Flex, Button, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import FilterRow from "components/FilterRow/FilterRow";
import assets from "json/assets";
import React from "react";
import { Link } from "react-router-dom";

const BranchesTab = () => {
  interface DataType {
    key: string;
    pharmacy: string;
    status: boolean;
    address: string;
    users: number;
    orders: number;
    Pharmaimg?: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: <TableHeader title="Pharmacy" sort />,
      dataIndex: "pharmacy",
      key: "pharmacy",
      render: (pharmacy, Pharmaimg: DataType) => (
        <Space>
          <Avatar size={32} src={Pharmaimg.Pharmaimg} />
          <Link to={"/"}>{pharmacy}</Link>
        </Space>
      ),
      sorter: true,
      width: 323,
    },
    {
      title: <TableHeader title="Status" />,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          <CustomSwitch label="Online" className="greenSwitch" />
        </>
      ),
      sorter: true,
      width: 160,
    },
    {
      title: <TableHeader title="Address" sort />,
      dataIndex: "address",
      key: "address",
      render: (address) => (
        <>
          <Typography.Text>{address}</Typography.Text>
        </>
      ),
      sorter: true,
      width: 323,
    },
    {
      title: <TableHeader title="# users" sort />,
      dataIndex: "users",
      key: "users",
      sorter: true,
      render: (branches) => <>{branches > 0 ? branches : "-"}</>,
      align: "end",
      width: 160,
    },

    {
      title: <TableHeader title="# orders" sort />,
      key: "orders",
      dataIndex: "orders",
      render: (orders) => (
        <>
          <p>{orders}</p>
        </>
      ),
      align: "end",
      width: 160,
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      pharmacy: "Paulatim Summa Petuntur",
      status: true,
      address: "5278 Meadowview Circle, Springfield",
      users: 5,
      orders: 182,
      Pharmaimg: assets.PaulatimSummaPetuntur,
    },
    {
      key: "1",
      pharmacy: "Aversi Pharmacy",
      status: true,
      address: "6923 Brookside Avenue, Boulder",
      users: 5,
      orders: 922,
      Pharmaimg: assets.BuckinghamMeadowWalk,
    },
    {
      key: "1",
      pharmacy: "Paulatim Summa Petuntur",
      status: true,
      address: "5278 Meadowview Circle, Springfield",
      users: 5,
      orders: 182,
      Pharmaimg: assets.PaulatimSummaPetuntur,
    },
    {
      key: "1",
      pharmacy: "Aversi Pharmacy",
      status: true,
      address: "6923 Brookside Avenue, Boulder",
      users: 5,
      orders: 922,
      Pharmaimg: assets.BuckinghamMeadowWalk,
    },
    {
      key: "1",
      pharmacy: "Paulatim Summa Petuntur",
      status: true,
      address: "5278 Meadowview Circle, Springfield",
      users: 5,
      orders: 182,
      Pharmaimg: assets.PaulatimSummaPetuntur,
    },
    {
      key: "1",
      pharmacy: "Aversi Pharmacy",
      status: true,
      address: "6923 Brookside Avenue, Boulder",
      users: 5,
      orders: 922,
      Pharmaimg: assets.BuckinghamMeadowWalk,
    },
    {
      key: "1",
      pharmacy: "Paulatim Summa Petuntur",
      status: true,
      address: "5278 Meadowview Circle, Springfield",
      users: 5,
      orders: 182,
      Pharmaimg: assets.PaulatimSummaPetuntur,
    },
    {
      key: "1",
      pharmacy: "Aversi Pharmacy",
      status: true,
      address: "6923 Brookside Avenue, Boulder",
      users: 5,
      orders: 922,
      Pharmaimg: assets.BuckinghamMeadowWalk,
    },
    {
      key: "1",
      pharmacy: "Paulatim Summa Petuntur",
      status: true,
      address: "5278 Meadowview Circle, Springfield",
      users: 5,
      orders: 182,
      Pharmaimg: assets.PaulatimSummaPetuntur,
    },
    {
      key: "1",
      pharmacy: "Aversi Pharmacy",
      status: true,
      address: "6923 Brookside Avenue, Boulder",
      users: 5,
      orders: 922,
      Pharmaimg: assets.BuckinghamMeadowWalk,
    },
  ];
  return (
    <>
      <FilterRow title="Branches 28" hideCheckbox hideDatePicker />
      <CustomTable columns={columns} dataSource={data} />
    </>
  );
};

export default BranchesTab;
