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


## GARAGE ↔ RITUEL ↔ NEXUS — état DÉPLOYÉ (FORGE #24, 12/11/2026)
- Garage devient propriétaire du **lieu canonique** des produits Rituel importés avec ID `rituel:<sourceId>` et de l'appartenance aux ensembles ; Rituel reste propriétaire du catalogue source, des stocks/routines/achats/photos ; Nexus du séjour et de l'agenda.
- Deux connexions E2EE `sourceApp=garage` scopes `rituel_catalog`, `rituel_location_request` (Rituel→Garage), et `garage_locations` (Garage→Rituel), code de jumelage privé composite `GRL1`. Canal Nexus→Garage `trip_context` séparé avec code privé `NXL1`. Révisions, pages et ACK après persistance. Garage ne reçoit ni stock ni photos ni numéro de série.
- CORS autorise uniquement l'origine Garage ajoutée, relais D1 `nexus-link-api` migré à la CHECK `garage` par `bridge/migrations/0003_garage.sql` (4 connexions/51 événements inchangés, 0 FK). Workers Nexus API, relay, Rituel web et Garage Web à 100 % avec bindings existants préservés. Pas de nouveau service payant.
- Les apps gardent leurs stockages locaux, la synchronisation se produit quand les apps sont ouvertes/en ligne ou via le bouton, pas automatiquement en permanence en tâche de fond. Les trouvailles Rituel pré-V1.9 sont préservées. La recette Safari iPhone et les conflits réels ne sont **pas validés** ; FORGE #24 reste En cours.

## Projet de centralisation LINK — FORGE #28 (12/11/2026)

- Nouvelle PWA `link-app` V0.1 déployée **en lecture seule**. Elle affiche uniquement un inventaire documentaire des sept relations principales ; `linksManaged: 0`. Le Worker nouveau ne possède aucun D1/binding, ne lit aucun appairage ni IndexedDB externe et refuse tout POST/PATCH/DELETE.
- **Frontière impérative** : la plateforme de contrôle LINK pourra orchestrer permissions, diagnostic et flux, mais chaque app garde son stockage/validation métier. Le relais Santé `sante-nexus-link` et ses secrets/bases restent isolés du relais commun `nexus-link-api`.
- Les clés historiques NXL1/NXS1/GRL1, source IDs, ACK, revisions/tombstones et pairings doivent être préservés ; basculer app par app seulement après backups, tests anti-doublons, reprise offline et recette iPhone. Les anciens écrans ne sont supprimables qu'en fin de migration.
- Contenu actuel et limites : voir `docs/LINK-V01.md`. Source officielle LINK V0.2 : dépôt privé Leomgl/link-app, worker.mjs et src/protocol.mjs. La copie FORGE incubation/link-app/ n'est plus la source de vérité. Aucune synchronisation iPhone en arrière-plan permanent n'est garantie par une PWA.

## LINK V0.2 : contrat de contrôle, non-régression (12/11/2026)

- Le SDK de contrôle est testable mais **non branché aux clients historiques** ; API /api/v1/contracts purement documentaire, linksManaged=0.
- Conservation impérative des relais D1 séparés, des secrets, pairings NXL1/NXS1/GRL1 et des sources d'identité. Aucune migration sans vérification du chiffrement, des permissions, des ACK et des sauvegardes.
- La V0.1 a reçu confirmation iPhone ; V0.2 reste à tester physiquement, puis les futures migrations seront vérifiées relation par relation.

## LINK LDO1 — transfert de diagnostic manuel, sans migration (12/11/2026)

