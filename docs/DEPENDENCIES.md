## SYNAPSE officiellement VALIDÉ — 16/11/2026

L'utilisateur confirme l'approbation définitive de **SYNAPSE** déjà intégré dans **CORTEX**. Capture compacte AUTO / RDV / RAPPEL / NOTE / DÉPENSE, confirmation obligatoire, parser local et contrat `blocks.capture.v1` conservés. **BLOCKS 0.12.0 / SYNAPSE 1.0.0**, commit `f6ca7eb09c5a8d2490777ce491c987dce8071947` ; qualification de stabilité sans modification du code de capture. Cortex utilise déjà la même fonctionnalité via le module `synapse@0.5.0` épinglé dans son ancien lock : **pas de redéploiement Cortex nécessaire ni effectué**. **LABORATOIRE V0.9.4** commit `0c9e01accb18e1ae0212848dcb26c9de7b663211`, cinq feuilles **01 / 02 / 03 / 04 / 05 ✓ VALIDÉES**, plus de prototype en attente. Worker LABO existant `laboratoire-app` à **100 %**, version `f4a3d90e-4bd9-4479-a949-6aa235ea1b3d`, zéro binding supplémentaire. [FORGE #58 clôturé](https://github.com/Leomgl/forge-app/issues/58). Aucun changement des données Cortex, de LINK, ni du moteur Push.

---

## VALIDATION OFFICIELLE — PHARMA BLOCKS 1.0.0 (16/11/2026)

**PHARMA** est désormais **VALIDÉ** comme module réutilisable suite à l'approbation explicite de l'utilisateur. UI compacte (semaine 7 jours, cases de prise, Traitements avec stock/recharge intégrés, Historique), schéma compatible `blocks.ordo.v1`, import `@leo/blocks-app/pharma` / `pharma-styles`, `mountPharma`. **BLOCKS 0.11.0**, module `ordo@1.0.0`, commit `fee33da9d474eb99995e15aa58f5355d5f3d8cdb`, CI verte. **LABORATOIRE V0.9.3**, feuille **05 ✓ VALIDÉ**, avec 01/02/04 validées, 03 SYNAPSE en essai. Worker `laboratoire-app` version `f9162cd9-26a4-4d12-8460-c6012dcc7014` déployée à **100 %** ; 0 binding, aucune modification LINK/Cortex. [FORGE #76 terminée](https://github.com/Leomgl/forge-app/issues/76). Suite [FORGE #77](https://github.com/Leomgl/forge-app/issues/77) : intégration métier Cortex et notifications LINK **non réalisées** ; sécurité et rappels à qualifier avant usage réel.

---

## MISE À JOUR 16/11/2026 — PHARMA 0.2.1 stocks intégrés

PHARMA (feuille 05 LABORATOIRE) réunit maintenant **traitements et stocks dans une seule fiche** : solde, seuil bas et réapprovisionnement. Plus de volet Stocks indépendant. BLOCKS `0.10.2` / `ordo@0.2.1` commit `4263e7905d1ee857a844524f1b39e4d9cab7f4c7` ; LABO `V0.9.2` commit `08e460530ee0193ef99d942f4cc8b3bac80c47ca` déployé à 100 % sur le Worker existant `laboratoire-app` (version `80efcc87-62e3-448d-9ce3-c4d858bfec06`). Aucune nouvelle base, Worker, autorisation LINK ou notification. Recette iPhone en attente, [FORGE #76](https://github.com/Leomgl/forge-app/issues/76).

---

## ACTUEL — PHARMA / LABO 16/11/2026

- **BLOCKS** V0.10.1, source commit `f571ad11b4dc471f29e5b0b51c4b124857282f46`. Module public **PHARMA V0.2.0** (`mountPharma`), encore enregistré en interne comme `ordo@0.2.0` et stocké dans `src/ordo.mjs` / `src/ordo.css` pour la compatibilité des premiers tests. Contrat des données `blocks.ordo.v1` inchangé.
- **LABO** V0.9.1, repo `Leomgl/laboratoire-app` commit `bc8c53c41f23cdbb0b96f1760fb9e6a148fee1b7`, version BLOCKS verrouillée dans `blocks.lock.json`. 25 assets en bundle, aucun stockage/Push distant.
- **Cloudflare** : Worker existant `laboratoire-app` version `485f01a9-46d6-4075-9316-82cbdb73e62c`, déploiement `ac0f0d26-4a20-4551-834b-e941e2a1a5ba` à 100 %, 0 binding, date compatibilité inchangée. Tests CI [BLOCKS](https://github.com/Leomgl/blocks-app/actions/runs/43924347603) et [LABO](https://github.com/Leomgl/laboratoire-app/actions/runs/43924494594) verts.
- **LINK et CORTEX : non modifiés.** Aucune permission médicale ou notification PHARMA encore programmée. Tests physiques sur iPhone attendus avant de déclarer le module stable, [FORGE #76](https://github.com/Leomgl/forge-app/issues/76).

---

## Architecture actuelle — deux relations Rituels → Cortex via LINK (16/11/2026)

Les applications ne s'appellent jamais directement. **LINK V0.14.0** centralise pairing, grants owner Face ID et agrégats autorisés. Routes source Rituels : `travel_kits` (collection de trousses vers Voyages Cortex) et `routine_summary` (compteurs du jour vers Accueil Cortex). Droits séparés et fermés par défaut. Le second contrat n'existait pas en D1 à la publication : l'utilisateur devra le préparer et autoriser lui-même. Rituels V0.4.0 et Cortex V0.5.4 consomment exclusivement les endpoints LINK existants/nouveaux ; pas de dépendance directe Rituels ↔ Cortex. BLOCKS et moteur Push non modifiés ; table `link_routine_snapshots` ajoutée à la même D1, pas d'infrastructure additionnelle.

**Versions de référence de production** : LINK `2a67b323-aca6-46cd-807d-fc531ff8b99f`, Rituels `b73e65a2-dae5-40d8-87f2-615fce77bef6`, Cortex `3611b3c6-d015-4a00-a254-e3aca4208a02`, tous à 100 %. [FORGE #67](https://github.com/Leomgl/forge-app/issues/67). Les sections plus anciennes ci-dessous documentent les étapes précédentes, **pas** le statut présent.

## RITUELS V0.3.3 — cause racine écran Produits vide corrigée (16/11/2026)

- **Incident constaté par capture iPhone** : l'app V0.3.1 affichait « Mes produits » et « Nouveau produit », mais aucune section ; icônes de la navigation basse également absentes. Le catalogue local n'était pas nécessairement vide.
- **Diagnostic reproduit** sur navigateur avec IndexedDB préalablement peuplé : `Cannot access 'eventDescriptions' before initialization` puis `Cannot access 'CATALOGUE_GROUPS' before initialization`. Le shell était monté et la navigation initiale déclenchée **avant** l'initialisation des constantes top-level. La V0.3.2 (fallback des anciennes catégories) était une protection utile mais **ne réparait pas cette panne**.
- **Vrai fix V0.3.3** : déplacement du montage `mountAppShell` et de la décoration des pictogrammes **après** toutes les constantes de l'app ; conservation du fallback des groupes hérités et de l'isolement des fiches malformées.
- **Tests de régression réels** : [Chromium/WebKit 320/390px](https://github.com/Leomgl/rituels-app/actions/runs/43818039846) PASS, chargement avec journal et trousse préexistants, 12 produits dans des groupes locaux obsolètes, 12 fiches rendues après rechargement, stock Sport ajusté à 14 ml préservé, aucune erreur JavaScript, Trousse sans débordement. **33/33 tests métier** et [smoke public](https://github.com/Leomgl/rituels-app/actions/runs/43818102689) verts.
- **Routine approuvée et appliquée** : matin Thirst Quencher → crème visage 24h → Beard Hydrator → anti-transpirant ; soir Thirst Quencher → crème visage. Huile barbe occasionnelle, non forcée dans le suivi quotidien. Une fiche Beard Hydrator éditée manuellement conserve ses choix.
- **Publication** : [Rituels V0.3.3](https://rituels-app.q9pfwtztsc.workers.dev/), Cloudflare Worker `rituels-app`, version `b97b79fc-d237-4534-88df-2feac698465d` à 100 %, deployment `ed385e5e-083a-43e1-9917-6132a5030a33`. SW `rituels-v0.3.3`; toujours 0 binding/D1/cron/Push. LINK/Cortex inchangés, BLOCKS V0.3.3 SHA `700ae421a2c2d56536c3793afa9f6f807973e72a`.
- **À valider par utilisateur** : installer la mise à jour, relancer l'app sans la supprimer, confirmer catégorie Produits, photos, navigation basse, Trousse et étapes matin/soir sur l'iPhone réel. Ticket [FORGE #54](https://github.com/Leomgl/forge-app/issues/54) encore ouvert.

## RITUELS V0.3.1 — régression iPhone, catalogue et soins barbe corrigés (16/11/2026)

- **Version déployée** : [Rituels](https://rituels-app.q9pfwtztsc.workers.dev/) V0.3.1, Cloudflare Worker `rituels-app` version `6c4f3e19-45d3-4ed0-a305-06d5bc32ff7e`, deployment `7f395146-b182-4893-be6d-9240f2969bfa`, trafic **100 %**. Aucun nouveau binding, D1, cron ou Push.
- **Incident iPhone** : utilisateur ne voit plus les produits dans leurs catégories et signale un bug visuel dans Trousse. Sur Chromium 390 px, la création d'une trousse avec le sélecteur de 12 produits causait **543 px de largeur**, source d'un débordement horizontal. Les 12 produits étaient présents dans le DOM frais. À corriger aussi contre les fichiers PWA obsolètes en cache.
- **Patch** : styles responsive `minmax(0,1fr) auto`, limites de largeur et retours à la ligne dans Trousse et Produits ; service worker `rituels-v0.3.1` **network-first avec fallback offline** pour app/modules/CSS ; Réglages À propos à version dynamique.
- **Barbe identifiée** : anciens placeholders corrigés **sur place** en **Rituals Homme Beard Hydrator 30 ml** (SKU `1116297`) et **Rituals Homme Hair & Beard Oil 30 ml** (SKU `1120294`). Images URL packshot officielles Rituals, recommandations ciblées peau mixte/barbe 1–3 cm. `enrichBeardCatalogue` idempotente préserve IDs, quantités calibrées, stocks, noms custom, coches 7J, kits et journal, sans créer de doublons.
- **Recette technique** : **31 tests métier**, qualité CI [verte](https://github.com/Leomgl/rituels-app/actions/runs/43803339407), smoke HTTPS [vert](https://github.com/Leomgl/rituels-app/actions/runs/43803266353), **tests UI Chromium + WebKit (320 et 390 px)** [verts](https://github.com/Leomgl/rituels-app/actions/runs/43803216481). Tous les 12 produits sont visibles dans 7 catégories ; Trousse ne déborde pas après création/ajout. Recette sur **l'iPhone physique** encore requise.
- **Routine proposée non encore appliquée** : matin lavage doux → Thirst Quencher → fine crème visage → Beard Hydrator léger → anti-transpirant → SPF30+ si exposition (non possédé) ; soir lavage doux → sérum si besoin → crème ; huile barbe seulement en finition 2 gouttes 2–4x/semaine, lotion Sport ou Sakura après douche en alternative, after-shave les jours de rasage et shampooing selon besoin. Préserver routines utilisateur jusqu'à validation.
- **Architecture intacte** : source GitHub [rituels-app](https://github.com/Leomgl/rituels-app), BLOCKS 0.3.3 verrou `700ae421a2c2d56536c3793afa9f6f807973e72a`, schéma IndexedDB V1 inchangé ; LINK/Cortex non activés. Suivi [FORGE #54](https://github.com/Leomgl/forge-app/issues/54).

## RITUELS V0.3.0 — catalogue personnel 12 produits (16/11/2026)

- **App publique** : https://rituels-app.q9pfwtztsc.workers.dev/ — Worker Cloudflare `rituels-app` version `d0d97116-8a0b-487c-afa5-912772eddefc`, déploiement `104ac24b-4cb1-450f-9ede-19da2f600127`, trafic **100 %**, sans D1/binding/cron/Push.
- **Source** : [Leomgl/rituels-app](https://github.com/Leomgl/rituels-app), version PWA **V0.3.0**, cache Service Worker `rituels-v0.3.0` ; BLOCKS **0.3.3** verrouillé commit `700ae421a2c2d56536c3793afa9f6f807973e72a`, LINK/Cortex inchangés et non activés.
- **Contenu** : 12 produits au total, dont Sport Body Lotion 70 ml déjà présent. 11 ajouts : Thirst Quencher 20 ml ; Sakura Whipped Body Cream 50 ml ; Caffeine Shampoo 70 ml ; 24h Face Cream 20 ml ; After Shave Gel 100 ml ; Anti-Perspirant 50 ml ; Homme Shower Foam 50 ml ; Ayurveda Hand Balm 70 ml ; hydratant barbe (référence/volume inconnus) ; huile barbe (référence/volume inconnus) ; Silver Suede Travel 15 ml.
- **Catalogue** : sections Visage, Barbe, Rasage, Corps & douche, Cheveux, Mains, Parfum. Fiches premium préservées : niveau restant curseur 0–100 % (si contenance connue), réserve −/+, conseils repliables, Modifier.
- **Photos** : 8 URLs WebP du fabricant Rituals **contrôlées HTTP 200** [action temporaire terminée](https://github.com/Leomgl/rituels-app/actions/runs/43800246856) ; quatre visuels absents plutôt qu'associer un faux format (Sakura 50ml, Face Cream 20ml, barbe x2). Aucun fichier police ou image de marque dupliqué dans BLOCKS.
- **Routine conseillée** : matin Thirst Quencher → 24h Face Cream, plus anti-transpirant ; soir Thirst Quencher → 24h Face Cream, fréquence libre à personnaliser. Body Lotion pilote reste en routine libre existante. Les produits non quotidiens restent hors suivi sauf activation dans Modifier. Une protection solaire n'est pas ajoutée à l'inventaire : non fournie dans les photos.
- **Données** : `seedFullCatalogue` est idempotente et **strictement additive**, sans modification des fiches locales existantes, stocks ajustés, coches 7J, kits ou journal ; même IndexedDB V1. Marque et contenance barbe non inventées.
- **Tests** : **28 tests métier** et CI [verte](https://github.com/Leomgl/rituels-app/actions/runs/43800488341), contrôle HTTP live V0.3.0 [vert](https://github.com/Leomgl/rituels-app/actions/runs/43800529613). Vérification tactile et conservation lors de la mise à jour iPhone toujours requises. Ticket : [FORGE #54](https://github.com/Leomgl/forge-app/issues/54).

## RITUELS V0.2.1 — curseur restant et validation de routine (16/11/2026)

- **Publication** : https://rituels-app.q9pfwtztsc.workers.dev/ — Worker Cloudflare `rituels-app` version `5ab038a1-ceca-4238-a62d-bdb87824bc33` à **100 %**, déploiement `2801f7bd-f9a0-480b-8e5d-5bffdf88e4ab`. Zéro nouveau binding/D1/cron/Push.
- **Fiche produit** : la jauge passive de consommation est remplacée par un **curseur natif tactile 0–100 % de quantité restante dans le tube ouvert**, avec actualisation instantanée de l'affichage puis enregistrement du niveau en ml à la fin du geste. Les boutons « Noter une utilisation », « Ajuster la jauge » et « Ouvrir un tube » ont été retirés : **« Modifier » est la seule action de fiche restante**. Le `− / +` de la réserve (tubes neufs) et les conseils repliables demeurent. L'édition de fiche permet toujours de corriger manuellement les niveaux et quantités.
- **Routine** : chaque soin affiche un bouton réversible **✓ Valider / ✓ Fait** pour la date sélectionnée. Le produit pilote non encore assigné à matin/soir apparaît dans une **routine libre**, cochable sans décompter automatiquement le stock. Les coches libres influencent la roue de progression et les indicateurs du calendrier 7J ; les routines matin/soir existantes utilisent également le bouton tactile.
- **Données** : schéma IndexedDB V1 conservé, historique et produits locaux inchangés, BLOCKS V0.3.3 commit `700ae421a2c2d56536c3793afa9f6f807973e72a` inchangé. LINK/Cortex toujours inactifs.
- **Qualité** : 22 tests métier et contrôle syntaxe ; smoke HTTP public [réussi](https://github.com/Leomgl/rituels-app/actions/runs/43796281071). Version PWA `V0.2.1`, Service Worker `rituels-v0.2.1`. Test tactile iPhone et persistance après mise à jour encore à confirmer.
- **Suivi** : [FORGE #54](https://github.com/Leomgl/forge-app/issues/54) et [repo GitHub](https://github.com/Leomgl/rituels-app).

## RITUELS V0.2.0 — fiche pilote Rituals 70 ml (16/11/2026)

- **App** : https://rituels-app.q9pfwtztsc.workers.dev/ — Worker Cloudflare `rituels-app`, version `25ad32c5-3bb7-4e9a-9ef4-aa4d2f483ca7` à **100 %**, déploiement `92fcba1f-cb6d-40cd-aa3e-b33a09ab076c`. **0 D1 / nouveau binding / Push / cron**.
- **Code** : [Leomgl/rituels-app](https://github.com/Leomgl/rituels-app) V0.2.0, 18 tests métier + vérifications de syntaxe [CI verte](https://github.com/Leomgl/rituels-app/actions/runs/43795078485), contrôle HTTP public [réussi](https://github.com/Leomgl/rituels-app/actions/runs/43795078471).
- **Premier produit** : Rituals Sport Anti-Dryness Body Lotion, charbon actif, **70 ml** (SKU `1116311`) selon photographie fournie. **Packshot officiel** : `https://rituals.scene7.com/is/image/rituals/1116311-rituals-sport-body-lotion-70ml:3-by-4?fmt=webp-alpha&hei=1600&resMode=sharp2&wid=1200` (WebP, HTTP 200 confirmé). Fiche officielle `https://www.rituals.com/fr-fr/sport-anti-dryness-body-lotion-70ml-1116311.html`.
- **Fiche produit** : visuel, nom, format, jauge **consommation du tube ouvert** (0–100 %), correction manuelle du volume restant, compteur compact `− / +` **tubes neufs en réserve** (sans achat ni dépense Cortex), accordéon discret « Conseils d’utilisation » et source Rituals. Usage manuel également conservé.
- **Routine** : aperçu de la future carte avec nom, photo et conseil court, sans assigner matin ou soir avant décision de l'utilisateur ; pas de progression fictive dans le calendrier 7J.
- **État initial** : tube 70/70 ml **estimé**, étiqueté « niveau initial à vérifier », réserve de tubes neufs `0` ; ajuste via la fiche, aucune quantité réelle déduite de la photo. Produit injecté une seule fois sur catalogue local vide ; si des produits préexistent, aucun écrasement et ajout pilote explicite possible.
- **Architecture** : BLOCKS 0.3.3 verrouillé SHA `700ae421a2c2d56536c3793afa9f6f807973e72a`. Persistance IndexedDB V1 et contrats LINK/Cortex inchangés, connexion LINK toujours inactive. PWA `V0.2.0`, SW `rituels-v0.2.0`. Photo distante fournie par Rituals, disponibilité hors ligne de l'image non garantie avant chargement.
- **Reste** : recette visuelle et tactile sur iPhone, validation de la fiche / du stock et de l'aperçu de routine ; définir ensemble le planning et les doses futures. [FORGE #54](https://github.com/Leomgl/forge-app/issues/54).

## RITUELS V0.1.2 — accueil épuré et jauge circulaire (16/11/2026)

- **Publication** : Worker Cloudflare `rituels-app`, [PWA](https://rituels-app.q9pfwtztsc.workers.dev/), version `0e8fc780-6f1d-4376-9d06-42784a5d0406` à **100 %**, déploiement `51b3dac7-975b-46c5-852f-60474d6442c1`. Aucun nouveau binding, D1, cron, Worker ni ordonnanceur Push.
- **Application** : V0.1.2 / SW `rituels-v0.1.2`; les trois cartes Accueil (« Étapes terminées », « Produits suivis », « Stocks à surveiller ») disparaissent. Les alertes réelles de stock faible restent disponibles.
- **Remplacement de l'étoile** : roue de 32 graduations avec pourcentage 0–100 % au centre du message d'accueil. Progression calculée à partir des étapes matin et soir **de la date sélectionnée** ; mise à jour à la coche, à la décoche et au changement de jour. Lecteurs d'écran : rôle progressbar, valeur et nombres d'étapes.
- **Dépendances et données inchangées** : BLOCKS V0.3.3 épinglé `700ae421a2c2d56536c3793afa9f6f807973e72a`; ni duplication de module, ni migration IndexedDB, ni échange LINK/Cortex actif. Ancienne version Cloudflare `33567125-0e52-4023-b4dc-ccc112e4c653` conservée comme référence de rollback.
- **Recette** : 12 tests métier et syntaxe CI ; vérification HTTP externe du bundle et du retrait des cartes via [Actions GitHub](https://github.com/Leomgl/rituels-app/actions). À confirmer sur iPhone : rendu, actualisation après coche/décoche, changement de date et persistance après mise à jour. [FORGE #54](https://github.com/Leomgl/forge-app/issues/54).

## RITUELS V0.1.1 — pictogrammes, typographie et suivi sur 7 jours (16/11/2026)

- **PWA** : https://rituels-app.q9pfwtztsc.workers.dev/ ; Worker `rituels-app` Cloudflare version `33567125-0e52-4023-b4dc-ccc112e4c653` à **100 %**, déploiement `de2eba0c-4641-4edd-9e80-4f657e5df96e` ; 0 binding, D1, cron ou moteur Push ajouté.
- **GitHub** : `Leomgl/rituels-app`, V0.1.1, branche `main`; CI métier et syntaxe [verte](https://github.com/Leomgl/rituels-app/actions/runs/43792020576), contrôle HTTP externe sur la nouvelle version [réussi](https://github.com/Leomgl/rituels-app/actions/runs/43792162907).
- **UI** : pictogrammes SVG ajoutés comme décoration par l'app au shell de navigation BLOCKS officiel (sans le modifier) ; typographie éditoriale Bodoni 72 / Didot / Baskerville / Georgia (polices système, pas de fichier propriétaire The Seasons).
- **Home** : message selon heure locale ; 7 dates locales glissantes avec état matin/soir, sélection manuelle du jour et retour à aujourd'hui ; rattrapage explicite de la veille après 00h sans déplacer les anciennes coches. Gestion des changements de mois/année et des stocks inchangée.
- **Dépendances** : BLOCKS V0.3.3 SHA `700ae421a2c2d56536c3793afa9f6f807973e72a` identique ; données IndexedDB inchangées ; LINK/Cortex toujours inactifs. Service Worker et version PWA `V0.1.1`, cache `rituels-v0.1.1`.
- **Statut** : publication et tests distants validés, **recette tactile iPhone en attente** (confort de la typo, navigation 4 boutons, historique 7J, rattrapage après minuit, mise à jour sans perte de données). Suivi [FORGE #54](https://github.com/Leomgl/forge-app/issues/54).

## RITUELS V0.1.0 — dépendances et publication (16/11/2026)

- **Source** : `Leomgl/rituels-app@c053a7dde4f4ad8d72fcbfed42b7a8e12f1efdcf`, tests 6/6, CI verte. Build reproductible `scripts/build.mjs` utilisant un clone privé `Leomgl/blocks-app` au commit exactement verrouillé.
- **BLOCKS** : 0.3.3 / `700ae421a2c2d56536c3793afa9f6f807973e72a` ; modules shell, settings, theme, density, pwa-update, blocks.css, palettes.css ; intégration compilée au Worker, aucune duplication source dans l'application. Distribution PATCH automatisée encore incomplète (#51).
- **Cloudflare** : `rituels-app` version `039ff052-8b20-4584-a509-39e2dce9047d` déployée à 100 %, workers.dev activé, 0 binding / D1 / cron ; contenu intégralement statique.
- **Données** : stockage propriétaire local IndexedDB et JSON exportable/importable ; pas de synchronisation multi-appareil ou de sauvegarde distante garantie. PWA hors ligne via cache versionné.
- **LINK** : intention uniquement, SDK/identité/pairing/notifications non branchés à cette version. Les achats confirmés et liens de trousses vers Cortex nécessiteront contrats idempotents et permissions via LINK. Le Worker LINK et son ordonnanceur ne sont pas modifiés.
- **Validation** : CI et publication confirmées ; contrôle HTTP public indépendant réussi ([Actions](https://github.com/Leomgl/rituels-app/actions/runs/43790849303)) ; fonctionnement tactile iPhone reste en recette (#54).

## CORTEX V0.1.2 — consolidation de l'interface (16/11/2026)

## LINK V0.13.3 — Contrôle de version résistant au cache (16/11/2026)

- **Live** : Worker `link-app`, Cloudflare version `f637f007-d717-4ade-a285-ada0be63647f` (#58) à 100 %. 25 bindings, D1 `HUB_DB` et DO `LINK_NOTIFICATION_SCHEDULER` conservés.
- **Réparation LINK-only** : adaptateur `ui/settings-ui.mjs` fournit `/version.json?check=<version>` à l'orchestrateur BLOCKS inchangé ; SW ne pré-cache/intercepte plus `/version.json` ; Worker envoie `Cache-Control: no-store` pour ce manifeste. Cache PWA `link-shell-v0.13.3-ui`.
- **Preuve** : [LINK PR #11](https://github.com/Leomgl/link-app/pull/11), [CI verte](https://github.com/Leomgl/link-app/actions/runs/43789586425), simulation d'un ancien manifeste en cache. Aucun code Push/API/DB métier modifié. Recette sur iPhone installée en attente ([FORGE #57](https://github.com/Leomgl/forge-app/issues/57)).


## LINK V0.13.2 — Raccourci Face ID sans nouvelle dépendance (16/11/2026)

- Worker Cloudflare version `f07d14df-d75a-4813-a1c0-c990423beab6`, déployée à 100 %, avec les mêmes **25 bindings**, D1 `HUB_DB` et ordonnanceur DO `LINK_NOTIFICATION_SCHEDULER` que V0.13.1.
- Bouton « Face ID » Accueil → événement UI `link:owner-unlock-request` → fonction WebAuthn propriétaire préexistante `doLogin()` → événement `link:overview` pour les métriques. Rien n'est exposé tant qu'une session owner authentifiée n'existe pas.
- BLOCKS V0.3.3 inchangé ; PWA `link-shell-v0.13.2-ui` rafraîchie ; aucun nouveau Worker, secret, moteur Push, route ni droit. [PR LINK #10](https://github.com/Leomgl/link-app/pull/10), [FORGE #56](https://github.com/Leomgl/forge-app/issues/56).


**PWA publiée** : https://cortex-app.q9pfwtztsc.workers.dev/ ; Cloudflare `cortex-app` version `37880540-cdbc-4a31-8a8b-dbb254f31b4c` à **100 %**, sans nouveau binding/D1. [CI CORTEX V0.1.2 verte](https://github.com/Leomgl/Cortex-app/actions/runs/43787564500). **Recette tactile iPhone en attente**.

- Navigation : correction de la barre inférieure héritée de BLOCKS (transform/position), **5 icônes dynamiques** utilisant `currentColor` et les tokens d'apparence BLOCKS. Les raccourcis 1 et 2 suivent le module choisi.
- Modules : Organisation (Agenda, Rappels, Notes) ; Carnet personnel (Contacts) ; Finances (Budget).
- Agenda : calendrier mensuel cliquable, repères sur les jours occupés, recherche, sélection d'un jour pour voir/créer un RDV, prochains rendez-vous sous la grille.
- Rappels : bloc Aujourd'hui, liste par Tous / Priorité / Date, choix de priorité par rappel, zone Terminé.
- Contacts : prénom/nom, photos recadrées localement, quatre favoris, barre de recherche, index A–Z, import VCF et liens système tel/SMS/email.
- **Budget inchangé. LINK inchangé et ajourné**, en attendant une base UI robuste ; aucune synchronisation métier inter-app déclarée opérationnelle.
- Enregistrements IndexedDB et sauvegarde JSON préservés, BLOCKS V0.3.3 et SDK LINK verrouillés.
- Suivi : [FORGE #53](https://github.com/Leomgl/forge-app/issues/53).

## CORTEX — première app métier en recette (16/11/2026)

## LINK V0.13.1 — Réglages BLOCKS et dashboard (16/11/2026)

- **Production** : Worker existant `link-app`, version Cloudflare `f2ae0fa5-2ff8-43d5-8b3c-c5a334f2e71f` à 100 %. 25 bindings conservés ; D1 `HUB_DB` ID `d81d8dbe-1167-477e-a41b-8db74f5eec45` ; scheduler DO `LINK_NOTIFICATION_SCHEDULER` ID `4f150869ae0540349e38304e7f9ef398`.
- **Code** : [LINK PR #9](https://github.com/Leomgl/link-app/pull/9) fusionnée (squash `6f12df51f618f39be13cddd75f01468168ebd7b5`), CI [verte](https://github.com/Leomgl/link-app/actions/runs/43785260051).
- **BLOCKS** : V0.3.3 commit `92c79f8bd26be85ecdf50260090d7ee5f80355ae`, modules settings/theme/density/pwa-update/styles/palettes @1.0.0, imports canoniques au build, `blocks.lock.json` et vérifications SHA-256. **Propagation automatique des PATCH BLOCKS vers LINK non activée** : à faire dans #51.
- **Règle** : cette release ne change ni les API, ni le pairing, ni la D1, ni le Push, ni les permissions. Seul le Worker UI assemblé et la liste de cache du Service Worker ont changé. Recette réelle iPhone à faire, suivi [#52](https://github.com/Leomgl/forge-app/issues/52).


- **Repo** `Leomgl/Cortex-app`, URL `https://cortex-app.q9pfwtztsc.workers.dev/`, Worker `cortex-app`, Cloudflare 0 binding, 0 D1.
- **BLOCKS** V0.3.3, SHA `700ae421a2c2d56536c3793afa9f6f807973e72a` verrouillé ; import au build de Réglages, Me notifier, thème, densité, shell et mise à jour. Pas de sources dupliquées.
- **LINK** SDK navigateur commit `97f7ed86525351421a25eb204ae29c14f60a6443` ; pairing autorisé par propriétaire et intents opaques versionnées. LINK Worker/D1/DO et notifications inchangés. Synchronisation inter-app non livrée ; patchs externes en attente de contrat authentifié, chiffré et droits explicites. Push réel iPhone en attente de recette ; aucun second moteur.
- **Données** IndexedDB local : agenda, rappels, notes, contacts, budget ; export/import JSON. Pas de synchronisation entre appareils.
- **FORGE** : [#53](https://github.com/Leomgl/forge-app/issues/53). Ajouter CORTEX à la liste officielle des projets Forge (interface + Worker OAuth) dans un changement coordonné, sans redéployer le Worker en effaçant ses secrets.

# Dépendances techniques — nouvelle génération

## Validation officielle — deux premiers modules de BLOCKS

**Validation utilisateur officielle — 16 novembre 2026 : feuilles LABO 01 et 02 TERMINÉES.** L'utilisateur confirme que **tout est au vert** sur son iPhone. **Feuille 01 : Réglages universels VALIDÉS**, avec thèmes Graphite/Papier/Tabac/Minuit/Sauge, densités Compact/Normal/Spacieux, préférences persistantes, LINK dans Réglages, version, recherche et mise à jour. **Feuille 02 : Me notifier VALIDÉ**, avec RDV/pass/stock, rappels J/H/M, six échéances max et interface adaptable. **Les deux premiers modules sont prêts à être intégrés aux futures apps depuis BLOCKS V0.3.3**, coffre canonique non-PWA. LABO **V0.4.3** expose **deux badges « ✓ VALIDÉ »**, [CI verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43780598930), version Cloudflare `7e0d3d94-8c68-4bfe-98f3-45f5da605aba` à 100 % ; code de modules inchangé. **FORGE #50 = Terminé**, tandis que #43/#44 restent les suivis évolutifs LABO et BLOCKS. LINK V0.13.0 et son moteur Push sont inchangés. **Ne pas confondre cette validation de modules avec un Push réel LABO (#47 non encore attesté) ou l'automatisation des rappels (#49 non développée).**


## M7 — Dernière évolution : densité universelle des Réglages

**M7 (16/11/2026) — Densité d'affichage réutilisable.** Le module **Réglages** de BLOCKS V0.3.3 accueille désormais dans **Préférences** un sélecteur **Compact / Normal / Spacieux**. API bibliothèque `src/density.mjs` : `normalizeDensity`, `applyDensity`, `mountDensityPicker` ; CSS structurel dans `src/blocks.css` (Shell, Réglages, Me notifier). Densité indépendante de la palette : cinq DA toujours disponibles, cibles tactiles ≥44–48 px. L'app hôte applique et persiste la valeur, **BLOCKS n'est pas une app**. **LABO V0.4.2** est le banc d'essai : `Réglages → Préférences`, persisté sous `lab-density-v1`, 18 assets déployés à 100 % sur Cloudflare Worker `f330afdb-6e13-433a-9977-05cca1666ae0`. GitHub CI [BLOCKS verte](https://github.com/Leomgl/blocks-app/actions/runs/43779810916) et [LABO verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43780036982). **LINK V0.13.0 inchangé** : 25 bindings, D1 et ordonnanceur Push préservés. Me notifier toujours validé à 100 %, aucune modification de ses règles. **À valider physiquement sur iPhone** : les trois densités sur les cinq thèmes, persistance, lisibilité, tactile et absence de régression ; le module Réglages sera déclaré prêt pour les futures apps après cette validation. Voir tickets FORGE #44/#43.


## État de livraison finale — BLOCKS V0.3.2 / LABO V0.4.1

**M6 correctif de finition (16/11/2026)** : modules **Réglages** et **Me notifier** inchangés fonctionnellement, cinq thèmes disponibles. **BLOCKS V0.3.2** (source canonique, non-PWA) remplace la couleur blanche fixe du monogramme Shell par une couleur dérivée du fond, pour un contraste suffisant dans Minuit et les quatre autres palettes. **LABORATOIRE V0.4.1** importe BLOCKS depuis le SHA `8fedfa3e4c08c958a44b7bdc1c7616978ea48cae`, 17 assets. CI [BLOCKS verte](https://github.com/Leomgl/blocks-app/actions/runs/43778662474) et [LABO verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43778771460) ; Worker LABO `e9205982-fbe9-48b9-8cc2-902f798ec662` déployé **100 %**. LINK V0.13.0 inchangé (25 bindings, scheduler Push préservé). Me notifier **validé par l'utilisateur** ; connexion LABO ↔ LINK **validée sur iPhone** ; à confirmer physiquement : rendu des 3 nouveaux thèmes et réception d'un Push test.


## M6 — Réglages/Apparence et Me notifier · 16/11/2026

**M6 — deux premiers modules réutilisables finalisés (16/11/2026).** **BLOCKS V0.3.1** est la bibliothèque canonique (ce n'est PAS une PWA). MODULE 1 : **Réglages universels** incluant la section **Apparence** et le sélecteur visuel `mountThemePicker` de cinq thèmes partagés : **Graphite**, **Papier**, **Tabac** (crème / brun tabac / cuivre), **Minuit** (bleu nuit / acier) et **Sauge** (olive / lin). Le **Shell/Structure** existe toujours comme composant technique, mais n'a plus de feuille démo autonome. MODULE 2 : **Me notifier** est **validé à 100 % par l'utilisateur**, code `notify-editor.mjs` inchangé ; configuration J/H/M jusqu'à 30 jours, maximum six rappels, RDV/pass/stock. LABO **V0.4.0** ne conserve que ses deux feuilles de test « Réglages » et « Notifier », branche BLOCKS au commit `7bdc4c897e142737b15ffac5574866a5a3eae191` (17 assets), et laisse la connexion LINK sous Réglages. Les préférences et rappels restent locaux/persistants. CI [BLOCKS](https://github.com/Leomgl/blocks-app/actions/runs/43777820077) et [LABO](https://github.com/Leomgl/laboratoire-app/actions/runs/43778200631) vertes ; worker LABO `6a9e17aa-1dad-422d-a859-20711acd3525` à 100 %. LINK V0.13.0, ses 25 bindings, D1 et ordonnanceur Push sont inchangés. **Association LABO ↔ LINK confirmée par l'utilisateur sur iPhone** ; réception d'un Push LABO et recette visuelle des nouveaux thèmes non encore confirmées physiquement. Suivi FORGE #43/#44, moteur automatique futur #49.


## M6 — Réglages et Me notifier : état actuel validé en code

**M6 — finalisation technique Réglages + Me notifier, 16 novembre 2026.** **BLOCKS est uniquement une bibliothèque**, pas une application PWA. Source canonique `Leomgl/blocks-app` **V0.3.0**, SHA précis `846f92de94a8a31ace6f4a4ed58bd9d4fd4bf3c4` (CI [verte](https://github.com/Leomgl/blocks-app/actions/runs/43777534738)). Deux composants stabilisés : **Réglages universels** (recherche, catégories dont état ouvert conservé après update, préférences fournies et persistées par l'app, actions async, version/À propos/mise à jour PWA et cleanup des extensions `decorate`) et **Me notifier** (`blocks.notify.v1` inchangé, RDV/pass/stock, offsets 0–43200 min / max six, rappel exactement à l'échéance, changement de contexte isolé). Les contrats sont dans `blocks-app/docs/SETTINGS.md` et `docs/NOTIFY-EDITOR.md`. **LABORATOIRE V0.4.0** importe ces modules via `blocks.lock.json` épinglé, les affiche et garde localement les valeurs **par scénario** ; bundle GitHub `cb2e69537d5bfdc75456cd7cf58c2955192fb4ff`, CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43777784164), Worker Cloudflare existant `a15681c1-11cc-4183-b600-3fc7ed6ddd53` à 100 % (16 assets, 0 bindings). **LINK V0.13.0 inchangé** (25 bindings, DO, D1 et Push) et LABO↔LINK déjà associé sur iPhone. **Statut : code & tests validés, recette tactile iPhone de V0.4.0 encore nécessaire pour clôturer les modules.** Suivi dédié : [FORGE #50](https://github.com/Leomgl/forge-app/issues/50). Réception d'un vrai Push test encore à valider dans [#47](https://github.com/Leomgl/forge-app/issues/47), automatisation métier RDV non encore réalisée : [#49](https://github.com/Leomgl/forge-app/issues/49).


## M5 — État de référence actuel pour les autres threads

**M5 — liaison par code courte livrée (15 novembre 2026).** LINK **V0.13.0** et LAB **V0.3.2** ont été déployés à 100 % sur Cloudflare. L'app source affiche un code alphanumérique de 12 caractères (**10 minutes**, un usage), l'utilisateur le saisit dans **LINK → Applications**, vérifie le nom et l'origine HTTPS, choisit explicitement la permission de notification sous Face ID, puis revient dans l'app : la connexion se finalise par un échange de preuve locale, sans second formulaire. Les anciennes interfaces « Inscrire une nouvelle application » et « Créer un contrat » restent dans **Réglages → Outils avancés** pour maintenance uniquement. LINK utilise une **table additive** `hub_pairing_requests` dans sa D1 existante, un rate limiter déjà présent et son Worker actuel, sans autre moteur ou ressource. Tests automatisés LINK [verts](https://github.com/Leomgl/link-app/actions/runs/43774926751) et LAB [verts](https://github.com/Leomgl/laboratoire-app/actions/runs/43775044930). LINK Worker `dd12eb78-eef1-4ed2-a8ff-1429ad0a3425` à 100 %, **25 bindings**, même DO `LinkNotificationScheduler`, migration `link-live-notifications-v1`. LAB Worker `0117f6b4-ab19-481b-a881-e4d9ea0f9e1d` à 100 %, 16 assets. **Recette d'association sur iPhone encore nécessaire.** Le test de programmation de rappel dans LAB reste MANUEL ; le comportement produit « création/modification/suppression d'un RDV ⇒ intentions vers LINK automatiques ⇒ Push seul par LINK » demeure la prochaine phase du ticket [FORGE #49](https://github.com/Leomgl/forge-app/issues/49).


## État courant : LINK V0.12.1 / LAB V0.3.1 / BLOCKS V0.2.3

**LINK V0.12.1** déployé à 100 % : correctif Réglages vides, 25 bindings et ordonnanceur DO préservés ; ticket [#48](https://github.com/Leomgl/forge-app/issues/48), CI [verte](https://github.com/Leomgl/link-app/actions/runs/43772864227). **Décision de la cible UX** : une app neuve affiche un code, l'utilisateur l'entre dans LINK et autorise les permissions avec Face ID. Après association, la création/modification/suppression d'un RDV avec « Me notifier » provoque automatiquement un upsert/cancel de rappels opaques, à révision monotone et outbox hors ligne ; LINK planifie et envoie seul le Push même si l'app est fermée. Ticket [#49](https://github.com/Leomgl/forge-app/issues/49). LAB V0.3.1 et son invitation LINK→LAB, ainsi que les boutons « Préparer / Programmer », restent exclusivement une **simulation/test M4**, pas le parcours produit définitif.

## Dépendances actuelles du prototype

**15 novembre 2026 — M4 liaison LINK (prototype intégré et déployé).** LABORATOIRE **V0.3.1** / BLOCKS **V0.2.3** / Worker LINK **V0.12.0 inchangé**. LINK a reçu un SDK navigateur (sans modification du Worker) au commit `9d98d59dbbd52ec6a818b4dbe2c1ce7a52cb2b1e` : échange d'invitation copiée `LHI1.laboratoire.…`, capacité temporaire et conversion de rappels en commandes `link.notification.command.v1` opaques. LAB a intégré l'enrôlement propriétaire, la vérification du grant, un stockage d'identité côté PWA (IndexedDB) et la programmation **volontaire d'une seule occurrence de test**. SDK LINK CI [verte](https://github.com/Leomgl/link-app/actions/runs/43771185719), LAB CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43771334855), Worker LAB `4b4448a1-9988-4d97-8d4a-8d91688c80d0` déployé à **100 %** sur la même URL. 16 assets, pas de nouvelle D1, Worker ou moteur Push. **La liaison réelle nécessite encore l'inscription et le grant propriétaire dans LINK, puis le test physique iPhone avec abonnement Push LINK.** Les révisions, annulations, files hors ligne et gestion du stock événementiel restent à construire avant app métier. Suivi : [FORGE #47](https://github.com/Leomgl/forge-app/issues/47), [manuel M4](./LINK-BRIDGE.md).

## Rôles

- **LINK** est le noyau technique indépendant de chaque PWA métier. Il centralise les enveloppes de transport chiffrées, l'inscription des apps, les permissions et les notifications Web Push iOS. Il conserve sa D1, ses secrets et son Durable Object.
- **FORGE** orchestre le développement mais ne transporte aucune donnée métier. Il est servi depuis `forge-hub`, Worker disposant de GitHub OAuth pour créer des issues et commentaires dans `Leomgl/forge-app`. Aucune dépendance de FORGE à une app métier.
- **Nouvelles apps** : pas encore définies. Chaque app garde ses données et connecte les services communs à LINK uniquement une fois autorisée.

## Bibliothèque et laboratoire

**BLOCKS** contient uniquement le rendu/comportement partagé, les thèmes, les champs, l'onglet Réglages et le configurateur de notifications ; ne transporte aucune donnée entre apps. **LABORATOIRE** importe et teste ces modules à travers des feuilles indépendantes, avec données fictives et sans stockage Cloudflare. Les apps métiers utiliseront la même version des blocs, par import, pas par copier-coller. LINK conserve l'exclusivité de la distribution des événements et Web Push. Voir [ARCHITECTURE-BLOCKS.md](ARCHITECTURE-BLOCKS.md) et [LABORATORY.md](LABORATORY.md).

## Sources officielles et assemblage de LAB

- **Release courante : V0.2.1.** BLOCKS `93a04c6429ade3885ef1c3cf3133240ecf3059e8` ; LAB `0d3fcc4fff9ae552557f13c289e309c6aeb9df47`. Durées personnalisées jours/heures/minutes en 03, stock inchangé ; aucun Push local. V0.2.0 testée sur iPhone ; V0.2.1 à vérifier.
- Bibliothèque : [Leomgl/blocks-app](https://github.com/Leomgl/blocks-app), modules `src/theme.mjs`, `src/shell.mjs`, `src/settings.mjs`, `src/notify-editor.mjs` et `src/blocks.css`, version V0.2.1, commit `93a04c6429ade3885ef1c3cf3133240ecf3059e8`.
- PWA : [Leomgl/laboratoire-app](https://github.com/Leomgl/laboratoire-app), version V0.2.1, Worker `laboratoire-app` indépendant, aucune D1/binding. `blocks.lock.json` référence précisément la version de BLOCKS.
- Le bundle `dist/worker.mjs` est généré depuis les **deux sources privées** et sert le JS/CSS partagé depuis l'origine HTTPS de LAB. Pas de duplication maintenable, pas de requêtes cross-origin et pas de service Worker BLOCKS séparé.
- Deux dépôts privés : les CI de chaque repo restent autonomes ; recompiler avec les deux dépôts clonés et authentifiés. Pas de PAT inter-repos configuré. L'utilisateur a confirmé la recette fonctionnelle de V0.2.0 sur iPhone ; V0.2.1 reste à vérifier. Le bloc ne programme rien ; l'adaptateur LINK n'est pas encore branché.

## Contrat d'intégration d'une nouvelle PWA

1. Définir son identité et sa propre origine HTTPS. L'inscription dans LINK est propriétaire et explicite.
2. Définir des flux nécessaires seulement, avec contrat nominatif, portée de permissions, version et garantie de non-écriture automatique sans consentement.
3. Partager le composant de création de notifications **Me notifier**, la logique des rappels et les réglages communs sans recopier le moteur de livraison.
4. Vérifier les coûts et quotas Cloudflare avant toute nouvelle D1, lecture récurrente, Worker ou tâche ; viser l'offre gratuite et les événements plutôt que le polling.
5. Tester séparément : lecture/écriture, fonctionnement hors ligne, reprise, double envoi, révocation, chiffrement, notifications iOS, mise à jour de PWA.
6. Mettre à jour FORGE (ticket, versions, registry et décisions).

## Invariants

Pas de liaison de données directe entre les futures apps hors LINK. Pas de notification locale concurrente : livraison centrale LINK. Pas d'app automatique créée depuis des données historiques. Aucune permission implicitement activée. Aucun changement sur les secrets, D1 ou ordonnanceur existants sans justification ni sauvegarde.

Les références techniques de la génération antérieure sont archivées hors de cette documentation active.
