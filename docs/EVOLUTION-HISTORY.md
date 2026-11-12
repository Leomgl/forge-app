# Historique fonctionnel des applications — repères pour les interventions

**Instantané documentaire au 11/11/2026.** Cette synthèse vient des README des quatre dépôts. Les tags, commits et branches courants de chaque dépôt priment si le projet a évolué depuis. Ne pas inférer qu'une fonctionnalité a été validée sur iPhone parce qu'elle est inscrite ici.

## NEXUS

| Version documentée | Évolution | Risque de régression |
|---|---|---|
| V0.4 | Captures intelligentes, Notifications Web Push iOS, coffre chiffré optionnel | Consentement, planification serveur, exports et récupération de clé |
| V0.5 | Passkey WebAuthn en bêta | Verrouillage ≠ chiffrement local, origine GitHub Pages partagée |
| V0.6 | Alertes propres à chaque rendez-vous | Compatibilité des anciennes préférences générales |
| V0.7 | Cockpit et préférences visuelles | Safe areas, stockage et écran mobile |
| V0.8 | Budget, journal, récurrences et prévisions | Non-régression sur les mouvements et sauvegardes |
| V0.9 | Catégories, épingles et projections | Compatibilité ancienne structure Budget |
| V0.10 | Corbeille, restauration et réinitialisations sûres | Ne pas supprimer les identifiants liés |
| V0.11 | Journal Budget éditable et filtres | Journal existant et opérations |
| V0.12 | Architecture de connexion inter-apps | Séparation permissions et données privées |
| V0.13 | Jumelage chiffré NEXUS ↔ GAMING | Scopes, révoquer, clés/codes |
| V0.14 | Réception des propositions Gaming → NEXUS | Vérification humaine des modifications |
| V0.16 | Achats comptabilisés, contacts enrichis | Pas de dépense involontaire et sauvegarde de photos |
| V0.17 | Contacts compacts, tri A-Z, tags, favoris, photos vCard | Liens Agenda/Rappels, index sur iPhone |
| V0.17.2 | Réimport complet des contacts avec conservation des IDs | Ne pas casser relations ni corbeille |

