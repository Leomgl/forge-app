## SYNAPSE officiellement VALIDÉ — 16/11/2026

L'utilisateur confirme l'approbation définitive de **SYNAPSE** déjà intégré dans **CORTEX**. Capture compacte AUTO / RDV / RAPPEL / NOTE / DÉPENSE, confirmation obligatoire, parser local et contrat `blocks.capture.v1` conservés. **BLOCKS 0.12.0 / SYNAPSE 1.0.0**, commit `f6ca7eb09c5a8d2490777ce491c987dce8071947` ; qualification de stabilité sans modification du code de capture. Cortex utilise déjà la même fonctionnalité via le module `synapse@0.5.0` épinglé dans son ancien lock : **pas de redéploiement Cortex nécessaire ni effectué**. **LABORATOIRE V0.9.4** commit `0c9e01accb18e1ae0212848dcb26c9de7b663211`, cinq feuilles **01 / 02 / 03 / 04 / 05 ✓ VALIDÉES**, plus de prototype en attente. Worker LABO existant `laboratoire-app` à **100 %**, version `f4a3d90e-4bd9-4479-a949-6aa235ea1b3d`, zéro binding supplémentaire. [FORGE #58 clôturé](https://github.com/Leomgl/forge-app/issues/58). Aucun changement des données Cortex, de LINK, ni du moteur Push.

---

## VALIDATION OFFICIELLE — PHARMA BLOCKS 1.0.0 (16/11/2026)

**PHARMA** est désormais **VALIDÉ** comme module réutilisable suite à l'approbation explicite de l'utilisateur. UI compacte (semaine 7 jours, cases de prise, Traitements avec stock/recharge intégrés, Historique), schéma compatible `blocks.ordo.v1`, import `@leo/blocks-app/pharma` / `pharma-styles`, `mountPharma`. **BLOCKS 0.11.0**, module `ordo@1.0.0`, commit `fee33da9d474eb99995e15aa58f5355d5f3d8cdb`, CI verte. **LABORATOIRE V0.9.3**, feuille **05 ✓ VALIDÉ**, avec 01/02/04 validées, 03 SYNAPSE en essai. Worker `laboratoire-app` version `f9162cd9-26a4-4d12-8460-c6012dcc7014` déployée à **100 %** ; 0 binding, aucune modification LINK/Cortex. [FORGE #76 terminée](https://github.com/Leomgl/forge-app/issues/76). Suite [FORGE #77](https://github.com/Leomgl/forge-app/issues/77) : intégration métier Cortex et notifications LINK **non réalisées** ; sécurité et rappels à qualifier avant usage réel.

---

## MISE À JOUR 16/11/2026 — PHARMA 0.2.1 stocks intégrés

PHARMA (feuille 05 LABORATOIRE) réunit maintenant **traitements et stocks dans une seule fiche** : solde, seuil bas et réapprovisionnement. Plus de volet Stocks indépendant. BLOCKS `0.10.2` / `ordo@0.2.1` commit `4263e7905d1ee857a844524f1b39e4d9cab7f4c7` ; LABO `V0.9.2` commit `08e460530ee0193ef99d942f4cc8b3bac80c47ca` déployé à 100 % sur le Worker existant `laboratoire-app` (version `80efcc87-62e3-448d-9ce3-c4d858bfec06`). Aucune nouvelle base, Worker, autorisation LINK ou notification. Recette iPhone en attente, [FORGE #76](https://github.com/Leomgl/forge-app/issues/76).

---

## ACTUEL — 16/11/2026 · PHARMA expérimental dans LABORATOIRE

**PHARMA** est un **module BLOCKS réutilisable, pas une PWA installable distincte**. Son nom précédent ORDO est abandonné côté utilisateur. Démo interactive dans la **feuille 05 de LABORATOIRE V0.9.1** : https://laboratoire-app.q9pfwtztsc.workers.dev/ . Design compact type Rituels, prise à cocher, 7 jours, volets traitements/stocks/historique ; deux fiches fictives, stockage local de test. Module présent dans **BLOCKS 0.10.1** (module interne `ordo@0.2.0` pour compatibilité). Aucune nouvelle app, LINK inchangé, Cortex non connecté. **En attente de validation iPhone.** Ticket [FORGE #76](https://github.com/Leomgl/forge-app/issues/76).

---

## Situation actuelle — 16/11/2026 · LINK V0.14.0 / Rituels V0.4.0 / Cortex V0.5.4

**Ce résumé est prioritaire sur les anciennes fiches historiques ci-dessous, conservées pour traçabilité.**

- **LINK** : Worker `link-app` déployé à **100 %**, version Cloudflare `2a67b323-aca6-46cd-807d-fc531ff8b99f`, **25 bindings préservés** (D1 `HUB_DB`, moteur de notifications/DO inchangés). Volets par app source dans Relations. Contrats `rituels-cortex-kits / travel_kits` existant et `rituels-cortex-routine / routine_summary` proposé mais fermé tant que le propriétaire ne l'a pas préparé/autorisé.
- **Rituels** : [PWA](https://rituels-app.q9pfwtztsc.workers.dev/) **V0.4.0**, Worker version `b73e65a2-dae5-40d8-87f2-615fce77bef6`, 100 %, 0 binding, catalogue et routines IndexedDB privés inchangés. BLOCKS notifications officiel `0.9.1` conservé. Projection de routine limitée au % du jour, Matin X/X, Soir X/X (libre inclus dans %), uniquement après autorisation LINK.
- **Cortex** : [PWA](https://cortex-app.q9pfwtztsc.workers.dev/) **V0.5.4**, Worker version `3611b3c6-d015-4a00-a254-e3aca4208a02`, 100 %, 0 binding. Nouvelle carte Routine Rituels dans Accueil personnalisable ; lecture du statut du jour via LINK seulement. Aucun nom de soin reçu, aucun statut de la veille affiché comme « aujourd'hui ».
- **Stockage** : migration additive `0007_routine_summary.sql` dans la **D1 LINK existante** (une ligne agrégée par source). Aucune nouvelle D1, Worker, cron, moteur Push ou abonnement.
- **Recette à confirmer sur iPhone** : LINK → Relations → Rituels → Routine Rituels → Accueil Cortex : préparer puis autoriser sous Face ID ; ouvrir Rituels puis Cortex ; tester %/X-X et mise à jour après coche, ainsi que révocation. **Ne pas marquer comme validé physiquement avant confirmation.** Suivi [FORGE #67](https://github.com/Leomgl/forge-app/issues/67).

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

## RITUELS V0.1.0 — première PWA publiée (16/11/2026)

- **Nom / ID** : Rituels / `rituels` ; routine skincare personnelle, produits, stocks et trousses pour week-ends.
- **Repo GitHub** : [`Leomgl/rituels-app`](https://github.com/Leomgl/rituels-app) (privé), branche `main`, commit source `c053a7dde4f4ad8d72fcbfed42b7a8e12f1efdcf`.
- **Hébergement** : Worker Cloudflare statique `rituels-app` ; URL `https://rituels-app.q9pfwtztsc.workers.dev/` ; version Cloudflare `039ff052-8b20-4584-a509-39e2dce9047d`, trafic 100 %, workers.dev activé ; **0 binding, 0 D1, 0 cron, 0 scheduler Push**.
- **App** : `V0.1.0`, manifest / Service Worker indépendant, stockage IndexedDB local, sauvegarde JSON et import manuel, autonomie offline après mise en cache.
- **BLOCKS** : V0.3.3 verrouillé SHA `700ae421a2c2d56536c3793afa9f6f807973e72a`; shell, settings, theme, density, pwa-update et CSS canoniques importés au build, sans copie de source dans le repo.
- **LINK/Cortex** : pas de SDK actif, aucune permission accordée, aucune dépense/liaison trousse envoyée. Contrats futurs via LINK exclusivement : `rituels.purchase.recorded.v1`, `rituels.kit.linked.v1`, validation de permission/anti-doublons préalable.
- **Recette** : six tests métier OK et CI GitHub verte ([exécution](https://github.com/Leomgl/rituels-app/actions/runs/43790514310)). Mise en ligne confirmée Cloudflare **et contrôle HTTP public réussi** ([GitHub Actions](https://github.com/Leomgl/rituels-app/actions/runs/43790849303)) ; recette tactile/installation iPhone à confirmer. Fiches produits officielles et éventuel branchement LINK à compléter ultérieurement. [FORGE #54](https://github.com/Leomgl/forge-app/issues/54).

## CORTEX V0.1.2 — consolidation de l'interface (16/11/2026)

## LINK live — V0.13.3 au 16/11/2026

Le Worker `link-app` sert **LINK V0.13.3 à 100 %** (Cloudflare version `f637f007-d717-4ade-a285-ada0be63647f`). Ce patch corrige uniquement la vérification des mises à jour PWA anciennement susceptible d'être servie depuis un cache obsolète : manifeste réseau non pré-caché et URL anti-cache. **25 bindings D1/DO/Push préservés**, BLOCKS V0.3.3 inchangé, distribution des patchs BLOCKS restant un chantier distinct. Voir [FORGE #57](https://github.com/Leomgl/forge-app/issues/57). La recette de la nouvelle version dans la PWA iPhone reste à confirmer.


## LINK — Version live au 16/11/2026

LINK `link-app` est désormais en **V0.13.2** (Worker Cloudflare version `f07d14df-d75a-4813-a1c0-c990423beab6`, 100 %). Le raccourci Face ID du hero « Ton réseau » rejoint les points d'accès existants dans Réglages et Apps ; **même session propriétaire WebAuthn**, aucune API nouvelle. BLOCKS V0.3.3 reste au même verrou de dépendances, distribution automatique toujours à raccorder dans [#51](https://github.com/Leomgl/forge-app/issues/51). D1, DO, Push et les 25 bindings conservés. Suivi [FORGE #56](https://github.com/Leomgl/forge-app/issues/56) ; confirmation tactile du raccourci iPhone en attente.


**PWA publiée** : https://cortex-app.q9pfwtztsc.workers.dev/ ; Cloudflare `cortex-app` version `37880540-cdbc-4a31-8a8b-dbb254f31b4c` à **100 %**, sans nouveau binding/D1. [CI CORTEX V0.1.2 verte](https://github.com/Leomgl/Cortex-app/actions/runs/43787564500). **Recette tactile iPhone en attente**.

- Navigation : correction de la barre inférieure héritée de BLOCKS (transform/position), **5 icônes dynamiques** utilisant `currentColor` et les tokens d'apparence BLOCKS. Les raccourcis 1 et 2 suivent le module choisi.
- Modules : Organisation (Agenda, Rappels, Notes) ; Carnet personnel (Contacts) ; Finances (Budget).
- Agenda : calendrier mensuel cliquable, repères sur les jours occupés, recherche, sélection d'un jour pour voir/créer un RDV, prochains rendez-vous sous la grille.
- Rappels : bloc Aujourd'hui, liste par Tous / Priorité / Date, choix de priorité par rappel, zone Terminé.
- Contacts : prénom/nom, photos recadrées localement, quatre favoris, barre de recherche, index A–Z, import VCF et liens système tel/SMS/email.
- **Budget inchangé. LINK inchangé et ajourné**, en attendant une base UI robuste ; aucune synchronisation métier inter-app déclarée opérationnelle.
- Enregistrements IndexedDB et sauvegarde JSON préservés, BLOCKS V0.3.3 et SDK LINK verrouillés.
- Suivi : [FORGE #53](https://github.com/Leomgl/forge-app/issues/53).

# Registre de la nouvelle génération

## Livraison LINK — V0.13.1 (16/11/2026)

**LINK V0.13.1 est déployé à 100 %** sur le Worker existant `link-app` : [PR #9 fusionnée](https://github.com/Leomgl/link-app/pull/9), [FORGE #52](https://github.com/Leomgl/forge-app/issues/52), version Cloudflare `f2ae0fa5-2ff8-43d5-8b3c-c5a334f2e71f` (déploiement `6ab8ad55-d75d-4ae0-81d6-f98f46dc9123`). Interface uniquement : accueil réseau, fiches Apps/Relations, Réglages universels de BLOCKS V0.3.3 importés au build et verrouillés (commit `92c79f8bd26be85ecdf50260090d7ee5f80355ae`, hashes SHA-256). Les 25 bindings, D1 et Durable Object sont conservés. **Test physique iPhone encore à valider** (Face ID, pairing, Push et affichage). La distribution automatique des PATCH BLOCKS vers LINK reste à intégrer à la Phase 4 et ne doit pas être confondue avec l'import versionné actuel.


Version du registre : **2026-11-15 / FORGE V0.10.2**.

| Identifiant | Produit | Fonction | Dépôt GitHub | Cloudflare |
|---|---|---|---|---|
| LINK | LINK | Connexions chiffrées, permissions, notifications centralisées | `Leomgl/link-app` | Worker `link-app`, D1 `link-hub-db`, ordonnanceur DO |
| FORGE | FORGE | Catalogue, tickets, décisions, interventions et documentation | `Leomgl/forge-app` | Worker `forge-hub` (OAuth) |
| CORTEX | CORTEX | Gestionnaire personnel : agenda, rappels, notes, contacts, budget | `Leomgl/Cortex-app` | Worker `cortex-app` (statique, 0 binding, 0 D1) |
| RITUELS | Rituels | Routines skincare, produits, stocks, trousses | `Leomgl/rituels-app` | Worker `rituels-app` (statique, 0 binding, 0 D1) |

## Règle d'enregistrement d'une nouvelle app

**Avant toute création de PWA métier**, appliquer le [Guide obligatoire de création d'app](APP-CREATION-GUIDE.md). Déclarer ici nom, rôle, dépôt, URL, Worker, données, modules BLOCKS **importés** (versions/commit, jamais copiés), connexion LINK, permissions, coûts, tests et recette iPhone. La distribution automatique des mises à jour BLOCKS est suivie dans [FORGE #51](https://github.com/Leomgl/forge-app/issues/51) : **non implémentée à ce jour**.

## Projets de construction validés, hors catalogue métier

| Projet | Statut | Rôle |
|---|---|---|
| BLOCKS | Dépôt officiel `Leomgl/blocks-app`, V0.1.0 — thème/shell/réglages/styles, [FORGE #44](https://github.com/Leomgl/forge-app/issues/44) | Bibliothèque versionnée de composants et comportements personnalisables |
| LABORATOIRE | Dépôt officiel `Leomgl/laboratoire-app`, déployé V0.1.1 — recette post-migration à confirmer, [FORGE #43](https://github.com/Leomgl/forge-app/issues/43) | PWA légère, feuilles d’expérimentation pour tester et valider BLOCKS sur iPhone |

**Laboratoire :** https://laboratoire-app.q9pfwtztsc.workers.dev/ ; Worker `laboratoire-app` (0 binding/D1). **Sources officielles :** `Leomgl/laboratoire-app` (PWA + build + tests + artefact) et `Leomgl/blocks-app` (modules ESM + styles CSS + tests). **BLOCKS est épinglé au commit** `b41d3fcf99c1d9dcfc0935db007e6678316c77f2` par `blocks.lock.json`, et assemblé dans `dist/worker.mjs`. L'ancien bootstrap FORGE n'est plus qu'une archive.

**CORTEX V0.1.1** est la première PWA métier publiée en recette, non encore validée sur iPhone. URL : https://cortex-app.q9pfwtztsc.workers.dev/ ; repo `Leomgl/Cortex-app`, [ticket #53](https://github.com/Leomgl/forge-app/issues/53). Les données sont locales dans IndexedDB, sauvegardables par export JSON. L'app importe BLOCKS V0.3.3 (SHA `700ae421a2c2d56536c3793afa9f6f807973e72a`) et SDK LINK commit `97f7ed86525351421a25eb204ae29c14f60a6443` ; l'édition inter-app est en attente du contrat chiffré, tout comme la recette Push.

**CORTEX et RITUELS sont les deux PWA métiers publiées en recette ; aucune recette physique iPhone de RITUELS n'est encore validée.**

[Architecture commune](ARCHITECTURE-BLOCKS.md) · [Spécification Laboratoire](LABORATORY.md).

## Pour enregistrer une nouvelle app

Valider ensemble : nom et rôle principal, données propriétaires, écrans de base, modules partagés, notifications, flux LINK, dépendances, DA, dépôt et méthode de déploiement. Ensuite ouvrir le ticket de lancement, créer le dépôt, inscrire l'app dans FORGE et dans LINK, et exécuter la recette de sécurité et de notification iPhone.

La liste du formulaire FORGE et l'autorisation de création des tickets sur `forge-hub` doivent être modifiées ensemble lors de l'ajout d'une app. Un identifiant inconnu ne doit pas être accepté automatiquement.

**Historique archivé** : tickets GitHub #1–#39 et branche `snapshot/forge-preclean-2026-11-15`; ne fait plus partie du catalogue actif.
