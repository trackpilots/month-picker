import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";

const options = {
  year: "numeric",
  month: "long",
};

const DateFilter = ({
  selectedDate,
  onSelect,
  selectedColor,
  icon: Icon,
}) => {
  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [choosenValue, setChoosenValue] = useState();

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

  const handleSelectDate = ({ month, value }) => {
    setChoosenValue(month);
    onSelect({ month, value });
    setIsOpen(false);
  };

  // Custom Render for Month Content
  const renderMonthContent = (month, shortMonth, longMonth, day) => {
    const fullYear = new Date(day).getFullYear();
    const tooltipText = `Selected Month: ${longMonth} ${fullYear}`;
    return <span title={tooltipText}>{shortMonth}</span>;
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
              inline
              selected={selectedDate}
              onChange={(dates) => {
                const choosenString = new Date(dates).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                  }
                );
                handleSelectDate({
                  month: choosenString,
                  value: dates,
                });
              }}
              renderMonthContent={renderMonthContent}
              showMonthYearPicker
              dateFormat="MMMM yyyy"
              className={`bg-white border rounded p-2`}
              calendarClassName="custom-month-picker"
            />
          </div>
        </div>
      )}

      <style>
        {`

      .custom-month-picker .react-datepicker__month-wrapper {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;
      }


        .custom-month-picker .react-datepicker__month-text {
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .custom-month-picker .react-datepicker__month-text--selected,
        .custom-month-picker .react-datepicker__month-text--keyboard-selected {
          background-color:${selectedColor};  /* Change this to your preferred color */
          color: white;
        }

        .custom-month-picker .react-datepicker__month-text:hover {
          background-color:${selectedColor}; 
          color: white;
        }
      `}
      </style>
    </div>
  );
};

DateFilter.defaultProps = {
  selectedDate: null, // Default to null if no startDate is provided
  onSelect: () => {}, // Prevents "onSelect is not a function" error
  selectedColor: "#9D55FF",
  icon: IoCalendarOutline,
};

export default DateFilter;
