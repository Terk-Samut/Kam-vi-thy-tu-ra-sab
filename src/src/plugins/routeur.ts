import {createRouter, createWebHashHistory, type RouteRecordRaw} from 'vue-router';
import PageAccueil from '/@/vues/PageAccueil.vue';
import PageCompte from '/@/vues/PageCompte.vue';
import PageDonnées from '/@/vues/PageDonnées.vue';
import PageRéseau from '/@/vues/PageRéseau.vue';
import PageSignalements from '/@/vues/PageSignalements.vue';
import {utiliserLangues} from './localisation/localisation.js';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: PageAccueil,
  },
  {
    path: '/compte',
    name: 'Compte',
    component: PageCompte,
  },
  {
    path: encodeURI('/données'),
    name: 'Données',
    component: PageDonnées,
  },
  {
    path: encodeURI('/réseau'),
    name: 'Réseau',
    component: PageRéseau,
  },
  {
    path: '/signalements',
    name: 'Signalements',
    component: PageSignalements,
  },
];

const routeur = createRouter({
  history: createWebHashHistory(),
  routes,
});

routeur.afterEach(to => {
  const {ភាសា} = to.query;
  if (ភាសា && typeof ភាសា === 'string') {
    const {choisirLangues} = utiliserLangues();
    choisirLangues(ភាសា);
  }
});

export default routeur;
