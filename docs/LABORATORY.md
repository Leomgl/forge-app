# LABORATOIRE — première PWA de la nouvelle génération

**Validation produit :** l'utilisateur a décidé de construire en premier une PWA « Laboratoire », conçue comme une pile de feuilles vierges pour dessiner, tester et valider les blocs communs. Elle **n'est pas** une app métier définitive. Tickets : [#43](https://github.com/Leomgl/forge-app/issues/43) / [#44](https://github.com/Leomgl/forge-app/issues/44).

## Livré — V0.2.1 (personnalisation de « Me notifier »)

LABORATOIRE **V0.2.1** + BLOCKS **V0.2.1**, 15 novembre 2026 : nouvelle saisie des rappels en **Jours / Heures / Minutes** et champ numérique, ajout/suppression de plusieurs rappels (max. six) pour rendez-vous et fin de pass. Le seuil Stock est inchangé. BLOCKS commit `93a04c6429ade3885ef1c3cf3133240ecf3059e8` (CI verte [43767468999](https://github.com/Leomgl/blocks-app/actions/runs/43767468999)), LAB commit `0d3fcc4fff9ae552557f13c289e309c6aeb9df47` (CI verte [43767626205](https://github.com/Leomgl/laboratoire-app/actions/runs/43767626205)). Cloudflare Worker `laboratoire-app` version `91f2f399-b16e-483e-8349-1b715be5fee7` diffusée à **100 %**, même URL et aucune ressource ajoutée. Sortie `blocks.notify.v1` inchangée, LINK seul moteur de notifications, aucune intégration Web Push active dans LAB. **V0.2.0 a été validée fonctionnelle sur iPhone par l'utilisateur ; V0.2.1 nécessite encore recette iPhone.**

## Historique — V0.2.0 (15/11/2026, feuille 03)

- **Feuille 03 « Me notifier »** : rendez-vous, fin de pass, stock faible, activation, rappels multiples, libellé et aperçu JSON neutre. Deux DA Graphite/Papier maintenues.
- **BLOCKS V0.2.0** : module partagé `src/notify-editor.mjs` et CSS structuraux ; commit épinglé `755c6f2387d6ccb21a6fca6ad00f3a54523d0b2f`.
- **LABORATOIRE V0.2.0** : commit `213ea7e900f5efe9f31852478e3d116ca6e24d28`, 11 ressources Worker, cache SW `laboratoire-v0.2.0`, CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43766395358).
- **Cloudflare** : version `007915c9-31f0-4079-8bc7-18238735b581` déployée à 100 % sur le Worker existant. Aucun Worker/D1 ajouté, LINK et FORGE préservés.
- **Recette iPhone** : non effectuée sur V0.1.1 après migration ni sur la V0.2.0 ; test physique requis (navigation, deux thèmes, feuilles 01–03, plusieurs rappels et seuil stock, hors ligne).
- **LINK** : aucune intégration active. Un adaptateur sera étudié et validé séparément contre l'API et les permissions réelles du Hub.

## Historique — V0.1.1 (15/11/2026, migration définitive)

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

**Réalisation effective :** dépôts privés séparés `Leomgl/laboratoire-app` et `Leomgl/blocks-app`. Aucun module source BLOCKS n'est copié dans le dépôt LAB. La dépendance actuelle est **verrouillée** dans `blocks.lock.json` au commit `755c6f2387d6ccb21a6fca6ad00f3a54523d0b2f`. Le compilateur LAB produit `dist/worker.mjs`, qui intègre les fichiers versionnés au déploiement pour fonctionner sans connexion inter-Workers, sans base de données et hors ligne. Deux CI indépendantes : tests unitaires de BLOCKS et smoke du bundle LAB. Les repos étant privés, **la CI LAB ne recompile pas automatiquement l'autre dépôt** sans autorisation GitHub supplémentaire ; les builds depuis deux clones authentifiés sont reproductibles et documentés dans le README LAB.

Le prototype initial est livré ; la migration est réalisée. Recette iPhone post-migration : PWA accessible, deux feuilles fonctionnelles, deux thèmes et composants ESM versionnables, recette Safari iPhone demandée. Déploiement du Laboratoire distinct de LINK et FORGE, sans liaison ni base de données supplémentaire.
