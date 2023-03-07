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
