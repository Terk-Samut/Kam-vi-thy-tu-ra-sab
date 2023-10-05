import type { bds } from "@constl/ipa";

// Infos de projet
export const URL_SIGNALEMENTS = 'https://github.com/Terk-Samut/Kam-vi-thy-tu-ra-sab/issues';
export const COURRIEL_SIGNALEMENTS = 'julien.malard@mail.mcgill.ca';

// Limite taille image profil
export const MAX_TAILLE_IMAGE = 500 * 1000; // 500 kilooctets

// Structure de données
export const idNuée = "";
export const idVariableDate = "";
export const idVariableLong = "";
export const idVariableLat = "";
export const idVariableSal = "";
export const idColDate = "date"
export const idColLongitude = "longitude"
export const idColLatitude = "latitude"
export const idColSalinité = "salinité"
export const clefTableau = "TABLEAU PRINCIPAL"
export const schémaDonnées: bds.schémaSpécificationBd = {
  licence: "ODbl-1_0",
  licenceContenu: "CC BY-SA",
  motsClefs: [],
  nuées: [idNuée],
  tableaux: [
    {
      cols: [
        {
          idVariable: idVariableDate,
          idColonne: idColDate,
          index: true,
        },
        {
          idVariable: idVariableLong,
          idColonne: idColLongitude,
          index: true,
        },
        {
          idVariable: idVariableLat,
          idColonne: idColLatitude,
          index: true,
        },
        {
          idVariable: idVariableSal,
          idColonne: idColSalinité,
          index: false,
        }
      ],
      clef: clefTableau
  }
  ],
}


