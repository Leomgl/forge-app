# Cartographie des applications (instantané du 11/11/2026)

**Toujours vérifier le README et les commits actuels du dépôt ciblé :** ces notes sont un instantané historique, pas une version garantie.

## NEXUS — Leomgl/nexus-app

- **App actuelle documentée :** V0.17.2 pour les contacts (en-tête README parfois moins récent) ; URL PWA : https://leomgl.github.io/nexus-app/
- HTML/CSS/JS natifs, IndexedDB ; GitHub Pages ; backend Cloudflare Workers/D1.
- Modules : Notes, Agenda, Rappels, Contacts, Projets, Achats, Budget, capture intelligente, corbeille.
- Coffre cloud *optionnel* : snapshots chiffrés localement AES-GCM ; stockage local en clair ; passkey WebAuthn serveur en bêta. Notification Web Push sous condition d'opt-in.
- Liaison NEXUS LINK chiffrée avec Gaming ; proposition de données **à accepter** dans NEXUS ; ne jamais écrire directement une dépense non approuvée.
- Points du code/docs : `app.js`, `cloud.js`, `link-core.js`, `link-import.js`, `contacts-v017.js`, `README.md`, `docs/CONTACTS-V017.md`, `schemas/`, `backend/`.
- Risques : clés de coffre, liens contacts Agenda/Rappels, scripts d'import, migrations, cache PWA, accès aux données personnelles.
- À tester : état réel du tri alphabétique mobile et version effectivement installée avant de diagnostiquer.

## GAMING — Leomgl/gaming-app

- **Version documentaire :** V0.7 ; PWA https://gaming-app.q9pfwtztsc.workers.dev/
- HTML/CSS/JS natifs, IndexedDB, Worker Cloudflare, D1 pour les push.
- Bibliothèque PS5 (possédé ≠ installé), stockage interne/M.2/USB, jaquettes Wikimedia, saisons/pass même non achetés, DLC, calendrier, rappels mi-saison/J-14/J-7.
- **NEXUS LINK :** push des *propositions* chiffrées Gaming → NEXUS, après scopes et jumelage ; sur NEXUS réception et validation humaine. Les items non achetés ne créent aucune dépense réelle.
- Fichiers/docs : `app.js`, `nexus-sync.js`, `link-core.js`, `push-client.js`, `worker.mjs`, `wrangler.toml`, `README.md`.
- Risques : schéma des jeux/saisons, permissions et clés de jumelage, tâches/achats/dépenses dédupliqués, push iOS, séparation des données privées.

## RITUEL — Leomgl/rituel-app

- **Version documentaire :** V1.5 ; PWA https://leomgl.github.io/rituel-app/
- HTML/CSS/JS natifs, données routines/stock en localStorage, Worker Cloudflare + D1 pour Web Push.
- Soins matin/soir, historique de stock manuel, réserve, estimations seulement à partir de relevés, statistiques 7/30 jours et rappels iPhone.
- Fichiers/docs : `app.js`, `push-worker/`, `README.md`, `docs/PUSH.md`, `docs/ARCHITECTURE-APPS-GRATUITES.md`.
- Risques : ne pas casser la clé `rituel_personal_v1`, les historiques locaux, les souscriptions push ; ne pas committer la clé VAPID ni inventer des consommations de produit.

## VESTIAIRE — Leomgl/Vestiaire-app

- **Version documentaire :** V0.4 ; PWA https://vestiaire-app.q9pfwtztsc.workers.dev/
- HTML/CSS/JS natifs, IndexedDB (fiches, looks, médias, planning), Worker statique ; photos locales WebP, import privé Fits.
- Studio : mannequin personnalisable, ancrages et ordre de superposition via `fit-engine.js`, miniatures communes, recalage des looks importés, retour arrière ciblé.
- Sauvegarde `.vestiaire` VST1/manifeste : **non chiffrée** ; conserver privées les images et exports.
- Fichiers/docs : `app.js`, `fit-engine.js`, `fits-import.js`, `README.md`, `docs/FITTING-V04.md`, `edge-web/`.
- Risques : positions vestes/pantalons/ceintures, miniatures, origine des photos, migration IndexedDB ; sauvegarde obligatoire avant recalage massif. Validation iPhone avec mannequin/looks réels encore nécessaire.

## SANTÉ — Leomgl/sante-app

- **Version déployée : V0.3 (11/11/2026)** ; dépôt GitHub privé et source `worker.mjs` + `push.js`. URL PWA Cloudflare indépendante : https://sante-app.q9pfwtztsc.workers.dev/.
- **Modules :** accueil, traitements et prises manuelles, rendez-vous, dossier, carnet (vaccinations saisies manuellement, consultations, documents PDF/photos chiffrés) et export/restauration.
- **Stockage clinique :** IndexedDB locale AES-256-GCM, PBKDF2 310000 tours, `records` et `files` séparés ; migration non destructive V0.1→V0.2. Les fichiers et les notes restent sur l'iPhone.
- **Web Push V0.3 :** configuration depuis Santé, notifications d'horaires de traitements, rendez-vous J−1/−1h, échéances vaccinales J−30/−7/jour J. Messages détaillés/génériques configurables. App → D1 **seulement des échéances, des données de souscription, types de rappel et payloads AES-GCM chiffrés** ; le Service Worker déchiffre localement avec une clé de notification distincte. D1 EU `sante-push-db`, Worker `sante-app`, cron `*/5 * * * *`.
- **NEXUS LINK :** NON ACTIVÉ. Exigence bidirectionnelle pour RDV/rappels, Santé source médicale, permissions minimales, ID/révisions et déduplication à construire. Ne pas supposer que le nouveau push est géré par Nexus.
- **Risques :** perte de phrase/stockage iOS, absence de sauvegarde serveur, clés de notifications dans un store distinct du coffre, horaires et types de rappels révélés comme métadonnées à Cloudflare, exports individuels déchiffrés. Tous les secrets VAPID restent Cloudflare ; l'ancienne méthode d'upload V0.2 casserait les bindings.
- **Validation :** tests GitHub CI, D1, bindings et cron confirmés par API Cloudflare, **recette de réception Web Push sur vrai iPhone et mode hors-ligne du coffre toujours à faire**. Lire `sante-app/docs/PROJECT-HANDOFF.md` et `docs/PUSH-V03.md` avant toute intervention.

## Quand ajouter une autre application ?

Mettre à jour ce fichier, `docs/DEPENDENCIES.md`, et la liste de projets de la PWA. **Ne jamais importer des données privées** depuis l'app dans FORGE pour l'y enregistrer.
