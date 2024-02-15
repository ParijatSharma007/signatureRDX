import CustomButtonPrimary from "UI/CustomButton/CustomButtonPrimary";
import CustomTable, { TableHeader } from "UI/CustomTable/CustomTable";
import CustomTag from "UI/CustomTag/CustomTag";
import CircleCheck from "UI/Icons/CircleCheck";
import CircleCross from "UI/Icons/CircleCross";
import { Avatar, Button, Flex, Space } from "antd";

import { ColumnsType } from "antd/es/table";
import FilterRow from "components/FilterRow/FilterRow";
import assets from "json/assets";
import { Link } from "react-router-dom";
import { PharmacytabWrapper } from "styles/StyledComponents/PharmacytabWrapper";

const PharmacyTab = () => {
  interface DataType {
    key: string;
    pharmacy: string;
    status: "active" | "inactive" | "pending";
    branches: number;
    actions: string;
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
      width: 282,
    },
    {
      title: <TableHeader title="Status" sort />,
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          <CustomTag
            color={
              status === "active"
                ? "success"
                : status === "pending"
                  ? "processing"
                  : "default"
            }
            text={
              status === "active"
                ? "Active"
                : status === "pending"
                  ? "Approval Pending"
                  : "Inactive"
            }
          />
        </>
      ),
      sorter: true,
      width: 282,
    },
    {
      title: <TableHeader title="# branches" sort />,
      dataIndex: "branches",
      key: "branches",
      sorter: true,
      render: (branches) => <>{branches > 0 ? branches : "-"}</>,
      align: "end",
      width: 282,
    },

    {
      title: "Action",
      key: "action",
      render: (status: DataType) => (
        <Flex justify="end" gap={4}>
          {status.status === "pending" && (
            <Space>
              <Button type="text" icon={<CircleCheck />} />
              <Button type="text" icon={<CircleCross />} />
            </Space>
          )}
          <CustomButtonPrimary type="link">View Report</CustomButtonPrimary>
        </Flex>
      ),
      align: "end",
      width: 282,
    },
  ];
  const data: DataType[] = [
    {
      key: "1",
      pharmacy: "Spinal Health ",
      status: "active",
      branches: 1,
      actions: "active",
      Pharmaimg: assets.pharmaLogo,
    },
    {
      key: "1",
      pharmacy: "Bright Side",
      status: "active",
      branches: 1,
      actions: "active",
      Pharmaimg: assets.pharmaLogo,
    },
    {
      key: "1",
      pharmacy: "Bright Side",
      status: "active",
      branches: 1,
      actions: "active",
      Pharmaimg: assets.pharmaLogo,
    },
    {
      key: "1",
      pharmacy: "John Brown",
      status: "inactive",
      branches: 1,
      actions: "inactive",
      Pharmaimg: assets.pharmaLogo,
    },
    {
      key: "1",
      pharmacy: "John Brown",
      status: "active",
      branches: 0,
      actions: "active",
      Pharmaimg: assets.pharmaLogo,
    },
    {
      key: "1",
      pharmacy: "John Brown",
      status: "pending",
      branches: 0,
      actions: "active",
      Pharmaimg: assets.pharmaLogo,
    },
  ];

  return (
    <PharmacytabWrapper>
      <FilterRow hideDatePicker />
      <CustomTable columns={columns} dataSource={data} />
    </PharmacytabWrapper>
  );
};

export default PharmacyTab;
