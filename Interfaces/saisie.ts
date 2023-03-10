import { DPCOutput, DPCOutputTwo } from "../Helpers/datetoperiodconvert";
import Ponderation from "./ponderation";

export default interface Saisie {
  Enseigne: string;
  "Titre prospectus": string;
  "Date début": string;
  "Date fin": string;
  "Dénomination produit": string;
  "Prix barré": number | string;
  "Prix promo": number;
  "Claim promotionnel": string;
  "Mécanique fidélité": string;
  "Mécanisme carte de fidélité": string;
  EAN: number | string;
  Catégorie: string;
  Segment: string;
  "Sous-segment": string;
  "Dénomination OHC_interm.": string;
  "Libellé Fichier Prospectus": string;
  "CHECK Catégorie / Segment": number;
  undefined: string;
  check: number;
}

export interface SaisieEnrichedOne {
  Enseigne: string;
  "Titre prospectus": string;
  "Date début": string;
  "Date fin": string;
  "Dénomination produit": string;
  "Prix barré": number | string;
  "Prix promo": number;
  "Claim promotionnel": string;
  "Mécanique fidélité": string;
  "Mécanisme carte de fidélité": string;
  EAN: number | string;
  Catégorie: string;
  Segment: string;
  "Sous-segment": string;
  "Dénomination OHC_interm.": string;
  "Libellé Fichier Prospectus": string;
  "CHECK Catégorie / Segment": number;
  undefined: string;
  check: number;
  dateEvalOne?: DPCOutput[];
  dateEvalTwo?: DPCOutputTwo[];
}

export interface SaisieEnrichedTwo {
  Enseigne: string;
  "Titre prospectus": string;
  "Date début": string;
  "Date fin": string;
  "Dénomination produit": string;
  "Prix barré": number | string;
  "Prix promo": number;
  "Claim promotionnel": string;
  "Mécanique fidélité": string;
  "Mécanisme carte de fidélité": string;
  EAN: number | string;
  Catégorie: string;
  Segment: string;
  "Sous-segment": string;
  "Dénomination OHC_interm.": string;
  "Libellé Fichier Prospectus": string;
  "CHECK Catégorie / Segment": number;
  undefined: string;
  check: number;
  dateEvalOne?: DPCOutput[];
  dateEvalTwo?: DPCOutputTwo[];
  ponderation: Ponderation;
}
