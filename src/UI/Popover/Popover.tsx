import React, { useState } from 'react';
// import './index.css';
import { Button, Flex, Popover } from 'antd'
// import InfoIcon from 'UI/Icons/InfoIcon';
import { InfoOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const PopOver = ({ startedAt, updatedAt }: { startedAt: string, updatedAt: string }) => {
    const [dates] = useState({
        dateStartedAt: dayjs(startedAt).format("YYYY/MM/DD"),
        dateUpdatedAt: dayjs(updatedAt).format("YYYY/MM/DD")
    })
    const content = (
        <Flex vertical align='middle'>
            <p>Strated at : {dates.dateStartedAt}</p>
            <p>Updated at : {dates.dateUpdatedAt}</p>
        </Flex>
    )
    return (<Popover
        content={content}
        title="Order Details">
        <Button type="primary" shape="circle">
            <InfoOutlined />
        </Button>
    </Popover>)
};

export default PopOver;