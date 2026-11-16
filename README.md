# FORGE — Development Memory · V0.10.1

## M7 — Dernière évolution : densité universelle des Réglages

**M7 (16/11/2026) — Densité d'affichage réutilisable.** Le module **Réglages** de BLOCKS V0.3.3 accueille désormais dans **Préférences** un sélecteur **Compact / Normal / Spacieux**. API bibliothèque `src/density.mjs` : `normalizeDensity`, `applyDensity`, `mountDensityPicker` ; CSS structurel dans `src/blocks.css` (Shell, Réglages, Me notifier). Densité indépendante de la palette : cinq DA toujours disponibles, cibles tactiles ≥44–48 px. L'app hôte applique et persiste la valeur, **BLOCKS n'est pas une app**. **LABO V0.4.2** est le banc d'essai : `Réglages → Préférences`, persisté sous `lab-density-v1`, 18 assets déployés à 100 % sur Cloudflare Worker `f330afdb-6e13-433a-9977-05cca1666ae0`. GitHub CI [BLOCKS verte](https://github.com/Leomgl/blocks-app/actions/runs/43779810916) et [LABO verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43780036982). **LINK V0.13.0 inchangé** : 25 bindings, D1 et ordonnanceur Push préservés. Me notifier toujours validé à 100 %, aucune modification de ses règles. **À valider physiquement sur iPhone** : les trois densités sur les cinq thèmes, persistance, lisibilité, tactile et absence de régression ; le module Réglages sera déclaré prêt pour les futures apps après cette validation. Voir tickets FORGE #44/#43.


## M6 — Réglages et Me notifier : état actuel validé en code

**M6 — finalisation technique Réglages + Me notifier, 16 novembre 2026.** **BLOCKS est uniquement une bibliothèque**, pas une application PWA. Source canonique `Leomgl/blocks-app` **V0.3.0**, SHA précis `846f92de94a8a31ace6f4a4ed58bd9d4fd4bf3c4` (CI [verte](https://github.com/Leomgl/blocks-app/actions/runs/43777534738)). Deux composants stabilisés : **Réglages universels** (recherche, catégories dont état ouvert conservé après update, préférences fournies et persistées par l'app, actions async, version/À propos/mise à jour PWA et cleanup des extensions `decorate`) et **Me notifier** (`blocks.notify.v1` inchangé, RDV/pass/stock, offsets 0–43200 min / max six, rappel exactement à l'échéance, changement de contexte isolé). Les contrats sont dans `blocks-app/docs/SETTINGS.md` et `docs/NOTIFY-EDITOR.md`. **LABORATOIRE V0.4.0** importe ces modules via `blocks.lock.json` épinglé, les affiche et garde localement les valeurs **par scénario** ; bundle GitHub `cb2e69537d5bfdc75456cd7cf58c2955192fb4ff`, CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43777784164), Worker Cloudflare existant `a15681c1-11cc-4183-b600-3fc7ed6ddd53` à 100 % (16 assets, 0 bindings). **LINK V0.13.0 inchangé** (25 bindings, DO, D1 et Push) et LABO↔LINK déjà associé sur iPhone. **Statut : code & tests validés, recette tactile iPhone de V0.4.0 encore nécessaire pour clôturer les modules.** Suivi dédié : [FORGE #50](https://github.com/Leomgl/forge-app/issues/50). Réception d'un vrai Push test encore à valider dans [#47](https://github.com/Leomgl/forge-app/issues/47), automatisation métier RDV non encore réalisée : [#49](https://github.com/Leomgl/forge-app/issues/49).


## M5 — État de référence actuel pour les autres threads

**M5 — liaison par code courte livrée (15 novembre 2026).** LINK **V0.13.0** et LAB **V0.3.2** ont été déployés à 100 % sur Cloudflare. L'app source affiche un code alphanumérique de 12 caractères (**10 minutes**, un usage), l'utilisateur le saisit dans **LINK → Applications**, vérifie le nom et l'origine HTTPS, choisit explicitement la permission de notification sous Face ID, puis revient dans l'app : la connexion se finalise par un échange de preuve locale, sans second formulaire. Les anciennes interfaces « Inscrire une nouvelle application » et « Créer un contrat » restent dans **Réglages → Outils avancés** pour maintenance uniquement. LINK utilise une **table additive** `hub_pairing_requests` dans sa D1 existante, un rate limiter déjà présent et son Worker actuel, sans autre moteur ou ressource. Tests automatisés LINK [verts](https://github.com/Leomgl/link-app/actions/runs/43774926751) et LAB [verts](https://github.com/Leomgl/laboratoire-app/actions/runs/43775044930). LINK Worker `dd12eb78-eef1-4ed2-a8ff-1429ad0a3425` à 100 %, **25 bindings**, même DO `LinkNotificationScheduler`, migration `link-live-notifications-v1`. LAB Worker `0117f6b4-ab19-481b-a881-e4d9ea0f9e1d` à 100 %, 16 assets. **Recette d'association sur iPhone encore nécessaire.** Le test de programmation de rappel dans LAB reste MANUEL ; le comportement produit « création/modification/suppression d'un RDV ⇒ intentions vers LINK automatiques ⇒ Push seul par LINK » demeure la prochaine phase du ticket [FORGE #49](https://github.com/Leomgl/forge-app/issues/49).


## Nouveauté du 15/11 : correctif LINK et cible automatique

**LINK V0.12.1** déployé à 100 % : correctif Réglages vides, 25 bindings et ordonnanceur DO préservés ; ticket [#48](https://github.com/Leomgl/forge-app/issues/48), CI [verte](https://github.com/Leomgl/link-app/actions/runs/43772864227). **Décision de la cible UX** : une app neuve affiche un code, l'utilisateur l'entre dans LINK et autorise les permissions avec Face ID. Après association, la création/modification/suppression d'un RDV avec « Me notifier » provoque automatiquement un upsert/cancel de rappels opaques, à révision monotone et outbox hors ligne ; LINK planifie et envoie seul le Push même si l'app est fermée. Ticket [#49](https://github.com/Leomgl/forge-app/issues/49). LAB V0.3.1 et son invitation LINK→LAB, ainsi que les boutons « Préparer / Programmer », restent exclusivement une **simulation/test M4**, pas le parcours produit définitif.

## Statut actif : liaison LINK M4

**15 novembre 2026 — M4 liaison LINK (prototype intégré et déployé).** LABORATOIRE **V0.3.1** / BLOCKS **V0.2.3** / Worker LINK **V0.12.0 inchangé**. LINK a reçu un SDK navigateur (sans modification du Worker) au commit `9d98d59dbbd52ec6a818b4dbe2c1ce7a52cb2b1e` : échange d'invitation copiée `LHI1.laboratoire.…`, capacité temporaire et conversion de rappels en commandes `link.notification.command.v1` opaques. LAB a intégré l'enrôlement propriétaire, la vérification du grant, un stockage d'identité côté PWA (IndexedDB) et la programmation **volontaire d'une seule occurrence de test**. SDK LINK CI [verte](https://github.com/Leomgl/link-app/actions/runs/43771185719), LAB CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43771334855), Worker LAB `4b4448a1-9988-4d97-8d4a-8d91688c80d0` déployé à **100 %** sur la même URL. 16 assets, pas de nouvelle D1, Worker ou moteur Push. **La liaison réelle nécessite encore l'inscription et le grant propriétaire dans LINK, puis le test physique iPhone avec abonnement Push LINK.** Les révisions, annulations, files hors ligne et gestion du stock événementiel restent à construire avant app métier. Suivi : [FORGE #47](https://github.com/Leomgl/forge-app/issues/47), [manuel M4](./LINK-BRIDGE.md).

FORGE est le cockpit de suivi des **nouvelles applications iPhone**. L'architecture conservée au 15 novembre 2026 compte exactement deux applications : [LINK](https://github.com/Leomgl/link-app) et [FORGE](https://github.com/Leomgl/forge-app).

**Application :** https://forge-hub.q9pfwtztsc.workers.dev/

## V0.10.1 — nouvelle génération

## Nouvelle génération

- **LINK V0.12.1** : seul centre technique des connexions chiffrées, permissions inter-apps et notifications iOS. Les applications à venir devront s'y inscrire ; aucune app historique n'est encore retenue.
- **FORGE V0.10.1** : gestion des projets, tickets GitHub, décisions, versions, recettes et dépendances. Les nouvelles apps seront définies ensemble et ajoutées au catalogue après validation.
- **GitHub** : les issues de `Leomgl/forge-app` sont la référence des tickets. Les projets techniques et leur source vivent dans leurs dépôts distincts.
- **Cloudflare** : un Worker `forge-hub` assure l'interface FORGE et la session GitHub OAuth sécurisée. Pas de nouvelle base D1, ni nouveau Worker, ni système de notifications propres à FORGE.

## État initial du catalogue

| Projet | Rôle | Dépôt |
|---|---|---|
| LINK | Transport inter-apps, identité, permissions, Web Push | [link-app](https://github.com/Leomgl/link-app) |
| FORGE | Pilotage du développement et décisions | [forge-app](https://github.com/Leomgl/forge-app) |

**Dernière livraison :** LABORATOIRE et BLOCKS V0.2.1 — feuille 03 avec saisie personnalisée Jours/Heures/Minutes pour RDV et pass, stock inchangé ; LINK n'a pas été modifié. V0.2.0 validée iPhone, V0.2.1 en attente de recette.

**Premières réalisations de l'architecture :** [LABORATOIRE V0.2.0](https://github.com/Leomgl/laboratoire-app) (PWA d'essais, https://laboratoire-app.q9pfwtztsc.workers.dev/) et [BLOCKS V0.2.0](https://github.com/Leomgl/blocks-app) (composants partagés ESM + CSS). Le `blocks.lock.json` de LAB verrouille le commit de BLOCKS ; le Worker est compilé à partir des deux sources privées. Les deux CI sont opérationnelles. Feuille 03 « Me notifier » en démonstration sur LAB, recette iPhone à faire ; aucun moteur Push local. Les anciens fichiers bootstrap FORGE ne sont plus actifs.

Les **futures apps** restent à décider ensemble. Aucune ancienne app n'est recréée ou préinscrite par défaut.

## Tickets et archives

Les tickets de la nouvelle génération commencent au **#40**. Seuls les tickets de cette génération sont affichés dans les tableaux À faire, En cours et Terminés de FORGE. Les tickets précédents et leurs commentaires sont **conservés sur GitHub**, sans figurer dans le cockpit actif. Les références historiques de code/docs restent consultables dans la branche de sauvegarde `snapshot/forge-preclean-2026-11-15`.

Le ticket `GENERAL` est réservé aux idées non attribuées, décisions transversales, blocs communs ou à la préparation d'une nouvelle app. Il n'est pas une application supplémentaire.

## Fonctionnement

Le formulaire génère une issue avec le marqueur `FORGE_META` (projet, type, priorité, workflow, version), le contexte, les critères et les éléments à préserver. Les états sont À faire, En cours et Terminé. La publication directe, les commentaires et la modification des statuts passent par l'authentification GitHub sur le Worker `forge-hub`. Le jeton GitHub n'est jamais saisi manuellement dans la PWA.

La page de détail de ticket charge les commentaires et rend le Markdown en DOM sécurisé, sans HTML arbitraire. La PWA reste installable, et son Service Worker ne met pas en cache les API de session ni les écritures.

## Liens techniques

- [Architecture BLOCKS · LABORATOIRE](docs/ARCHITECTURE-BLOCKS.md)
- [Spécification LABORATOIRE](docs/LABORATORY.md)
- [Guide de reprise IA](docs/AI-START-HERE.md)
- [Catalogue des applications](docs/APP-MAP.md)
- [Dépendances](docs/DEPENDENCIES.md)
- [Protocole de ticket](docs/TICKET-PROTOCOL.md)
- [Décisions](docs/DECISIONS.md)
- [Configuration OAuth](docs/GITHUB-AUTH.md)
- [Historique des livraisons](docs/EVOLUTION-HISTORY.md)

## Contrôles

```bash
node --check app.js
node --check ticket-detail.js
node --check edge-worker/index.mjs
node tests/smoke.mjs
node scripts/check-release-version.cjs
```

Une CI verte valide le code, pas la recette visuelle et fonctionnelle sur iPhone. Les anciennes fonctionnalités ne doivent pas être réintroduites sans nouvelle définition produit.
