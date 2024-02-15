import React from "react";
import { DatePicker } from "antd";
import styled from "@emotion/styled";
import CalendarIcon from "UI/Icons/CalendarIcon";
const { RangePicker } = DatePicker;

const DatePickerWrap = styled("div")`
  .ant-picker {
    max-width: 260px;
    padding: 12px;
    border-radius: 50px;
    border-color: ${({ theme }) => theme.colorBorderSecondary};
    color: ${({ theme }) => theme.colorPrimaryText};
    font-family: "Inter", sans-serif;
    input {
      font-size: 14px;
      font-weight: 400;
      :placeholder-shown {
        font-family: "Inter", sans-serif;
      }
    }
  }
`;

interface CustomDatePickerInterface {
  picker?: "time" | "date" | "week" | "month" | "quarter" | "year" | undefined,
  disabled?: boolean | undefined,
  passingDate?: (date: { startDate: string, endDate: string }) => void
}


const CustomDatePicker = ({ ...props }: CustomDatePickerInterface) => {
  const { picker, disabled } = props
  const onchange = (date: any, dayString: string[]) => {
    if (typeof props.passingDate !== "undefined") {
      props.passingDate({
        startDate: dayString[0],
        endDate: dayString[1]
      })
    }
  }
  return (
    <DatePickerWrap>
      <RangePicker
        onChange={onchange}
        picker={picker || "date"}
        disabled={disabled || false}
        suffixIcon={<CalendarIcon />}
        separator={<>-</>}
      />
    </DatePickerWrap>
  );
};

export default CustomDatePicker;
