import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";

const options = { year: "numeric", month: "short", day: "numeric" };

const DateFilter = ({
  defaultChoosenDate,
  selectedDate,
  onSelect,
  selectedColor,
  icon: Icon,
}) => {
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [choosenValue, setChoosenValue] = useState(defaultChoosenDate);

  useEffect(() => {
    if (selectedDate) {
      setChoosenValue(
        new Date(selectedDate).toLocaleDateString(undefined, options)
      );
    }
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectDate = ({ date, value }) => {
    setChoosenValue(date);
    onSelect({ date, value })
    setIsOpen(false);
  };

  return (
    <div className="relative z-30">
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="border-2 rounded-full text-gray-600 py-2 px-6 flex w-58 items-center gap-2 bg-white"
      >
        <span>
          <Icon />
        </span>
        {choosenValue || "Select Date"}
      </button>

      {isOpen && (
        <div
          ref={modalRef}
          className="absolute right-0 mt-2 bg-white border rounded shadow-lg p-4 flex"
        >
          <div
            className={`opacity-100
              
            `}
          >
            <DatePicker
              selected={selectedDate}
              onChange={(dates) => {
                const choosenString = `${new Date(dates).toLocaleDateString(
                    undefined,
                    options
                  )}`;
                handleSelectDate({
                  date: choosenString,
                  value: dates,
                });
              }}
              inline
              className={`bg-white border rounded p-2`}
              calendarClassName="custom-datepicker"
            />
          </div>
        </div>
      )}

      <style>
        {`
        .custom-datepicker .react-datepicker__day--selected,
        .custom-datepicker .react-datepicker__day--in-range,
        .custom-datepicker .react-datepicker__day--keyboard-selected {
            background-color: ${selectedColor} !important;
            color: white !important;
        }

        .custom-datepicker .react-datepicker__day--selected,
        .custom-datepicker .react-datepicker__day--range-start,
        .custom-datepicker .react-datepicker__day--range-end {
            background-color: ${selectedColor} !important;
            color: white !important;
            border-radius: 6px !important;
            font-weight: bold;
        }

        .custom-datepicker .react-datepicker__day--in-range {
            background-color: ${selectedColor} !important;
        }

        .custom-datepicker .react-datepicker__day--in-selecting-range {
            background-color: ${selectedColor}d3 !important;
        }

        .custom-datepicker .react-datepicker__day:hover {
            background-color: ${selectedColor} !important;
            color: white !important;
        }

      `}
      </style>
    </div>
  );
};

DateFilter.defaultProps = {
  defaultChoosenDate:"Today",
  selectedDate: null, // Default to null if no startDate is provided
  onSelect: () => {}, // Prevents "onSelect is not a function" error
  selectedColor: "#9D55FF",
  icon: IoCalendarOutline,
};

export default DateFilter;
