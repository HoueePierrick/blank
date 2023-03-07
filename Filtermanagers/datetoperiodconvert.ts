import MonthsLength from "../Helpers/monthslengths.js";
import Saisie from "../Interfaces/saisie";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const saisie: Saisie[] =
  require("../Results/2023-3-7/full/SAISIE BRUTE-full.json")["SAISIE BRUTE"];

// Input example (part of wider Saisie interface)
const example: Saisie[] = [
  {
    Enseigne: "Giropharm",
    "Titre prospectus": "Offres spéciales",
    "Date début": "2018-01-01T22:59:39.000Z",
    "Date fin": "2018-02-27T22:59:39.000Z",
    "Dénomination produit": "Bion 3 Défense 30 comprimés",
    "Prix barré": "NA",
    "Prix promo": 7.95,
    "Claim promotionnel": "sans claim",
    "Mécanique fidélité": "NA",
    "Mécanisme carte de fidélité": "NA",
    EAN: 3401377618190,
    Catégorie: "Complém. alim. & Huiles ess.",
    Segment: "Vitalité & Vitamines",
    "Sous-segment": "Vitalité",
    "Dénomination OHC_interm.": "BION 3 DEFENSE ADULTES COMPRIME 30",
    "Libellé Fichier Prospectus":
      "02-01-2018_28-02-2018_Giropharm_Offres spéciales",
    "CHECK Catégorie / Segment": 0,
    undefined: "Complém. alim. & Huiles ess.Vitalité & VitaminesVitalité",
    check: 1,
  },
];

// Returns an array (one for each line) containg the array of months covered
interface DPCOutput {
  year: number;
  month: number;
  share: number;
}

function DatePeriodConverter(input: Saisie[]): DPCOutput[][] {
  let dateArray: DPCOutput[][] = [];
  for (let i = 0; i < input.length; i++) {
    const startDate = new Date(input[i]["Date début"]);
    const startYear = startDate.getUTCFullYear();
    const startMonth = startDate.getMonth() + 1;
    const startDay = startDate.getDate();
    const endDate = new Date(input[i]["Date fin"]);
    const endYear = endDate.getUTCFullYear();
    const endMonth = endDate.getMonth() + 1;
    const endDay = endDate.getDate();
    let dateEval: DPCOutput[] = [];
    for (let j = startYear; j <= endYear; j++) {
      let loopStart = 1;
      let loopEnd = 12;
      if (j === startYear) {
        loopStart = startMonth;
      }
      if (j === endYear) {
        loopEnd = endMonth;
      }
      for (let k = loopStart; k <= loopEnd; k++) {
        // Include year and month (sure)
        let PeriodEval: DPCOutput = { year: j, month: k, share: 0 };
        let monthLength = 0;
        if (k === 2 && j % 4 === 0) {
          monthLength = 29;
        } else if (k === 2 && j % 4 !== 0) {
          monthLength = 28;
        } else {
          monthLength = MonthsLength[k];
        }
        let shareStart = 1;
        let shareEnd = monthLength;
        // Case if older start month-year
        if (startYear < j || startMonth < k) {
          shareStart = 1;
        }
        // Case if younger end month-year
        if (endYear > j || endMonth > k) {
          shareEnd = monthLength;
        }
        // Default : same start and end month-year
        if (startYear === j && startMonth === k) {
          shareStart = startDay;
        }
        if (endYear === j && endMonth === k) {
          shareEnd = endDay;
        }
        PeriodEval.share = (shareEnd - shareStart + 1) / monthLength;
        dateEval.push(PeriodEval);
      }
    }
    dateArray.push(dateEval);
  }
  //   console.log(dateArray);
  return dateArray;
}

DatePeriodConverter(saisie);
