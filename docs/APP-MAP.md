# Cartographie des applications (révision du 12/11/2026)

**Toujours vérifier le README et les commits actuels du dépôt ciblé :** ces notes sont un instantané historique, pas une version garantie.

## NEXUS — Leomgl/nexus-app

- **Version de code vérifiée :** V0.21.10 sur `main` (12/11/2026), avec simulateur de remboursements anticipés, plan révisable et revenus variables ; précédemment V0.21.9 après PR #11. Le titre du README indique encore V0.21.5 et n'est pas une source de version suffisante ; suivre les commits et `docs/PROJECT-HANDOFF.md`. URL PWA : https://leomgl.github.io/nexus-app/ ; cache iPhone à contrôler séparément.
- HTML/CSS/JS natifs, IndexedDB ; GitHub Pages ; backend Cloudflare Workers/D1.
- Modules : Notes, Agenda, Rappels, Contacts, Projets, Achats, Budget, capture intelligente, corbeille.
- Coffre cloud *optionnel* : snapshots chiffrés localement AES-GCM ; stockage local en clair ; passkey WebAuthn serveur en bêta. Notification Web Push sous condition d'opt-in.
- Liaison NEXUS LINK chiffrée avec Gaming ; proposition de données **à accepter** dans NEXUS ; ne jamais écrire directement une dépense non approuvée.
- Points du code/docs : `app.js`, `cloud.js`, `link-core.js`, `link-import.js`, `contacts-v017.js`, `README.md`, `docs/CONTACTS-V017.md`, `schemas/`, `backend/`.
- Risques : clés de coffre, liens contacts Agenda/Rappels, scripts d'import, migrations, cache PWA, accès aux données personnelles.
- **Budget V0.21.10** : revenus réguliers avec Pause/Reprendre (sans rétroactivité de revenus auto) et saisies manuelles de recettes variables. Les prêts peuvent recevoir un versement anticipé explicitement confirmé, simuler une réduction de durée ou de mensualité, puis appliquer une correction d'échéancier. Les projections et rappels utilisent le montant révisé pour chaque échéance. Capital/taux déclarés, pas d'Open Banking, calcul non contractuel hors frais/assurance ; historique et Journal conservés. Voir [docs/BUDGET-FINANCE-V02110.md](https://github.com/Leomgl/nexus-app/blob/main/docs/BUDGET-FINANCE-V02110.md). Tests CI et Pages validés, Safari iPhone à vérifier.
- À tester : état réel du tri alphabétique mobile et version effectivement installée avant de diagnostiquer.

## GAMING — Leomgl/gaming-app

- **Version documentaire :** V0.7 ; PWA https://gaming-app.q9pfwtztsc.workers.dev/
- HTML/CSS/JS natifs, IndexedDB, Worker Cloudflare, D1 pour les push.
- Bibliothèque PS5 (possédé ≠ installé), stockage interne/M.2/USB, jaquettes Wikimedia, saisons/pass même non achetés, DLC, calendrier, rappels mi-saison/J-14/J-7.
- **NEXUS LINK :** push des *propositions* chiffrées Gaming → NEXUS, après scopes et jumelage ; sur NEXUS réception et validation humaine. Les items non achetés ne créent aucune dépense réelle.
- Fichiers/docs : `app.js`, `nexus-sync.js`, `link-core.js`, `push-client.js`, `worker.mjs`, `wrangler.toml`, `README.md`.
- Risques : schéma des jeux/saisons, permissions et clés de jumelage, tâches/achats/dépenses dédupliqués, push iOS, séparation des données privées.

## RITUEL — Leomgl/rituel-app

- **Version du dépôt :** V1.7 ; PWA https://leomgl.github.io/rituel-app/
- HTML/CSS/JS natifs, données routines/stock en localStorage, Worker Cloudflare + D1 pour Web Push.
- Soins matin/soir, historique de stock manuel, réserve, estimations seulement à partir de relevés, statistiques 7/30 jours et rappels iPhone. **V1.7** : collection de soins/parfums/accessoires, photos locales, liens boutiques et trousses de voyage avec checklist. L'import automatique d'un voyage Nexus dans Rituel n'est pas encore actif.
- Fichiers/docs : `app.js`, `push-worker/`, `README.md`, `docs/PUSH.md`, `docs/ARCHITECTURE-APPS-GRATUITES.md`.
- Risques : ne pas casser la clé `rituel_personal_v1`, les historiques locaux, les souscriptions push ; ne pas committer la clé VAPID ni inventer des consommations de produit.

## VESTIAIRE — Leomgl/Vestiaire-app

- **Version documentaire :** V0.7.1 ; PWA https://vestiaire-app.q9pfwtztsc.workers.dev/
- HTML/CSS/JS natifs, IndexedDB (fiches, looks, médias, planning), Worker statique ; photos locales WebP, import privé Fits.
- Studio : mannequin personnalisable, ancrages et ordre de superposition via `fit-engine.js`, glisser/pincer, ✓ pour terminer l'édition d'une pièce, zones immédiatement au-dessus du mannequin, miniatures communes, recalage des looks importés.
- **NEXUS LINK actif** : opt-in V0.7.1 → Nexus V0.21.8, résumés de toutes les tenues en lots chiffrés, réception atomique sans photo ; Nexus conserve agenda/météo et recommandations.
- Sauvegarde `.vestiaire` VST1/manifeste : **non chiffrée** ; conserver privées les images et exports.
- Fichiers/docs : `app.js`, `fit-engine.js`, `fits-import.js`, `README.md`, `docs/FITTING-V04.md`, `edge-web/`.
- Risques : positions vestes/pantalons/ceintures, miniatures, origine des photos, migration IndexedDB ; sauvegarde obligatoire avant recalage massif. Validation iPhone avec mannequin/looks réels encore nécessaire.

## SANTÉ — Leomgl/sante-app

- **Code Santé V0.7.0 fusionné sur `main` le 12/11/2026** (PR #3, commit `1e528f3`), Worker Cloudflare `sante-app` **déployé à 100 %** (version `49103383-b962-43ca-86f2-a58b4013bff7`) ; dépôt privé. Adresse : https://sante-app.q9pfwtztsc.workers.dev/ . Bindings D1/secret VAPID/PEPPER et cron vérifiés inchangés. Recette Face ID Safari iPhone non encore confirmée.
- **Face ID (V0.7.0)** : passkey WebAuthn PRF facultative chiffrant localement une copie de la phrase secrète pour ouvrir le coffre AES-GCM lui-même ; la phrase reste indispensable comme secours, aucun nouvel endpoint, aucun schéma ni contrat Nexus modifié. Tests CI 44/44, vraie reconnaissance Face ID iPhone à confirmer ; consulter sante-app/docs/PASSKEYS-V07.md et ticket FORGE #17.
- **Modules** : traitements et prises, rendez-vous, vaccins, documents chiffrés, dossier ; V0.4 ajoute mesures/constantes et poids, journal de santé, professionnels, analyses/valeurs, préparation de consultation. Data médicales restent dans le coffre IndexedDB AES-256-GCM local, migration additive et sauvegarde existantes conservées.
- **Traitements V0.5.3** : nouveau formulaire iPhone sauvegardé dans le coffre chiffré, sélecteurs d'heures, dosage numérique mg/g/µg/mL/UI et unités par prise, rappels par traitement (jusqu'à 180 min avant + relance 15/30/60/120 min), stock de boîtes/plaquettes/flacons/sachets et prise confirmée = stock décrémenté. Anciennes fiches migrées sans perte, test d'enregistrement/déverrouillage simulé. Version Cloudflare active à 100 %, bindings Web Push et cron préservés ; recette réelle iPhone à faire.
- **Correctifs iPhone V0.5.2** : saisie de `1` unité validée (ancien input min 0.01/step 0.25 incompatible), 5 sections plus lisibles, édition complète avec conservation des prises, jusqu'à 8 rappels par horaire (décalages avant/à l'heure/après), stock tenant compte de la quantité historiquement consommée lors d'une annulation. CI GitHub réussie et Worker Cloudflare 100 % ; recette tactile/push iPhone à confirmer. Ticket FORGE #9.
- **Sauvegarde V0.5.3** : correction du bouton silencieux dans Safari en remplaçant la soumission native par `data-act='med-save'` (JS), validation manuelle et erreurs visibles dans la fiche sans perdre la saisie. CSP `form-action 'none'` maintenue. 34 tests Node et **vrai test DOM Chromium** (clic, ajout, modification, IndexedDB chiffré) réussis ; Cloudflare 100 %, D1/VAPID/cron conservés ; **recette Safari iPhone non encore confirmée**. FORGE #10.
- **Notifications :** Santé n'envoie plus que les push des **prises de traitements** ; rendez-vous et rappels de vaccins doivent venir de **NEXUS Agenda/Push** lorsque les événements Santé sont importés dans Nexus. Éviter les double notifications. Serveur Santé ne planifie plus les types non médicamenteux, D1 vidée de ces types.
- **Lien Santé ↔ Nexus actuellement disponible en sens Santé → Nexus seulement** : relais E2EE *distinct* sante-nexus-link.q9pfwtztsc.workers.dev, base D1 UE sante-nexus-link-db, scopes dose_summary/health_calendar, code privé NXS1. Santé choisit de partager les noms des médicaments ou non (désactivé par défaut). Nexus stocke le résumé et les RDV importés localement en **clair** (avec consentement), affiche Pulse prises faites/planifiées et gère les alertes Agenda. Authentification par pairing et AES-GCM ; pas de docs/analyses/ordonnances partagés.
- **Correspondance Nexus :** base V0.21.5, complétée par la V0.21.9 pour le bloc hydratation Pulse ; fichiers sante-link-core.js, nexus-sante.js/css, app.js, pulse-v018.js, settings-v0214.js, index.html, sw.js. Import calendrier manuel ou opt-in automatique, IDs stables et conflits sans écraser les éditions locales.
- **Pas encore livré :** modifications du calendrier Nexus répercutées vers Santé (vraie écriture bidirectionnelle), temps réel quand les deux PWAs sont fermées, validation iPhone E2E.
- **Important** : ne jamais modifier le relais LINK commun Gaming/Rituel/Vestiaire pour Santé ; ne jamais redéployer Santé sans ses DEUX modules worker.mjs et push.js et sans conserver bindings DB/VAPID/PEPPER. Références : sante-app/docs/PROJECT-HANDOFF.md, nexus-app/docs/PROJECT-HANDOFF.md, FORGE #4/#6.


