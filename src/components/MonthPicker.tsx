'use client';

import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface MonthPickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
  <div className="w-full">
    <input
      type="text"
      ref={ref}
      onClick={onClick}
      value={value}
      readOnly
      className="w-full border px-4 py-2 rounded text-black"
    />
  </div>
));
CustomInput.displayName = 'CustomInput';

export default function MonthPicker({ value, onChange }: MonthPickerProps) {
  return (
    <div className="w-full">
      <DatePicker
        selected={value}
        onChange={(date: Date | null) => {
          if (date) onChange(date);
        }}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        customInput={<CustomInput />}
        wrapperClassName="w-full"
      />
    </div>
  );
}
