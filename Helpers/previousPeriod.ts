import { DPCOutputTwo } from "./datetoperiodconvert";
import { stringPeriod } from "../Filtermanagers/period";

const possibleInputs: stringPeriod[] = [
  "Past Month",
  "Past 3 Months",
  "Past 6 Months",
  "Past 12 Months",
  "Year to Date",
];

const example: DPCOutputTwo[] = [
  { year: 2023, month: 2 },
  { year: 2023, month: 1 },
  { year: 2022, month: 12 },
];

export default function previousPeriod(
  comparison: stringPeriod,
  months: DPCOutputTwo[]
): DPCOutputTwo[] {
  let equivalences: { [index: string]: number } = {
    "Past Month": 1,
    "Past 3 Months": 3,
    "Past 6 Months": 6,
    "Past 12 Months": 12,
  };
  const equivalence = equivalences[comparison];
  let result: DPCOutputTwo[] = [];
  for (let i = 0; i < months.length; i++) {
    let toBePushed: DPCOutputTwo = { year: 0, month: 0 };
    if (!equivalence) {
      console.log("This time period is impossible");
      return [];
    } else if (months[i].month <= equivalence) {
      toBePushed.year = months[i].year - 1;
      toBePushed.month = months[i].month - equivalence + 12;
    } else {
      toBePushed.year = months[i].year;
      toBePushed.month = months[i].month - equivalence;
    }
    result.push(toBePushed);
  }
  return result;
}

// for (let i = 0; i < possibleInputs.length; i++) {
//   console.log(previousPeriod(possibleInputs[i], example));
// }