## Quand ajouter une autre application ?

Mettre à jour ce fichier, `docs/DEPENDENCIES.md`, et la liste de projets de la PWA. **Ne jamais importer des données privées** depuis l'app dans FORGE pour l'y enregistrer.


## GARAGE — Leomgl/garage-app

- **V0.1.0 livrée le 12/11/2026** : https://garage-app.q9pfwtztsc.workers.dev/ ; repo **privé** https://github.com/Leomgl/garage-app .
- Application PWA autonome, Cloudflare Worker dédié, IndexedDB local `garage_personal_v1` (items/places/kits/history/meta), photos compressées et sauvegarde/restauration JSON.
- Fonctions : inventaire, lieux et sous-lieux, déplacements historisés, prêts et retours, ensembles de préparation, recherche et filtres.
- Pas de cloud sync ni liaison NEXUS dans V0.1 ; contrat NEXUS voyage à définir et à implémenter après validation, avec jumelage E2EE et permissions explicites.
- Worker actif sur workers.dev, déployé 100 % le 12/11/2026. **Pas de déploiement automatique relié aux commits du dépôt** : le build `npm run build` produit `dist/worker.js` à publier manuellement.
- Détails techniques et limites : `garage-app/docs/PROJECT-HANDOFF.md`. Test Safari réel en attente ; sauvegarde privée conseillée pour éviter les pertes de données iOS.


