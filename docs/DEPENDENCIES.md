# Contrats et dépendances inter-applications

FORGE ne synchronise aucune donnée applicative ; il suit les changements et leurs conséquences. Tout nouveau lien entre apps exige une discussion et une analyse explicite des permissions.

## Connexions documentées

| Source → Destination | État (11/11/2026) | Contrat à préserver | Risques |
|---|---|---|---|
| GAMING → NEXUS | Actif V0.7 + NEXUS V0.14 | NEXUS LINK, jumelage, scopes approuvés, AES-GCM, proposition à réception puis validation | Doubles tâches, dépenses fictives, suppression, données en clair, perte de jumelage |
| RITUEL → NEXUS | Import documenté côté NEXUS | Vérifier code d'import actuel et format accepté avant changement | Doublons, permissions, ancienne sauvegarde, collision d'identifiants |
| VESTIAIRE → NEXUS | **Actif** : Vestiaire V0.7.1 + Nexus V0.21.8 | Consentement et jumelage NEXUS LINK AES-GCM, scope `outfit_catalog` ; V1 (24 looks) accepté en lecture, V2 pages chiffrées (24/page, 200 pages max) et stockage tampon `vestiaireTransfers[]` vérifié avant ACK ; activation **uniquement du catalogue complet**, aucun échange de photo/vêtement détaillé/agenda | iPhone non encore validé sur V2, anciens clients V1, coupure réseau/lot partiel, révocation, sauvegardes contenant le secret LINK |
| VESTIAIRE → RITUEL | Idée future/non activée | Aucune intégration active à supposer | Effets de bord et données liées sans consentement |
| SANTÉ ↔ NEXUS (E2EE) | **Actif sur les deux sens depuis Santé V0.8.0 + Nexus V0.21.11** (FORGE #25) | Même jumelage NXS1 AES-GCM et scope `health_calendar`, Nexus consentement supplémentaire `sendMedical`, `nexus.calendar.v1` en lots de 12, `sante.calendar.v1` existant, titre/date/lieu/état de suppression uniquement ; IDs, révisions, tombstones, conflits conservés ; Nexus notifie les RDV, Santé les médicaments | Nexus stocke son Agenda non chiffré, Santé coffre chiffré ; sync à l'ouverture seulement ; doublons si fiche médicale ambiguë ou anciens clients ; tests Safari iPhone nécessaires |

## Sécurité Santé V0.7 — déverrouillage local via passkey PRF (FORGE #17)

- Face ID/passkey en option, WebAuthn PRF compatible iPhone : phrase secrète Santé enveloppée localement sous AES-GCM, après authentification de l'appareil, pour **ouvrir réellement** le coffre chiffré existant. Contrairement à Nexus V0.5, ce n'est pas un simple verrou visuel ; aucune donnée de ce parcours dans D1 ou NEXUS LINK.
- Les tables IndexedDB Santé, les sauvegardes et le contrat E2EE Santé→Nexus restent inchangés ; la phrase secrète historique est toujours le recours en cas d'absence de PRF, nouvel iPhone ou restauration. La clé locale Face ID facultative n'est pas dans l'export.
- Worker Cloudflare Santé version `49103383-b962-43ca-86f2-a58b4013bff7` activée à 100 % après CI (44 tests réussis). Aucun nouveau binding. Recette réelle passkey Safari iPhone **en attente** ; rollback Worker sans toucher les données. Détails : `Leomgl/sante-app/docs/PASSKEYS-V07.md` (dépôt privé).

## Frontières d'hébergement

- `leomgl.github.io/nexus-app` et `/rituel-app` partagent **une même origine** malgré leurs sous-chemins. Ne pas considérer les chemins comme une isolation de sécurité du navigateur.
- GAMING, VESTIAIRE et SANTÉ ont leurs **Workers Cloudflare** distincts. Santé et son relais **sante-nexus-link** utilisent des origines dédiées et des bases D1 européennes séparées ; le relais Santé N'EST PAS le relais LINK des autres apps. Santé garde son coffre local chiffré et ses notifications de médicaments ; Nexus garde ses propres Push Agenda, et le contenu Santé reçu reste dans son IndexedDB non chiffré.
- FORGE consulte **les dépôts et issues publics seulement** et ne doit jamais accéder aux IndexedDB/Workers de production des apps.

## Checklist rapide avant un correctif

1. Modifie-t-on un schéma exporté, une API, un identifiant ou une souscription push ?
2. Y a-t-il un consommateur dans une autre app ? Chercher dans les deux repos.
3. Quelle version de l'app est déjà sur l'iPhone ? Une migration se fait-elle sans effacer des données ?
4. L'opération peut-elle être faite hors-ligne et reprise sans doublons ?
5. Les notifications et les sauvegardes restent-elles valides ?
6. Quel test de régression couvre les interactions entre les applications ?
7. Comment restaurer l'état précédent si la recette iPhone échoue ?

Toute modification de contrat est à documenter ici **dans le même chantier**.


## GARAGE (V0.1.0 — 12/11/2026)

- Application indépendante sur une nouvelle origine `garage-app.q9pfwtztsc.workers.dev`, sans dépendance aux bases ni endpoints des apps existantes.
- Inventaire local IndexedDB privé ; **aucun lien inter-app actif**. Les ensembles et mouvements sont gérés uniquement dans Garage.
- Projet futur `GARAGE → NEXUS` : résumés d'ensembles pour événements de voyage, uniquement après consentement explicite, jumelage chiffré et scopes séparés. Ne pas partager photos, numéros de série, factures ou inventaire complet par défaut.
- **Risque :** l'origine PWA iPhone peut perdre son stockage ; sauvegarde JSON personnelle manuelle et migrations additives obligatoires. Le Worker et le dépôt sont indépendants d'un déploiement automatique.


## Compléments du 12/11/2026

- SANTÉ V0.6 partage **uniquement sur opt-in** un résumé quotidien d'hydratation / caféine vers NEXUS V0.21.9. Aucun journal de boissons, ordonnance ou document clinique ne doit partir vers le stockage non chiffré de NEXUS. Le bloc Pulse ne doit pas régresser le catalogue Vestiaire (transfert paginé V2).
- GARAGE reste indépendant, aucun lien NEXUS actif ; si un futur événement Agenda déclenche une proposition de kit, prévoir permission par catégorie et transfert minimal chiffré, jamais les photos/numéros de série.
- FORGE V0.5 est uniquement un tableau de tickets publics. L'ajout SANTÉ/GARAGE n'autorise **aucune lecture de données privées**. Le Worker `forge-hub` doit accepter leurs préfixes dans les tickets sans être connecté aux Workers/D1 des apps elles-mêmes.


- **NEXUS → RITUEL (trousse de voyage) : prévu, non actif en RITUEL V1.7.** Ne pas faire croire que l'agenda Nexus remplit déjà une trousse ; futurs échanges par permissions, sans export de photos ni inventaires personnels complets.

## NEXUS V0.21.11 ↔ SANTÉ V0.8.0 — FORGE #25 (12/11/2026)

- Sens Nexus → Santé ajouté **sans modifier le relais D1** : même `sante-nexus-link`, même jumelage, scope `health_calendar`. Nexus exporte seulement les rendez-vous marqués médical ou reconnus dans le titre (jamais notes, ordonnances ou consultations), Santé déchiffre et écrit dans son coffre local AES-GCM, puis ACK après écriture. Pagination 12 par page (maximum 8), revision et tombstones ; Santé renvoie le calendrier existant, qui reste limité à 27 rendez-vous/vaccins visibles par snapshot et à 365 jours futurs.
- L'utilisateur doit activer « Synchronisation ↔ » dans Nexus ; `autoEvents` est activé en même temps pour la réception. Santé doit être ouverte et déverrouillée pour importer. Les rendez-vous identiques titre/date/lieu sont rapprochés, mais les conflits concurrents sont préservés et signalés, jamais arbitrairement écrasés. Nexus préserve la corbeille et les notifications d'Agenda ; Santé n'envoie pas de push RDV.
- Déploiements confirmés : Nexus PR #12 fusionnée `f241030a67`, GitHub Pages + CI en succès ; Santé PR #4 fusionnée `5e06706898`, Worker version `c0e22389-f469-40e0-a014-5b31ef86e562` à 100 %, 47 tests unitaires + smoke Chromium passés (la première tentative Chromium a expiré, relance réussie). Bindings D1/VAPID/PEPPER et cron conservés. **La recette Safari iPhone et les données réelles ne sont pas vérifiées par l'assistant**, l'IndexedDB local reste inaccessible. En cas de problème : désactiver la synchronisation Nexus, conserver les deux données locales et utiliser la sauvegarde avant tout rollback.


## Projet de contrat RITUEL ↔ GARAGE ↔ NEXUS (FORGE #24, diagnostic du 12/11/2026)
- **État** : non implémenté et non déployé. Les Workers ont été consultés. La base Garage `garage_personal_v1` reste locale, Rituel utilise `rituel_personal_v1` en localStorage, Nexus garde l'agenda et le relais NEXUS LINK chiffré.
- **Modèle cible** : Rituel possède la fiche produit, le stock, l'achat, les routines ; Garage ne reçoit qu'une référence d'objet Rituel (ID stable, nom/marque/catégorie), son lieu canonique, ses mouvements et son appartenance aux ensembles ; Nexus pilote les propositions de séjours, sans modifier de stock ni déplacer les objets automatiquement.
- **Flux cible** : émission par consentement explicite ; E2EE AES-GCM ; scopes distincts pour catalogue, déplacement et contexte séjour ; accusé réception uniquement après persistance locale ; révisions, idempotence, conflits d'écriture et reprise offline. Ne jamais partager photos, niveaux de stock, numéros de série, coordonnées ou documents par défaut.
- **Attention migration** : le relais `nexus-link-api` a une CHECK D1 sur `source_app` qui accepte seulement `gaming`, `rituel`, `vestiaire`. Un nouveau `garage` comme source nécessite une migration SQL préservant paires et événements existants, ainsi que la liste de scopes, les allowlists CORS du relais et `nexus-app-api`, et les clients de jumelage. Ne pas déployer simplement un client « Garage » sans mettre à jour toute cette chaîne.
- **Risque d'ergonomie** : Rituel V1.8 contient déjà des modèles de trousses et reçoit des séjours Nexus via un canal distinct. Éviter deux checklists contradictoires : laisser les trousses Rituel historiques intactes ; les ensembles mixtes nouvellement créés vivent dans Garage.
- **Tests indispensables** : stock/routines/achat/push Rituel inchangés ; objets/liens/prêts/exports Garage inchangés ; agenda/budget/notifications Nexus inchangés ; anciens appairages et requêtes relay après migration ; deux copies hors-ligne, modification simultanée, suppression/réinstallation, D1 sans perte, Safari iPhone.