Code/docs : [README](https://github.com/Leomgl/nexus-app/blob/main/README.md) · [Contacts](https://github.com/Leomgl/nexus-app/blob/main/docs/CONTACTS-V017.md).

## GAMING

| Version | Évolution | Risque |
|---|---|---|
| V0.2 | NEXUS LINK — transport/jumelage de test | Chiffrement et permissions |
| V0.3 | Bibliothèque, stockage interne/M.2/USB, thèmes | Conservation base IndexedDB |
| V0.4 | Passes, calendrier, rappels, safe area iOS | Distinction événement / notifications effectives |
| V0.5 | Jaquettes, saisons, numérotation, Web Push iOS | Pass non acheté ≠ dépense |
| V0.6 | Jeux possédés mais désinstallés + Wikimedia | Stockage déclaré, images non téléchargées en D1 |
| V0.7 | Propositions chiffrées Gaming → NEXUS | Aucune écriture automatique dans NEXUS, SHA de déduplication |

Code/docs : [README](https://github.com/Leomgl/gaming-app/blob/main/README.md).

## RITUEL

| Étape | Évolution | Risque |
|---|---|---|
| Versions de base | Routines matin/soir, stock manuel, export JSON, PWA offline | Conservation de la clé historique localStorage |
| V1.5 | Notifications intelligentes et push iOS Worker/D1, prévision stock à partir de relevés, statistiques 7/30 jours | Ne pas déduire du stock automatiquement, conserver historique et souscriptions |
| V1.7–V1.9 | Trousse, photos et kits locaux ; voyages Nexus opt-in ; emplacement partagé avec Garage, stock restant à Rituel | Clé locale historique, consentements des liens et non-transfert des photos |
| V1.10 (PR #2, 12/11) | Lotion Sport 70 ml et baume Ayurveda 70 ml : fiches, stocks indépendants, photos officielles ; routine corps Sport ou Sakura et mains optionnelles | Coche historique `sakura` conservée, deux stocks inconnus au départ, pas d'écriture dans les autres apps ; CI JS validée |

Code/docs : [README](https://github.com/Leomgl/rituel-app/blob/main/README.md) · [Architecture gratuite](https://github.com/Leomgl/rituel-app/blob/main/docs/ARCHITECTURE-APPS-GRATUITES.md).

## VESTIAIRE

| Version | Évolution | Risque |
|---|---|---|
| V0.1 | Dressing, Studio initial, mannequin importable, looks, images en IndexedDB, export `.vestiaire` | Intégrité médias et tenues |
| V0.2 | Filtres, variantes, planning, migration IndexedDB V1 → V2 | Anciennes sauvegardes/restauration |
| V0.3 | Import privé Fits, vêtements superposés, données d'origine | Photos privées, liens et import atomique |
| V0.4 | Moteur `fit-engine.js`, proportions et couches, recalage ancien Fits, retour arrière | Tenues réelles sur iPhone, miniatures et sauvegardes |
| V0.5 | Calibration du mannequin de référence, repères photo | Aucun upload de mannequin |
| V0.6 | NEXUS LINK opt-in, catalogue chiffré V1 limité à 24 tenues | Consentement, secrets et non-divulgation des photos |
| V0.7 | Studio tactile un doigt/deux doigts, menu de remplacement et retrait | Calques et positionnement, recette iPhone validée par utilisateur |
| V0.7.1 | ✓ confirmation, zones à portée de main, catalogue complet en pages V2 avec Nexus V0.21.8 | Reprise de transfert, synchronisation atomique et non-régression iPhone |

Code/docs : [README](https://github.com/Leomgl/Vestiaire-app/blob/main/README.md) · [Fitting V0.4](https://github.com/Leomgl/Vestiaire-app/blob/main/docs/FITTING-V04.md).

## FORGE — outil de suivi lui-même

| Version | Évolution | Vigilance |
|---|---|---|
| V0.2 | GitHub Issues comme registre canonique, instructions IA et cartographie inter-apps | Ne pas confondre brouillons locaux et tickets publiés |
| V0.3 | Trois statuts À faire / En cours / Terminé avec source GitHub | Préserver les corps des issues, `updated_at`, éviter écrasement d'historique |
| V0.4 | Origine Cloudflare dédiée, GitHub App OAuth, création et modification sans PAT, tickets internes FORGE | **GitHub App pas encore configurée ; recette iPhone requise**. Ne jamais publier secrets OAuth ou déclarer l'authentification validée avant essais réels |

Ticket de mise en route : [FORGE #3](https://github.com/Leomgl/forge-app/issues/3). Guide : [Connexion GitHub](GITHUB-AUTH.md).

## Comment tenir ce document à jour

Après une livraison qui change le comportement ou la structure, ajouter le jalon, **puis** joindre un lien vers commit/PR et tests dans l'issue FORGE. Pour la vérité des versions et des fichiers, reconsulter l'app ciblée à chaque nouvelle intervention.


## Nouvelles étapes du 12 novembre 2026

| Application | Version | Évolution | À préserver / non-régression |
|---|---|---|---|
| SANTÉ | V0.6 | Habitudes : boissons, eau, caféine estimée, tendances et partage facultatif de résumé NEXUS | Coffre chiffré, consommation saisie manuellement, consentement, aucun journal détaillé exporté |
| SANTÉ | V0.6.1 | Boutons Enregistrer Agenda/Carnet/dossier sécurisés, validation JS et retour d'erreur | Données existantes, CSP, traitements, rappels push, tests iPhone physiques encore nécessaires |
| NEXUS | V0.21.9 | Bloc de synthèse hydratation Santé dans Pulse, après opt-in | Vestiaire V0.21.8, données reçues minimales, liaison E2EE |
| NEXUS | V0.21.10 | Remboursements anticipés : capital/taux déclarés, durée ou mensualités recalculées, correction manuelle ; revenus réguliers en pause et versements variables | Écritures historiques immuables, non-double comptage, nouvelles prévisions/push par échéance, calcul bancaire indicatif, test Safari à faire |
| GARAGE | V0.1.0 | Inventaire, lieux, prêts, kits, photos locales et sauvegarde JSON | Aucun lien Nexus activé, IndexedDB local, exports non chiffrés |
| FORGE | V0.5.0 | Colonnes par état, filtres/priorités, formulaire compact, suivi des 6 apps | OAuth GitHub, tickets et métadonnées, workflow, aucune donnée privée |
| RITUEL | V1.7 | Collection, photos locales, parfums et trousses de voyage avec checklist | Préserver `rituel_personal_v1`, photos dans sauvegardes personnelles, aucun lien Agenda Nexus activé sans consentement |


## FORGE V0.6 — 12/11/2026

- Issue `#15` : fiche ticket intégrée `#ticket/N`, lecture du Markdown et des commentaires GitHub, ajout de réponses par l'utilisateur connecté.
- Commentaires structurés de l'assistant après chaque travail, à publier explicitement pendant la conversation.
- Aucun nouveau service de stockage, OAuth inchangé. Points sensibles : affichage sans XSS, pagination GitHub, session expirée, cache PWA, rendu Safari.


## FORGE V0.7 — 12/11/2026

- Nouveau type de rattachement `GÉNÉRAL` pour les chantiers transversaux et les futures apps, sans entrée fictive au catalogue des applications.
- Portée optionnelle (toutes, plusieurs, création, autre) avec détail libre ; filtres, cartes et API GitHub alignés.
- Pas de nouveau stockage, pas de migration, OAuth conservé. Recette : créer un ticket général connecté, le lire, filtrer, changer de statut, et contrôler sa présence sur GitHub puis tester un ticket NEXUS classique.


## FORGE V0.8 — navigation à 4 onglets (12/11/2026)

- Accueil recentré sur les états `À faire` et `En cours` ; les cartes `closed` ne sont plus mélangées aux actives.
- Onglet Terminés : archives filtrables, liens GitHub et journal intégral conservés ; retour du détail à l'onglet source.
- Onglets Nouveau (formulaire inchangé) et Apps (catalogue/documentation), navigation fixe responsive avec safe area iOS.
- Aucun changement de données, de GitHub OAuth ou du Worker. Cache PWA incrémenté. À vérifier : actualisation et retour depuis archives sur Safari iPhone.

## NEXUS V0.21.11 ↔ SANTÉ V0.8.0 — Agenda médical (FORGE #25, 12/11/2026)

- NEXUS : date/heure/lieu de rendez-vous médicaux exportés et importés via Santé LINK, activation par consentement, case Médical dans Agenda, imports des anciens titres explicites, réplication des modifications et suppressions, notifications Agenda inchangées. PR #12 `f241030a67`, tests et Pages GitHub en succès.
- SANTÉ : réception `nexus.calendar.v1` dans coffre AES-GCM par lots validés, déduplication de rendez-vous identiques, traitement conservateur des conflits, sauvegardes/médicaments/Face ID conservés. PR #4 `5e06706898`, Worker Cloudflare 100 % version `c0e22389-f469-40e0-a014-5b31ef86e562` ; 47 tests + smoke Chromium validés.
- Risques : ancienne PWA mise en cache, absence de synchro native en arrière-plan, titres ambigus, conflits concurrents, origin de Nexus non chiffré, récupération/export des données. Recette iPhone physique non effectuée par l'assistant ; ne pas inventer des rendez-vous dans les tickets publics.

## GARAGE V0.2 et dépendances du ticket #24 (12/11/2026)

| Application | Version | Évolution | À préserver / non-régression |
|---|---|---|---|

| GARAGE | V0.2.0 | Lieux ajoutables pendant la saisie/déplacement, recherche de visuels Wikimedia Commons + URL/photo locale, liens réciproques avec option suivre les déplacements | IndexedDB + export V1 inchangés ; photo locale prioritaire ; déplacements historisés ; prêtés non déplacés automatiquement. PR garage-app#1, `12ccbdbd3e`, Worker `265ee24b` à 100 %, CI verte, Safari non vérifié |



## Intégration Garage V0.3 (12/11/2026)

| Application | Version | Fonction | Tests / vigilance |
|---|---|---|---|

| GARAGE / RITUEL / NEXUS | V0.3 / V1.9 / V0.21.12 | Liaison chiffrée du catalogue Rituel et des emplacements Garage, demandes de mouvement dans les deux sens et création consentie d'ensemble pour séjour Nexus | Garage PR #2 `20341c5b02`, Rituel PR #1 `5172c36d3f`, Nexus PR #13 `5ef0b3369d`, Workers à 100 %, D1 migration contrôlée 4/51 et FK 0, CI/Pages réussies ; recette iPhone E2E en attente |

## 2026-11-12 — LINK V0.1 (FORGE #28)

- Worker Cloudflare `link-app` autonome déployé 100 % sur workers.dev ; site PWA avec navigation mobile, icône, manifest et cache offline.
- Registre documentaire 6 apps / 7 relations, API lecture seule, diagnostic LINK, préparation locale ; **0 connexion migrée**.
- Dépôt officiel privé Leomgl/link-app créé ; copie d'incubation FORGE désormais historique.
- Aucun ancien relais, jumelage, menu, IndexedDB, D1 ni notification modifié. Vérification réelle sur iPhone en attente.

## 2026-11-12 — LINK V0.2 / catalogue FORGE

- V0.1 validée sur iPhone par le propriétaire. V0.2 : source autonome dans Leomgl/link-app, 7 contrats, SDK et suite de tests de déduplication, conflits, ACK durable et rollback.
- API documentaire /api/v1/contracts ; LINK reste en lecture seule, zéro paire migrée et aucun ancien relais modifié.
- Forge : app LINK ajoutée au registre/filtre/formulaire, backend redéployé en préservant ses 3 bindings et nouveau cache PWA.
- Recette tactile Safari V0.2 et essai de publication d'un ticket LINK dans Forge encore à confirmer.

## 2026-11-12 — LINK V0.2.1, bouton Diagnostic Safari

- Signalement iPhone : « Vérifier les contrats » visible mais sans réaction. Cause probable : HTML nouveau et JavaScript ancien simultanés, car le Service Worker servait `/app.js` en cache-first.
- Correctif uniquement dans `Leomgl/link-app/worker.mjs` : URL de script versionnée `/app.js?v=0.2.1`, stratégie réseau d'abord pour JS/CSS, nouveau cache `link-shell-v0.2.1`, clic délégué et message immédiat de chargement/résultat/échec.
- GitHub Actions LINK : **19/19 tests réussis** (https://github.com/Leomgl/link-app/actions/runs/43300049906), dont simulation du clic et erreur réseau. Worker Cloudflare version `c2f46e21-6fc5-4c86-aed0-7e121cae7409` à 100 %, aucune modification des Workers/D1 hérités. Recette Safari V0.2.1 à confirmer sur le téléphone ; ticket transversal #28 toujours en cours.

## 2026-11-12 — LINK V0.3 + GAMING Observateur V0.12 (FORGE #28)

- Validation utilisateur : « 7/7 » des contrats dans LINK V0.2.1, correctif cache précédent confirmé sur iPhone.
- LINK V0.3 déployée : écran d'observation Gaming → Nexus, code LDO1 validé localement et stockage effaçable, aucun nouveau relais ou D1. CI 28/28 : https://github.com/Leomgl/link-app/actions/runs/43307349058 .
- Gaming : option Réglages → LINK · Observateur ; production d'un relevé anonymisé en lecture seule, ouverture de LINK via fragment URL et code copie/collage. CI 4/4 + build Worker : https://github.com/Leomgl/gaming-app/actions/runs/43307457130 .
- Workers Cloudflare `link-app` et `gaming-app` publiés chacun à 100 %. Bindings (D1, 2 secrets, VAPID public) + cron 5 min Gaming préservés et vérifiés après déploiement. Aucun Worker Nexus/Santé, clé de jumelage ou donnée métier modifié.
- L'export de diagnostic est manuel et l'état est déclaratif ; aucun lien véritable n'a changé de transport. **Recette Safari LINK V0.3 et Gaming V0.12 restant à effectuer**, ainsi que la vérification des push depuis l'appareil.

## 2026-11-12 — Recette iPhone validée : observateur LINK V0.3

- **Validation du propriétaire par capture iPhone** : diagnostic Gaming → Nexus importé et affiché dans LINK V0.3. Instantané local horodaté 12/11/2026 22:19 : jumelage configuré, auto activée, 12 propositions possibles, 0 à actualiser, 7 permissions ; dernière publication déclarée dans Gaming le 11/11/2026 à 17:14. Les valeurs sont un relevé local, pas de la télémétrie temps réel.
- V0.2.1 « Vérifier les contrats » 7/7 déjà confirmée précédemment. Les systèmes historiques restent en place.
- **Non attesté** : réception effective de chaque proposition côté Nexus, notifications push et synchronisation automatique orchestrée par LINK, révocation/rollback. Projet #28 toujours ouvert.

## 2026-11-12 — LINK V0.4 / NEXUS observateur (Forge #28)

- LINK V0.4 : nouvel import volontaire `LDN1` du diagnostic côté Nexus, affichage de ses propositions locales à examiner/acceptées/ignorées et comparaison agrégée côte à côte avec Gaming `LDO1`. Gardes-fous de validation de rapport et avertissements sur la non-preuve de réception ou de parité d'appairage.
- Nexus `link-import.js` : ajoute « Diagnostic LINK » dans Propositions Gaming ; code non sensible sans IDs ni montants ; cache `nexus-v0.21.12.1` et script versionné. Aucun nouveau stockage, schéma, relay ou secret.
- Source : dépôts privés `Leomgl/link-app` et `Leomgl/nexus-app`. Worker LINK version `9e3b99e8-c77d-49f2-9b9c-065a00ee7397` déployé 100 %. Tests automatisés Nexus et LINK verts ; **recette Safari iPhone de V0.4 et de la nouvelle action Nexus non encore confirmée**.
- Ancienne liaison Gaming → Nexus intacte. Prochaine étape : preuves de réception authentifiées, consenties et réversibles.

## 2026-11-12 — Recette LINK V0.4 et incident Face ID Nexus (#30)

- Retour iPhone utilisateur : rapport Nexus → LINK V0.4 importé et affiché. Instantané du **12/11/2026 22:44** : paire Gaming configurée, 7 permissions, **12 propositions conservées**, dont **9 à examiner, 2 acceptées, 1 ignorée**, dernière création locale 11/11/2026 17:13. Ce relevé est un état local, pas une preuve d'ACK ou de livraison cryptographique.
- Incident distinct : **Face ID / passkeys Nexus ne fonctionne plus**. Aucun changement de `passkey-client.js` dans LINK V0.4. Risque WebAuthn iOS (challenges et digest asynchrones avant `navigator.credentials.get/create`) identifié.
- Correctif NEXUS : préparer le défi avant clic, appeler WebAuthn dans le geste, gérer expiration/erreurs, préserver le fallback récupération. Script versionné `passkey-client.js?v=02114`, SW `nexus-v0.21.12.2`. **CI 85/85 et GitHub Pages verts** ; recette Face ID sur iPhone encore à confirmer, Forge #30 **ouvert**.
- LINK #28 reste EN COURS ; les anciens liens/chiffrements/secrets et l'API Nexus sont inchangés.

## 2026-11-12 — LINK V0.5 — concordance événement par événement

- Validation utilisateur V0.4 par capture : Nexus 12 messages conservés (9 à examiner, 2 acceptés, 1 ignoré), 7 permissions ; Gaming 12 possibles, 0 à republier, 7 permissions. Confirmation du parcours d'import Nexus → LINK ; identité exacte des propositions et ACK non démontrés par cette capture.
- Déploiement V0.5 : `link-app` Worker Cloudflare `7ab8b192-8014-4352-b963-1ea11e412bde` à 100 % avec panneau « Concordance des événements », validation des rapports LDA1, correspondance des événements/révisions en lecture seule et stockage local effaçable. CI LINK **44/44** réussis.
- `gaming-app` Worker `c3eca787-7949-4607-8764-f0353eb5f37e` à 100 %, nouvelle action Réglages → LINK · Vérifier les événements, sans action sur l'ancien envoi. CI Gaming **9/9** réussis. D1, deux secrets push, variable VAPID et cron `*/5 * * * *` conservés après déploiement.
- `nexus-app` sur GitHub Pages : `link-audit.js` chargé avant `link-import.js`, cache versionné, nouveau bouton « Vérifier les événements » dans le panneau Propositions Gaming. Suite Nexus **90/90** et Pages vertes lors du contrôle, sans changement de schéma, clé ou service de synchronisation.
- Portée : comparaison **indicative et manuelle** des alias HMAC temporaires, ne prouve ni ACK serveur ni authentification de l'exportateur ; recettage iPhone V0.5 encore à faire, retour arrière permanent jusqu'à migration E2E. FORGE #28 reste ouvert.

## 2026-11-12 — LINK V0.6 recentrage et pont pilote

- Le propriétaire recentre le chantier sur un cockpit unique LINK et gèle les autres évolutions jusqu'à la centralisation complète (#28).
- LINK V0.6 : tous les 7 contrats dans l'onglet Connexions, les diagnostics avancés repliés, protocole de contrôle `management.mjs` sans secrets. Cloudflare Worker `93e219bd-a1c6-4bb5-8dfb-f386dcdbacf5` à 100 %.
- Gaming/Nexus : `link-bridge.js` avec confirmation contextuelle, sans menu permanent ; Gaming Worker `417ff6f8-02fe-4f76-bf25-5044e49ecdb0` à 100 %, push et cron préservés ; Nexus Pages et CI réussies.
- CI LINK 51/51, Gaming 13/13, Nexus 94/94. Recette iPhone V0.6 non confirmée, 6 autres flux non pilotables, jumelages et contrôles hérités conservés.

## 2026-11-13 — LINK V0.6.1 : faux « jumelage absent » corrigé, limite iOS identifiée

- Retour utilisateur : « Autoriser la vérification » renvoyait « Aucun jumelage dans cette app », malgré un jumelage Gaming ↔ Nexus déjà confirmé. Cause : contrôle déclenché sur une origine ouverte dans Safari, stockage séparé de la PWA iPhone installée.
- Gaming et Nexus `link-bridge.js` renvoient `context-isolated` en navigateur non standalone sans paire visible ; LINK n'affirme plus de suppression de jumelage. Un ancien relevé local indiquant une paire est rappelé avec date, sans statut temps réel.
- Synchronisation centralisée empêchée tant qu'une vérification de cette app n'est pas déclarée réussie dans les dix dernières minutes. Aucun lien recréé/révoqué, aucun secret transmis.
- Worker LINK V0.6.1 `84f1fbfe-9a51-4ba3-9bd2-23a34a2112b5` et Gaming `ab750dfc-6941-4eba-aa73-c4bba1783e27` à 100 %, bindings/push/cron conservés, Nexus GitHub Pages succès ; CI LINK 52/52, Gaming et Nexus vertes.
- Limite structurelle toujours ouverte : LINK ne peut pas réveiller directement une autre PWA en retrouvant son IndexedDB ; concevoir un vrai pont authentifié et consenti. Recette iPhone encore requise, Forge #28 non clos.

## 2026-11-13 — LINK V0.7 / passage à un hub distribuant les messages

- L'utilisateur confirme le rôle de LINK : **point de contact unique** de toutes les apps, ancien et futur catalogue, et serveur qui redistribue les enveloppes chiffrées selon les passerelles configurées ; fin des actions basées sur l'ouverture Safari.
- Nouveau moteur D1 `src/hub.mjs`, SDK `src/client-sdk.mjs`, schéma SQL `migrations/0001_hub.sql`. Tests d'inscription d'une nouvelle app, de droits, idempotence, confidentialité, reprise et ACK : **63/63 verts**.
- D1 indépendante EU `link-hub-db` créée (UUID `d81d8dbe-1167-477e-a41b-8db74f5eec45`), mais migration SQL impossible : limite quotidienne D1 gratuite dépassée, API code 7500. Pas de passage payant ou contournement.
- Worker LINK V0.7 `20ef81a9-a51a-4e51-9a13-4803972a61c9` à 100 %, API hub **non activée / staged** faute de DB initialisée et de secrets propriétaire ; anciens relais inchangés. Documentation archivée dans LINK/docs/HUB-V07.md, détail et état dans Forge #28.
- Prochain jalon unique : SQL D1 → binding/identité propriétaire → apps enrôlées → Gaming ↔ Nexus en shadow mode → iPhone E2E + rollback → 6 autres flux. Aucun chantier hors #28 avant stabilisation.
