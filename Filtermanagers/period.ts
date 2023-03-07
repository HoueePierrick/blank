import Saisie from "../Interfaces/saisie";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const saisie: Saisie[] =
  require("../Results/2023-3-7/full/SAISIE BRUTE-full.json")["SAISIE BRUTE"];

// Function for the period filter
// Input is any of these values
const possibleInputs = [
  "Past Month",
  "Past 3 Months",
  "Past 6 Months",
  "Past 12 Months",
  "Year to Date",
];
// Result is
interface PeriodFilterResult {
  startDate: { year: number; month: number; day: number };
  monthsArray: { year: number; month: number }[];
}

export default function PeriodFilter(period: string): PeriodFilterResult {
  const allDates: Date[] = [];
  for (let i = 0; i < saisie.length; i++) {
    const toBePushed = new Date(saisie[i]["Date fin"]);
    allDates.push(toBePushed);
  }
  let maxYear = 0;
  let maxMonth = 0;
  let maxDay = 0;
  for (let i = 0; i < allDates.length; i++) {
    const elYear = allDates[i].getUTCFullYear();
    const elMonth = allDates[i].getMonth() + 1;
    const elDay = allDates[i].getDate();
    if (elYear > maxYear) {
      maxYear = elYear;
      maxMonth = elMonth;
      maxDay = elDay;
    }
    if (elYear === maxYear && elMonth > maxMonth) {
      maxMonth = elMonth;
      maxDay = elDay;
    } else if (elYear === maxYear && elMonth === maxMonth && elDay > maxDay) {
      maxDay = elDay;
    }
  }
  let lastYear = 1;
  let lastMonth = 1;
  if (maxMonth === 1) {
    lastMonth = 12;
    lastYear = maxYear - 1;
  } else {
    lastMonth = maxMonth - 1;
    lastYear = maxYear;
  }
  const latestPeriod = { year: lastYear, month: lastMonth };
  const conversion: { [index: string]: any } = {
    "Past Month": { year: latestPeriod.year, month: latestPeriod.month },
    "Past 3 Months":
      latestPeriod.month <= 2
        ? { year: latestPeriod.year - 1, month: latestPeriod.month - 2 + 12 }
        : { year: latestPeriod.year, month: latestPeriod.month - 2 },
    "Past 6 Months":
      latestPeriod.month <= 5
        ? { year: latestPeriod.year - 1, month: latestPeriod.month - 5 + 12 }
        : { year: latestPeriod.year, month: latestPeriod.month - 5 },
    "Past 12 Months":
      latestPeriod.month === 1
        ? { year: latestPeriod.year - 2, month: 12 }
        : { year: latestPeriod.year - 1, month: latestPeriod.month - 1 },
    "Year to Date": {
      year: latestPeriod.year,
      month: 1,
    },
  };
  let monthsArray: { year: number; month: number }[] = [];
  for (let i = conversion[period].year; i <= latestPeriod.year; i++) {
    let startMonth = 1;
    let endMonth = 12;
    if (i === conversion[period].year) {
      startMonth = conversion[period].month;
    }
    if (i === latestPeriod.year) {
      endMonth = latestPeriod.month;
    }
    for (let j = startMonth; j <= endMonth; j++) {
      monthsArray.push({ year: i, month: j });
    }
  }
  let result = {
    startDate: {
      year: conversion[period].year,
      month: conversion[period].month,
      day: 1,
    },
    monthsArray,
  };
  console.log(result);
  return result;
}

// PeriodFilter("Past Month");
