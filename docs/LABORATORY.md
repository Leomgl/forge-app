# LABORATOIRE — première PWA de la nouvelle génération

## M6 — Réglages et Me notifier : état actuel validé en code

**M6 — finalisation technique Réglages + Me notifier, 16 novembre 2026.** **BLOCKS est uniquement une bibliothèque**, pas une application PWA. Source canonique `Leomgl/blocks-app` **V0.3.0**, SHA précis `846f92de94a8a31ace6f4a4ed58bd9d4fd4bf3c4` (CI [verte](https://github.com/Leomgl/blocks-app/actions/runs/43777534738)). Deux composants stabilisés : **Réglages universels** (recherche, catégories dont état ouvert conservé après update, préférences fournies et persistées par l'app, actions async, version/À propos/mise à jour PWA et cleanup des extensions `decorate`) et **Me notifier** (`blocks.notify.v1` inchangé, RDV/pass/stock, offsets 0–43200 min / max six, rappel exactement à l'échéance, changement de contexte isolé). Les contrats sont dans `blocks-app/docs/SETTINGS.md` et `docs/NOTIFY-EDITOR.md`. **LABORATOIRE V0.4.0** importe ces modules via `blocks.lock.json` épinglé, les affiche et garde localement les valeurs **par scénario** ; bundle GitHub `cb2e69537d5bfdc75456cd7cf58c2955192fb4ff`, CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43777784164), Worker Cloudflare existant `a15681c1-11cc-4183-b600-3fc7ed6ddd53` à 100 % (16 assets, 0 bindings). **LINK V0.13.0 inchangé** (25 bindings, DO, D1 et Push) et LABO↔LINK déjà associé sur iPhone. **Statut : code & tests validés, recette tactile iPhone de V0.4.0 encore nécessaire pour clôturer les modules.** Suivi dédié : [FORGE #50](https://github.com/Leomgl/forge-app/issues/50). Réception d'un vrai Push test encore à valider dans [#47](https://github.com/Leomgl/forge-app/issues/47), automatisation métier RDV non encore réalisée : [#49](https://github.com/Leomgl/forge-app/issues/49).


## Règle à appliquer dans toutes les futures apps — 16/11/2026

**Décision UX transverse — LINK dans Réglages, jamais dans « Me notifier ».** LABORATOIRE **V0.3.3**, CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43776500074), Worker Cloudflare `f1335351-7e8b-4157-a00e-3756f215870a` à **100 %**. Le bloc partagé `mountSettings` accueille maintenant la catégorie **« Connexion LINK »** (extension `decorate`) : générer/recopier le code, associer l'app dans LINK → Applications, état de la connexion, contrôle des permissions et déconnexion locale. La feuille **Notifier** conserve seulement `Me notifier` et un test d'envoi **volontaire**, avec un renvoi aux Réglages si l'app n'est pas encore liée. Code LAB `Leomgl/laboratoire-app` release `f771a16e77bc8f76d00dffa62a4735d384090165`. Identifiants IndexedDB conservés lors de la migration d'UI ; les vues nettoient leurs listeners à la navigation. **LINK V0.13.0 inchangé** (Worker `dd12eb78-eef1-4ed2-a8ff-1429ad0a3425`, 25 bindings, D1 et moteur Push intacts). Le pairing/permission reste manuel une seule fois ; après l'association, l'envoi automatique à la création/modification de RDV demeure un travail à faire dans FORGE #49. **Recette physique iPhone du nouvel emplacement en attente.**


## M5 — État de référence actuel pour les autres threads

**M5 — liaison par code courte livrée (15 novembre 2026).** LINK **V0.13.0** et LAB **V0.3.2** ont été déployés à 100 % sur Cloudflare. L'app source affiche un code alphanumérique de 12 caractères (**10 minutes**, un usage), l'utilisateur le saisit dans **LINK → Applications**, vérifie le nom et l'origine HTTPS, choisit explicitement la permission de notification sous Face ID, puis revient dans l'app : la connexion se finalise par un échange de preuve locale, sans second formulaire. Les anciennes interfaces « Inscrire une nouvelle application » et « Créer un contrat » restent dans **Réglages → Outils avancés** pour maintenance uniquement. LINK utilise une **table additive** `hub_pairing_requests` dans sa D1 existante, un rate limiter déjà présent et son Worker actuel, sans autre moteur ou ressource. Tests automatisés LINK [verts](https://github.com/Leomgl/link-app/actions/runs/43774926751) et LAB [verts](https://github.com/Leomgl/laboratoire-app/actions/runs/43775044930). LINK Worker `dd12eb78-eef1-4ed2-a8ff-1429ad0a3425` à 100 %, **25 bindings**, même DO `LinkNotificationScheduler`, migration `link-live-notifications-v1`. LAB Worker `0117f6b4-ab19-481b-a881-e4d9ea0f9e1d` à 100 %, 16 assets. **Recette d'association sur iPhone encore nécessaire.** Le test de programmation de rappel dans LAB reste MANUEL ; le comportement produit « création/modification/suppression d'un RDV ⇒ intentions vers LINK automatiques ⇒ Push seul par LINK » demeure la prochaine phase du ticket [FORGE #49](https://github.com/Leomgl/forge-app/issues/49).


## Livré — V0.3.1 (liaison sécurisée et optionnelle à LINK)

**15 novembre 2026 — M4 liaison LINK (prototype intégré et déployé).** LABORATOIRE **V0.3.1** / BLOCKS **V0.2.3** / Worker LINK **V0.12.0 inchangé**. LINK a reçu un SDK navigateur (sans modification du Worker) au commit `9d98d59dbbd52ec6a818b4dbe2c1ce7a52cb2b1e` : échange d'invitation copiée `LHI1.laboratoire.…`, capacité temporaire et conversion de rappels en commandes `link.notification.command.v1` opaques. LAB a intégré l'enrôlement propriétaire, la vérification du grant, un stockage d'identité côté PWA (IndexedDB) et la programmation **volontaire d'une seule occurrence de test**. SDK LINK CI [verte](https://github.com/Leomgl/link-app/actions/runs/43771185719), LAB CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43771334855), Worker LAB `4b4448a1-9988-4d97-8d4a-8d91688c80d0` déployé à **100 %** sur la même URL. 16 assets, pas de nouvelle D1, Worker ou moteur Push. **La liaison réelle nécessite encore l'inscription et le grant propriétaire dans LINK, puis le test physique iPhone avec abonnement Push LINK.** Les révisions, annulations, files hors ligne et gestion du stock événementiel restent à construire avant app métier. Suivi : [FORGE #47](https://github.com/Leomgl/forge-app/issues/47), [manuel M4](./LINK-BRIDGE.md).

**Validation produit :** l'utilisateur a décidé de construire en premier une PWA « Laboratoire », conçue comme une pile de feuilles vierges pour dessiner, tester et valider les blocs communs. Elle **n'est pas** une app métier définitive. Tickets : [#43](https://github.com/Leomgl/forge-app/issues/43) / [#44](https://github.com/Leomgl/forge-app/issues/44).

## Livré — V0.2.3 (mise à jour en un clic)

**15/11/2026 — BLOCKS et LABORATOIRE V0.2.3 : Mise à jour PWA directe**. Le bloc Réglages (À propos) affiche « Mettre à jour l’application » et transmet la progression via `onUpdate({report})`. Le nouveau helper partagé `blocks-app/src/pwa-update.mjs` consulte `/version.json` sans cache, compare la version installée à la version distante, appelle `ServiceWorkerRegistration.update()`, attend une activation uniquement si elle est réellement en cours, puis recharge la PWA automatiquement. Si déjà à jour, aucun rechargement ; hors ligne, erreur explicite. Le correctif V0.2.3 supprime une attente inutile lorsque le SW s'est déjà activé en arrière-plan. Le LAB embarque 13 ressources sans modifier LINK, FORGE, D1 ni les notifications. BLOCKS commit `b7a6e7924a76b9be24ee71669af199298dfc83b1`, tests CI https://github.com/Leomgl/blocks-app/actions/runs/43768919561 verts. LAB commit `3e51029d1c114d6aa42ad42d70c1b5ebb920e632`, CI https://github.com/Leomgl/laboratoire-app/actions/runs/43768979554 verte. Cloudflare Worker `laboratoire-app` version `0cf65b67-3ea8-4be2-bf1d-91e34e4bba09` déployée à 100 %. **Recette physique iPhone V0.2.3 à confirmer.** L'ancien bouton V0.2.1 doit charger V0.2.3 une fois avant de profiter des mises à jour ultérieures.

## Historique — V0.2.1 (personnalisation de « Me notifier »)

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
