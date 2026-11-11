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

Code/docs : [README](https://github.com/Leomgl/Vestiaire-app/blob/main/README.md) · [Fitting V0.4](https://github.com/Leomgl/Vestiaire-app/blob/main/docs/FITTING-V04.md).

## Comment tenir ce document à jour

Après une livraison qui change le comportement ou la structure, ajouter le jalon, **puis** joindre un lien vers commit/PR et tests dans l'issue FORGE. Pour la vérité des versions et des fichiers, reconsulter l'app ciblée à chaque nouvelle intervention.
