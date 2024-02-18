import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

export const InfoAll = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};
