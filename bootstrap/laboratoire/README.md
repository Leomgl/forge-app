# LABORATOIRE V0.1.0 — première PWA expérimentale

**Statut :** bootstrap isolé de FORGE dans la branche `bootstrap/laboratoire-v0-1`. Ce répertoire n'est **pas inclus dans le code de production FORGE**. Il pourra être transféré tel quel vers le futur dépôt dédié `Leomgl/laboratoire-app`.

## Fonction

Carnet de feuilles d'essai, où tester les composants de la bibliothèque BLOCKS avant de les intégrer à de nouvelles apps métier.

- Feuille 01 **Structure** : app shell partagé, navigation iPhone, démonstration de deux thèmes (Graphite / Papier).
- Feuille 02 **Réglages** : page partagée avec version, catégories extensibles, recherche et mise à jour SW, en deux contextes fictifs.
- Bibliothèque réelle dans `blocks/theme.mjs`, `blocks/shell.mjs`, `blocks/settings.mjs`.
- Pas de D1, pas d'authentification, pas d'envoi Push, pas d'interaction LINK. Uniquement les thèmes sont enregistrés en `localStorage`.

## Développement / tests

```sh
node scripts/build.mjs
node tests/smoke.mjs
```

`scripts/build.mjs` compile les sources de cette arborescence en un unique `dist/worker.mjs` auto-contenu, installable directement comme Worker Cloudflare sans aucune variable/binding.

Routes PWA : `/`, `/app.mjs`, `/styles.css`, `/blocks/*.mjs`, `/sw.js`, `/icon.svg`, `/manifest.webmanifest`.

Pour une modification : actualiser la version dans app, SW, README, thème manifest si nécessaire ; reconstruire ; tester ; déployer Worker indépendant ; consigner le compte rendu dans FORGE [#43](https://github.com/Leomgl/forge-app/issues/43) et [#44](https://github.com/Leomgl/forge-app/issues/44). **Ne pas fusionner cette branche dans `forge-app/main`** : elle sert seulement de dépôt provisoire.

## Recette iPhone

1. Ouvrir l'URL HTTPS du Worker Safari et installer à l'écran d'accueil.
2. Tester Feuilles → Structure → Réglages et le retour via barre de navigation.
3. Dans Structure, basculer Graphite et Papier ; vérifier contrastes et persistance après réouverture.
4. Dans Réglages, changer les deux contextes et vérifier que les catégories suivent sans changer la structure.
5. Tester la recherche des réglages et « À propos » → Rechercher une mise à jour.
6. Vérifier hors ligne après un premier chargement ; confirmer qu'aucune notification iOS n'est demandée par cette PWA.

Une CI verte ne prouve pas la compatibilité iPhone. Ce test doit être confirmé par l'utilisateur.
