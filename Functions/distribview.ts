import PeriodFilter from "../Filtermanagers/period.js";
import timefilter from "../Filtermanagers/timefilter.js";
import { SaisieEnrichedTwo } from "../Interfaces/saisie";
import { DPCOutput, DPCOutputTwo } from "../Helpers/datetoperiodconvert";
import enrichedSaisieTwo from "../Helpers/saisieEnricher.js";
import previousPeriod from "../Helpers/previousPeriod.js";

const months = PeriodFilter("Past 12 Months").monthsArray;

interface distribViewOutputResult {
  sellerName: string;
  oldRecords: SaisieEnrichedTwo[];
  newRecords: SaisieEnrichedTwo[];
  oldLeaflets: string[];
  newLeaflets: string[];
  oldLeafletsCount: number;
  newLeafletsCount: number;
  oldOffersCount: number;
  newOffersCount: number;
  offersEvolution: number;
}

interface finalVOR {
  retailer: distribViewOutputResult[];
  grouping: distribViewOutputResult[];
}

function distribView(
  enrichedSaisieTwo: SaisieEnrichedTwo[],
  months: DPCOutputTwo[]
) {
  let result: finalVOR = { retailer: [], grouping: [] };
  const timeFiltered: SaisieEnrichedTwo[] = timefilter(
    enrichedSaisieTwo,
    months
  );
  // Getting year - 1 months; should be refined
  let oldMonths: DPCOutputTwo[] = previousPeriod("Past 12 Months", months);
  const oldTimeFiltered = timefilter(enrichedSaisieTwo, oldMonths);
  let iteratedOn = [oldTimeFiltered, timeFiltered];
  for (let a = 0; a < iteratedOn.length; a++) {
    for (let i = 0; i < iteratedOn[a].length; i++) {
      let mainCategory: "retailer" | "grouping" = "grouping";
      if (iteratedOn[a][i].ponderation.Typologie === "Enseigne Parapharmacie") {
        mainCategory = "retailer";
      } else {
        mainCategory = "grouping";
      }
      let matched = -1;
      for (let j = 0; j < result[mainCategory].length; j++) {
        if (timeFiltered[i].Enseigne === result[mainCategory][j].sellerName) {
          matched = j;
        }
      }
      if (matched === -1) {
        let toBePushed = {
          sellerName: timeFiltered[i].Enseigne,
          oldRecords: [] as SaisieEnrichedTwo[],
          newRecords: [] as SaisieEnrichedTwo[],
          oldLeaflets: [],
          newLeaflets: [],
          oldLeafletsCount: 0,
          newLeafletsCount: 0,
          oldOffersCount: 0,
          newOffersCount: 0,
          offersEvolution: 0,
        };
        if (a === 0) {
          toBePushed.oldRecords.push(iteratedOn[a][i]);
        } else if (a === 1) {
          toBePushed.newRecords.push(iteratedOn[a][i]);
        }
        result[mainCategory].push(toBePushed);
      } else {
        if (a === 0) {
          result[mainCategory][matched].oldRecords.push(iteratedOn[a][i]);
        } else if (a === 1) {
          result[mainCategory][matched].newRecords.push(iteratedOn[a][i]);
        }
      }
    }
  }
  type objectKeyOne = "retailer" | "grouping";
  type objectKeyTwo = "oldRecords" | "newRecords";
  type objectKeyThree = "oldLeaflets" | "newLeaflets";
  const resultKeys: objectKeyOne[] = ["retailer", "grouping"];
  const recordTypes: objectKeyTwo[] = ["oldRecords", "newRecords"];
  const leafletTypes: objectKeyThree[] = ["oldLeaflets", "newLeaflets"];
  // Running through result type (retailer vs grouping)
  for (let i = 0; i < resultKeys.length; i++) {
    // const resultKey: "retailer" | "grouping" = resultKeys[i]
    // Running through each retailer / grouping
    for (let j = 0; j < result[resultKeys[i]].length; j++) {
      const actorEdited = result[resultKeys[i][j]];
      // result[resultKeys[i][j]] should be edited
      // Running through record type (old vs new)
      for (let k = 0; k < recordTypes.length; k++) {
        // Running through records
        for (let l = 0; l < actorEdited[recordTypes[k]].length; l++) {
          let matchedLeaflet = 0;
          // Running trough retailer / grouping leaflets
          const leafletsLookedAt = actorEdited[leafletTypes[k]];
          for (let m = 0; m < leafletsLookedAt.length; m++) {
            if (
              leafletsLookedAt[m] ===
              actorEdited[recordTypes[k]][l]["Titre prospectus"]
            ) {
              matchedLeaflet = 1;
            }
          }
          if (matchedLeaflet === 0) {
            leafletsLookedAt.push(
              actorEdited[recordTypes[k]][l]["Titre prospectus"]
            );
          }
        }
      }
      actorEdited.oldLeafletsCount = actorEdited.oldLeaflets.length;
      actorEdited.newLeafletsCount = actorEdited.newLeaflets.length;
      actorEdited.oldOffersCount = actorEdited.oldRecords.length;
      actorEdited.newOffersCount = actorEdited.newRecords.length;
      actorEdited.offersEvolution =
        actorEdited.newOffersCount - actorEdited.oldOffersCount;
    }
  }

  return result;
}

distribView(enrichedSaisieTwo, months);
