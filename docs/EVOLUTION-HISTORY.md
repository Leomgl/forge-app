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

