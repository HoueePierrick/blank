import Saisie, {
  SaisieEnrichedOne,
  SaisieEnrichedTwo,
} from "../Interfaces/saisie";
import Ponderation from "../Interfaces/ponderation";
import DatePeriodConverter from "../Helpers/datetoperiodconvert.js";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const saisie: Saisie[] =
  require("../Results/2023-3-8/full/SAISIE BRUTE-full.json")["SAISIE BRUTE"];
const ponderation: Ponderation[] =
  require("../Results/2023-3-8/full/PONDERATION ENSEIGNES-full.json")[
    "PONDERATION ENSEIGNES"
  ];

const enrichedSaisieOne: SaisieEnrichedOne[] = DatePeriodConverter(saisie);

export default function ponderationProxim(
  saisie: SaisieEnrichedOne[],
  ponderation: Ponderation[]
): SaisieEnrichedTwo[] {
  let result: SaisieEnrichedTwo[] = [];
  // To isolate elements that haven't been matched in ponderation
  let adverseResult: SaisieEnrichedOne[] = [];
  for (let i = 0; i < saisie.length; i++) {
    let matched = 0;
    for (let j = 0; j < ponderation.length; j++) {
      if (saisie[i].Enseigne === ponderation[j].Enseigne) {
        const toBePushed: SaisieEnrichedTwo = {
          ...saisie[i],
          ponderation: ponderation[j],
        };
        result.push(toBePushed);
        matched = 1;
      }
    }
    if (matched === 0) {
      adverseResult.push(saisie[i]);
    }
  }
  // console.log(adverseResult.length);
  // console.log(saisie.length);
  // console.log(result.length);
  return result;
}

ponderationProxim(enrichedSaisieOne, ponderation);
