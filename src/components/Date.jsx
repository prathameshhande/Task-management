import { DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";

const { RangePicker } = DatePicker;

function Date() {
  // State to store selected dates
  const [dates, setDates] = useState([]);

  // Event handler for date range selection
  const handleDateChange = (values) => {
    // Format selected dates using Moment.js
    const formattedDates = values.map((date) =>
      moment(date).format("YYYY-MM-DD")
    );
    // Update state with formatted dates
    setDates(formattedDates);
  };

  return (
    <div style={{ margin: 20 }}>
      <RangePicker
        onChange={handleDateChange} // Event handler for date range selection
      />
      {/* Display selected dates */}
      <div style={{ marginTop: 10 }}>
        Selected Dates:{" "}
        {dates.map((date) => (
          <span key={date}>{date}</span>
        ))}
      </div>
    </div>
  );
}

export default Date;
