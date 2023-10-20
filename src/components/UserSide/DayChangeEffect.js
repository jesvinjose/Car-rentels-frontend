import { useEffect } from "react";


const DayChangeEffect = ({ currentDate, returnDate, setNumDays }) => {
    useEffect(() => {
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
  
      const returnDay = returnDate.getDate();
      const returnMonth = returnDate.getMonth();
      const returnYear = returnDate.getFullYear();
  
      const isDayChanged = currentDay !== returnDay;
      const isMonthChanged = currentMonth !== returnMonth;
      const isYearChanged = currentYear !== returnYear;
  
      if (isDayChanged || isMonthChanged || isYearChanged) {
        const differenceInTime = currentDate - returnDate;
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        setNumDays(differenceInDays);
      }
    }, [currentDate, returnDate, setNumDays]);
  
    return null;
  };
  
  export default DayChangeEffect;