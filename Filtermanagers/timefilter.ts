// import DatePeriodConverter from "../Filtermanagers/datetoperiodconvert.js";
import Saisie, { SaisieEnrichedTwo } from "../Interfaces/saisie";
import { DPCOutputTwo } from "../Helpers/datetoperiodconvert";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
// const require = createRequire(import.meta.url); // construct the require method
// const saisie: Saisie[] =
//   require("../Results/2023-3-8/full/SAISIE BRUTE-full.json")["SAISIE BRUTE"];

export default function timefilter(
  saisie: SaisieEnrichedTwo[],
  months?: DPCOutputTwo[]
): SaisieEnrichedTwo[] {
  let fileredSaisie: SaisieEnrichedTwo[] = [];
  for (let i = 0; i < saisie.length; i++) {
    for (let j = 0; j < months!.length; j++) {
      for (let k = 0; k < saisie[i]!.dateEvalTwo!.length; k++) {
        if (
          saisie[i]!.dateEvalTwo![k].year === months![j].year &&
          saisie[i]!.dateEvalTwo![k].month === months![j].month
        ) {
          let toBePushed = saisie[i];
          if (!fileredSaisie.includes(toBePushed)) {
            fileredSaisie.push(toBePushed);
          }
        }
      }
    }
  }
  //   console.log(fileredSaisie.length);
  return fileredSaisie;
}

// timefilter("Past 12 Months");
