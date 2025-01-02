import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
interface DateTimePickerComponentProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  height?: string;
}

const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({
  label,
  value,
  onChange,
  height = "100%", // Default width if not provided
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null} // Convert JS Date to Dayjs if value exists
        onChange={(date: Dayjs | null) => onChange(date?.toDate() || null)} // Convert Dayjs back to JS Date
        slotProps={{
          textField: { fullWidth: true, style: { height } },
        }}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerComponent;
