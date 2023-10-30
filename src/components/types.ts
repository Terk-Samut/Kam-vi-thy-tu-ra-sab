import {idColDate, idColLatitude, idColLongitude, idColSalinité} from '../consts';

export type DonnéesSalinité = {
  [idColDate]: number;
  [idColLongitude]: number;
  [idColLatitude]: number;
  [idColSalinité]: number;
};