## Mises à jour vérifiées sur GitHub le 12/11/2026

- **SANTÉ V0.6 (PR #1 fusionnée)** : nouvel onglet Habitudes avec saisie eau/café/soda et autres boissons, caféine estimée, objectif, tendances sur sept jours, bilans bien-être optionnels. Tout demeure dans le coffre local chiffré ; seuls les agrégats quotidiens peuvent être envoyés à Nexus après consentement explicite. Pas de comptage de macros.
- **SANTÉ V0.6.1 (PR #2 fusionnée)** : correctif « Enregistrer » Agenda et Carnet sur iPhone, y compris dossiers, consultations, vaccins, mesures et documents. Cause identifiée : collision d'un champ `name=id` avec `form.id`. L'accès à l'attribut `id`, `novalidate`, les boutons JavaScript directs et les messages d'erreur explicites ont été ajoutés ; tests Chromium étendus. Confirmation Safari physique de la V0.6.1 toujours distincte des tests automatisés.
- **NEXUS V0.21.9 (PR #11 fusionnée)** : réception et validation facultative du résumé d'hydratation Santé dans Pulse, sans exposition des journaux détaillés et sans supprimer le lien Vestiaire V0.21.8.
- **GARAGE V0.1** : repo privé, Worker dédié et stockage local, sans lien Nexus activé. Statut prêt à tester sur iPhone, pas de synchronisation serveur.
- **FORGE V0.5 (ticket #12)** : tableau par états, tri des cartes par priorité, filtre priorité, formulaire compact ; Santé et Garage référencées dans le registre applicatif et dans le formulaire de tickets.

### Inventaire Cloudflare (API consultée le 12/11/2026)

Workers vérifiés : `forge-hub`, `nexus-app-api`, `nexus-link-api`, `gaming-app`, `rituel-app`, `rituel-web`, `vestiaire-app`, `vestiaire-fits-bridge`, `sante-app`, `sante-nexus-link`, `garage-app`. Bases D1 visibles : `nexus-app-db`, `nexus-link-db`, `gaming-push-db`, `rituel-push-db`, `sante-push-db`, `sante-nexus-link-db`. Cet inventaire décrit uniquement les ressources (pas leurs contenus ni un test de disponibilité des PWAs). Pas de D1 nécessaire pour GARAGE ni FORGE.


**FORGE Cloudflare V0.5 (12/11/2026)** : Worker `forge-hub` redéployé à 100 % (version `1157ecb4-8c83-4f4d-ba7f-ef6e6137792e`), trois bindings d'authentification conservés ; Pages Cloudflare : aucun projet listé dans le compte. La PWA FORGE sert les fichiers publics de GitHub `main` par proxy/cache court, et ne possède pas de base D1. Confirmation physique Safari V0.5 encore à faire.


**FORGE V0.6 (ticket #15, 12/11/2026)** : ouverture interne d'un ticket, corps complet, commentaires publics en timeline, publication de commentaires authentifiée via `/api/comments`. `ticket-detail.js` ajouté, Worker `forge-hub` et service worker actualisés sans D1 ni changement de contrats des autres apps. Déploiement Cloudflare et recette Safari à noter séparément après vérification.

**Déploiement FORGE V0.6 (12/11/2026)** : PR #16 fusionnée, commit `2f07eeb8a9a72b1579e97fa113166adbd3e4d33f`. Worker Cloudflare `forge-hub` mis à jour avec conservation des trois bindings OAuth ; déploiement `2faa5604-d579-4de0-81e9-1a94850d36ac`, version `1bc69bf1-c134-4f84-806d-74b9c299bd12`, trafic à 100 %. Ticket #15 clôturé avec un commentaire de livraison. Les contrôles de syntaxe et simulation Markdown sont passés ; recette physique Safari iPhone, connexion/commentaire via l'UI et suite Node complète restent à confirmer.


**FORGE V0.7 (ticket #18)** : une catégorie `GÉNÉRAL` distincte du catalogue des 6 apps et de Forge lui-même. Permet de suivre une future app ou des modifications transversales avec un `scope` explicite. Seuls Forge (front, Worker, docs) et son registre de tickets sont modifiés ; aucun worker ou schéma d'une app spécialisée n'est changé. Déploiement et recette Safari à vérifier séparément.

**FORGE Cloudflare V0.7 déployée (12/11/2026)** : PR #20 fusionnée (squash `c9a23901bb78cbb7222a7da36e336c07d0ecd261`), Worker `forge-hub` sur la version `8115f368-e14d-4fc0-8344-5aee6e9a072d` à **100 %** (déploiement `9d8fe30a-26f7-4290-b799-0ed2026e4e9f`). Trois bindings OAuth conservés, aucune app ni D1 supplémentaires. Ticket #18 clôturé, commentaire de livraison publié. Tests de syntaxe et génération de tickets effectués dans V8 ; test de création connecté depuis la PWA et recette Safari iPhone restent à confirmer.


**FORGE V0.8 (ticket #22, 12/11/2026)** : le cockpit possède quatre vues `Accueil` (tickets `todo`/`doing`), `Terminés` (issues GitHub closes sans suppression), `Nouveau` (formulaire actuel), `Apps` (catalogue + mémoire), avec une barre d'onglets en bas. Les cartes peuvent toujours ouvrir une fiche `#ticket/N`, puis retourner à l'onglet source. `app.js`, `index.html`, `ticket-detail.js`, `styles.css`, `sw.js` changés. Pas d'impact sur les dépôts/deployments des six apps, la passerelle OAuth, les commentaires ni les données privées. Tests et recette Safari consignés dans l'issue #22.
