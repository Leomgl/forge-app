# LABORATOIRE — première PWA de la nouvelle génération

**Validation produit :** l'utilisateur a décidé de construire en premier une PWA « Laboratoire », conçue comme une pile de feuilles vierges pour dessiner, tester et valider les blocs communs. Elle **n'est pas** une app métier définitive. Tickets : [#43](https://github.com/Leomgl/forge-app/issues/43) / [#44](https://github.com/Leomgl/forge-app/issues/44).

## Livré — V0.1.1 (15/11/2026, migration définitive)

- **URL** : https://laboratoire-app.q9pfwtztsc.workers.dev/ ; Worker Cloudflare indépendant `laboratoire-app`, 100 % du trafic, `workers.dev` activé.
- **Deux feuilles déjà implémentées** : Shell + Réglages et deux thèmes Graphite/Papier. Modules ESM `theme.mjs`, `shell.mjs`, `settings.mjs` partagés avec de vrais imports.
- **GitHub officiels :** [laboratoire-app](https://github.com/Leomgl/laboratoire-app) (`main`, PWA/build/test) et [blocks-app](https://github.com/Leomgl/blocks-app) (`main`, composants + CSS). L'ancien bootstrap FORGE est figé en archive, ne plus y développer.
- **Validation :** CI `blocks-app` et `laboratoire-app` vertes, tests Node sur modules et bundle Worker (10 assets), CSP, offline, versionnement et HTTP. La V0.1.0 a été testée et appréciée sur iPhone par l'utilisateur, **V0.1.1 doit être revalidée** après extraction du CSS commun.
- **Isolation** : aucun binding, D1, moteur Push ou contrat LINK actif.

## Expérience

Accueil = carnet de feuilles. Une feuille = une expérience indépendante : nom du bloc, état (brouillon, essai, validé), zone de démonstration, variantes de thème, panneau de réglages et fiche de recette. On passe à la feuille suivante sans imposer une grosse navigation.

**Feuille 01 — Shell** : en-tête, navigation, actions contextuelles, état vide et vue mobile; switch immédiat entre deux directions graphiques distinctes. Aucune logique métier.

**Feuille 02 — Réglages** : sections communes Version/À propos/Mise à jour/Confidentialité et sections injectées spécifiques au produit. Faire la preuve de l'adaptation à deux apps fictives.

**Feuille 03 — Me notifier** (après les deux précédentes) : un seul bloc affiché en modes rendez-vous et stock/fin de pass ; sortie objet de configuration sans émettre de Web Push. Test LINK seulement ensuite via environnement autorisé.

## Architecture minimale

- PWA HTTPS installable : `manifest.webmanifest`, icônes, `sw.js`, cache prudent, version affichée.
- Bibliothèque BLOCKS : import réel depuis un module partagé plutôt que duplication du code.
- Zero D1 propre, zero moteur de notifications, zero cron; données de démo en mémoire, éventuellement thème préféré en localStorage.
- Toutes les interactions de prototype restent locales et réinitialisables.
- Chaque feuille se teste sur iPhone avec retour utilisateur avant promotion.
- Les nouveaux domaines métier restent **à décider** ; ne pas recréer les anciennes apps à partir d'exemples fictifs.

## Source / déploiement

**Réalisation effective :** dépôts privés séparés `Leomgl/laboratoire-app` et `Leomgl/blocks-app`. Aucun module source BLOCKS n'est copié dans le dépôt LAB. La dépendance est **verrouillée** dans `blocks.lock.json` au commit `b41d3fcf99c1d9dcfc0935db007e6678316c77f2`. Le compilateur LAB produit `dist/worker.mjs`, qui intègre les fichiers versionnés au déploiement pour fonctionner sans connexion inter-Workers, sans base de données et hors ligne. Deux CI indépendantes : tests unitaires de BLOCKS et smoke du bundle LAB. Les repos étant privés, **la CI LAB ne recompile pas automatiquement l'autre dépôt** sans autorisation GitHub supplémentaire ; les builds depuis deux clones authentifiés sont reproductibles et documentés dans le README LAB.

Le prototype initial est livré ; la migration est réalisée. Recette iPhone post-migration : PWA accessible, deux feuilles fonctionnelles, deux thèmes et composants ESM versionnables, recette Safari iPhone demandée. Déploiement du Laboratoire distinct de LINK et FORGE, sans liaison ni base de données supplémentaire.
