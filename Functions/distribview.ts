import todayTomorrow from "../Helpers/tomorrow";
import PeriodFilter from "../Filtermanagers/period";
import Saisie from "../Interfaces/saisie";
import Ponderation from "../Interfaces/ponderation";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
// import saisie from "../Result/2023-1-2/first-thousand/SAISIE BRUTE-first-thousand.json" assert { type: "json" };
// const saisie = require("../Result/2023-1-2/first-thousand/SAISIE BRUTE-first-thousand.json");
const saisie: Saisie[] =
  require("../Results/2023-3-7/full/SAISIE BRUTE-full.json")["SAISIE BRUTE"];

const test = {
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
};

// console.log(saisie.length);
interface distribViewOutputResult {
  sellerName: string;
  offersCountNow: {
    total: number;
    offers: number;
    leaflet: number;
  };
  offersEvolutionCount: number;
}

interface distribViewOutput {
  parapharmacy: distribViewOutputResult[];
  grouping: distribViewOutputResult[];
}

function distribView(period: string, months: string[]) {}
