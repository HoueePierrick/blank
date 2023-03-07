// Function converting a date to tomorrow

const monthsLength = [
  { month: 1, length: 31 },
  { month: 2, length: 0 },
  { month: 3, length: 31 },
  { month: 4, length: 30 },
  { month: 5, length: 31 },
  { month: 6, length: 30 },
  { month: 7, length: 31 },
  { month: 8, length: 31 },
  { month: 9, length: 30 },
  { month: 10, length: 31 },
  { month: 11, length: 30 },
  { month: 12, length: 31 },
];

function todayTomorrow(date: Date) {
  let today = {
    Year: date.getFullYear(),
    Month: date.getMonth() + 1,
    Date: date.getDate(),
    YearType: "",
    MonthLength: 0,
  };
  if (today.Year % 4 === 0) {
    today.YearType = "leap";
  } else {
    today.YearType = "normal";
  }
  if (today.Month !== 2) {
    today.MonthLength = monthsLength[today.Month - 1].length;
  } else if (today.YearType === "leap") {
    today.MonthLength = 29;
  } else {
    today.MonthLength = 28;
  }
  const tomorrow = {
    Year: 0,
    Month: 0,
    Date: 0,
  };
  if (today.Date === today.MonthLength) {
    tomorrow.Month = 1;
    tomorrow.Date = 1;
    if (today.Month === 12) {
      tomorrow.Year = today.Year + 1;
    } else {
      tomorrow.Year = today.Year;
    }
  } else {
    tomorrow.Date = today.Date + 1;
    tomorrow.Month = today.Month;
    tomorrow.Year = today.Year;
  }
  return { today, tomorrow };
}

export default todayTomorrow;
