import Saisie, {
  SaisieEnrichedOne,
  SaisieEnrichedTwo,
} from "../Interfaces/saisie";
import Ponderation from "../Interfaces/ponderation";
import DatePeriodConverter from "./datetoperiodconvert.js";
import ponderationProxim from "./ponderationProxim.js";
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const saisie: Saisie[] =
  require("../Results/2023-3-8/full/SAISIE BRUTE-full.json")["SAISIE BRUTE"];
const ponderation: Ponderation[] =
  require("../Results/2023-3-8/full/PONDERATION ENSEIGNES-full.json")[
    "PONDERATION ENSEIGNES"
  ];

const enrichedSaisieOne: SaisieEnrichedOne[] = DatePeriodConverter(saisie);

const enrichedSaisieTwo: SaisieEnrichedTwo[] = ponderationProxim(
  enrichedSaisieOne,
  ponderation
);

export default enrichedSaisieTwo;