- **Origine et consentement :** Gaming calcule un relevé anonymisé en lecture seule ; l'utilisateur choisit de le transmettre à LINK via URL **fragment-only** (`#observe=LDO1...`) ou copier/coller. Le fragment ne part pas dans la requête HTTP, aucun nouvel endpoint serveur n'a été créé et aucune lecture d'IndexedDB inter-origines n'est tentée.
- **Schéma strict :** seuls `schema`, `contractId`, `app`, `createdAt`, `paired`, `autoEnabled`, `possible`, `pending`, `scopeCount`, `lastPublishedAt` sont acceptés. Inconnus, codes expirés de plus de 7 jours, compteurs impossibles et champs privés rejetés ; stockage LINK local effaçable. **Rapport non authentifié**, à considérer comme instantané déclaratif, jamais preuve de succès distant.
- **Ancien transport inchangé :** Gaming continue les chiffrages/propositions via `nexus-app-api` et l'ACK ancien. Aucun point de synchronisation n'est migré ; le cas Santé reste séparé, D1 et push existants préservés.
- **À tester** : iOS PWA → PWA peut ouvrir Safari plutôt que LINK, d'où fallback copier/coller ; vérifier également les notifications Gaming et la consultation de Nexus après l'upgrade du Worker Gaming. Test physique non encore effectué.

## Diagnostic croisé LINK V0.4 (12/11/2026)

- Nexus connaît les messages Gaming qu'il a conservés dans son `linkInbox` : `pending`, `accepted` et `rejected`. Les compteurs ne partent jamais automatiquement vers LINK : appairage et clés d'authentification NXL1 restent dans Nexus.
- L'utilisateur choisit de produire un code de diagnostic `LDN1` depuis Nexus puis de le coller/ouvrir dans LINK. Les deux relevés `LDO1`/ `LDN1` sont validés et comparés sur le téléphone ; chaque source reste propriétaire de son stockage.
- Comparer les comptes Gaming « propositions actuelles » et Nexus « historique conservé » fournit seulement une **indication**, jamais une preuve d'identité de paire ni de message identique. Les états `pending` sont de nature différente (à publier côté Gaming, à examiner côté Nexus).
- Aucune modification de `nexus-link-api`, `sante-nexus-link`, D1, paires, secrets, notifications ou clients historiques. Pour automatiser à l'avenir, il faudra un contrat explicite d'authentification, un consentement utilisateur et une preuve cryptographique côté source/destinataire.

## Passkeys Nexus — protocole WebAuthn iOS, correctif 12/11/2026

- Les passkeys Nexus utilisent le domaine `leomgl.github.io`, des défis générés par `nexus-app-api` et des assertions WebAuthn ; le coffre cloud utilise séparément sa clé de récupération. L'UI lock ne chiffre pas les données IndexedDB et Face ID ne remplace jamais la clé de coffre.
- Après signalement iPhone, le client prépare les défis avec `NexusCloud.session()` puis déclenche `navigator.credentials.get/create` directement dans le tap, pour préserver l'activation utilisateur iOS. Challenge côté serveur valable 180 s ; client n'accepte une préparation en mémoire que 90 s.
- Fallback par clé de récupération inchangé. Aucun changement des bindings API, des credentials existants, de la base D1 ou des circuits LINK. Vérification réelle Face ID sur appareil en attente (Forge #30).

## LINK V0.5 — clés existantes et HMAC cloisonnés (12/11/2026)

- Les deux apps concernées ont déjà le **même secret de jumelage NXL1**. La nouvelle bibliothèque `link-audit.js` en dérive une **clé HMAC distincte par HKDF**, sans jamais exposer la clé d'origine. Entrée d'empreinte : `sourceKey` pair-scoped et jour UTC ; sortie : pseudo-identifiant de 96 bits **éphémère**. Aucun ID brut/seed/payload/titre/transaction ne quitte les origines PWA.
- Source Gaming : `linkOutbox` des messages déjà publiés ; source Nexus : `linkInbox` des messages déjà persistés. Le même tag et la même révision indiquent une correspondance locale indicative. Tags différents, versions différentes, jour UTC ou clé différents sont explicitement signalés. Rapports partiels au-delà de 128 événements.
- **Important :** les codes LDA1 sont transportés *volontairement*, sans signature d'origine, exclusivement dans un fragment URL ou par copier-coller. Ils restent dans `localStorage` de LINK après validation et peuvent être effacés. Comparaison **non opposable**, jamais une attestation d'ACK serveur, de délai réseau ou d'identité humaine.
- Aucune modification des tables D1, données utilisateurs, protocoles existants, clés, permissions, copies IndexedDB ni endpoints de synchronisation. La V0.5 ne doit jamais servir à autoriser automatiquement une suppression d'ancien Link. Ne pas confondre développement du diagnostic et migration du transport.
