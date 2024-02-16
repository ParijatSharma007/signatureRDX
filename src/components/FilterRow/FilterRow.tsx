import CustomButtonPrimary from "UI/CustomButton/CustomButtonPrimary";
import CustomDatePicker from "UI/CustomDateRangePicker/CustomDatePicker";
import CustomTag from "UI/CustomTag/CustomTag";
import AddIcon from "UI/Icons/AddIcon";
import Downloadicon from "UI/Icons/Downloadicon";
import FilterIcon from "UI/Icons/FilterIcon";
import Searchicon from "UI/Icons/Searchicon";
import XIcon from "UI/Icons/XIcon";
import { Button, Checkbox, Flex, Input, Popover, Typography } from "antd";
import { useState } from "react";

import { FilterRowWrapper } from "styles/StyledComponents/FilterRowWrapper";

interface FilterRowprops {
  title?: string;
  hidesearch?: boolean;
  hidefilter?: boolean;
  hideDatePicker?: boolean;
  showDownloadButton?: boolean;
  showAddButton?: boolean;
  hideCheckbox?: boolean;
  passingDates?: any
  passingInput?: (s: { [key: string]: string }) => void,
  passingCheckedFillters?: (s: any) => void,
  urlOrderId?: string,
  urlPrescriptionId?: string,
  defaultStartDate?: string | null,
  defaultEndDate?: string | null
}

interface CheckState {
  all: boolean,
  collected: boolean,
  rejected: boolean
}

const PopoverContent = ({ passingCheckedFillters }: { passingCheckedFillters: (e: CheckState) => void }) => {

  const [checkState, setCheckState] = useState<CheckState>({
    all: false,
    collected: false,
    rejected: false
  })

  const handleCheckedFillters = (field: string, checked: boolean) => {
    setCheckState({
      ...checkState,
      [field]: checked
    })
    passingCheckedFillters(checkState)
  }

  return (
    <ul className="popover-list">
      <li>
        <Checkbox value={'all'}
          onChange={e => handleCheckedFillters(e.target.value, e.target.checked)}>All</Checkbox>{" "}
        <Button type="link" icon={<XIcon />}>
          Clear All
        </Button>
      </li>
      <li>
        <Checkbox value={'collected'}
          onChange={e => handleCheckedFillters(e.target.value, e.target.checked)}>Collected</Checkbox>
      </li>
      <li>
        <Checkbox value={'rejected'}
          onChange={e => handleCheckedFillters(e.target.value, e.target.checked)}>Rejected</Checkbox>
      </li>
    </ul>
  );
};
const FilterRow = ({
  title,
  hidesearch,
  hidefilter,
  hideDatePicker,
  showDownloadButton,
  showAddButton,
  hideCheckbox,
  passingDates,
  passingInput,
  passingCheckedFillters,
  urlPrescriptionId,
  urlOrderId,
  defaultStartDate,
  defaultEndDate
}: FilterRowprops) => {
  const [checkedFilterValues, setCheckedFilterValues] = useState({
    isOpen: false,
    all: false,
    collected: false,
    rejected: false
  })
  const passingDate = (value: { startDate: string, endDate: string }) => {
    if (typeof passingDate !== "undefined") {
      passingDates(value)
    }
  }

  if (passingCheckedFillters) passingCheckedFillters(checkedFilterValues)

  return (
    <FilterRowWrapper>
      <Flex justify="space-between" align="center">
        {title && <Typography.Title level={4}>{title}</Typography.Title>}
        {!hideDatePicker && <CustomDatePicker
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
          passingDate={passingDate} />}
        <Flex>
          {"...."}
          {!hidesearch && (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Input
                size="large"
                placeholder="#prescriptionId"
                className="searchbar"
                prefix={<Searchicon />}
                value={urlPrescriptionId}
                onChange={(e) => { if (typeof passingInput !== 'undefined') passingInput({ prescriptionId: e.target.value }) }}
              />
              <Input
                size="large"
                placeholder="#orderId"
                className="searchbar"
                prefix={<Searchicon />}
                value={urlOrderId}
                onChange={(e) => { if (typeof passingInput !== 'undefined') passingInput({ orderNumber: e.target.value }) }}
              />
              {/* <Input
                size="large"
                placeholder="#"
                className="searchbar"
                prefix={<Searchicon />}
                onChange={(e) => { if (typeof passingInput !== 'undefined') passingInput(e.target.value) }}
              /> */}
            </div>
          )}
          {!hidefilter && (
            <Popover
              placement="bottomLeft"
              content={<PopoverContent passingCheckedFillters={(checkedVales) => { setCheckedFilterValues({ ...checkedFilterValues, ...checkedVales }) }} />}
              arrow={false}
              onOpenChange={(e) => { setCheckedFilterValues({ ...checkedFilterValues, isOpen: e }) }}
            >
              <Button className="filter">
                Filters
                <i>
                  <FilterIcon />
                </i>
              </Button>
            </Popover>
          )}
          {showAddButton && (
            <CustomButtonPrimary
              type="primary"
              icon={
                <AddIcon
                  color="#fff"
                  width={11}
                  height={11}
                  className="whitePlus"
                />
              }
            >
              Add Medication{" "}
            </CustomButtonPrimary>
          )}
          {showDownloadButton && (
            <CustomButtonPrimary type="link" icon={<Downloadicon />}>
              Download Report{" "}
            </CustomButtonPrimary>
          )}
        </Flex>

        {!hideCheckbox ? (
          <Flex>
            <Checkbox>Show only</Checkbox>
            <CustomTag color="processing" text="Approval Pending"></CustomTag>
          </Flex>
        ) : (
          ""
        )}
      </Flex>
    </FilterRowWrapper>
  );
};

export default FilterRow;
