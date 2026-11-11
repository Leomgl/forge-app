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

- **Déployée V0.4.0** sur Cloudflare Worker sante-app (11/11/2026), dépôt privé. Adresse : https://sante-app.q9pfwtztsc.workers.dev/ . Version de production confirmée via Cloudflare API, sauvegarde des bindings D1 et secrets VAPID vérifiée.
- **Modules** : traitements et prises, rendez-vous, vaccins, documents chiffrés, dossier ; V0.4 ajoute mesures/constantes et poids, journal de santé, professionnels, analyses/valeurs, préparation de consultation. Data médicales restent dans le coffre IndexedDB AES-256-GCM local, migration additive et sauvegarde existantes conservées.
- **Notifications :** Santé n'envoie plus que les push des **prises de traitements** ; rendez-vous et rappels de vaccins doivent venir de **NEXUS Agenda/Push** lorsque les événements Santé sont importés dans Nexus. Éviter les double notifications. Serveur Santé ne planifie plus les types non médicamenteux, D1 vidée de ces types.
- **Lien Santé ↔ Nexus actuellement disponible en sens Santé → Nexus seulement** : relais E2EE *distinct* sante-nexus-link.q9pfwtztsc.workers.dev, base D1 UE sante-nexus-link-db, scopes dose_summary/health_calendar, code privé NXS1. Santé choisit de partager les noms des médicaments ou non (désactivé par défaut). Nexus stocke le résumé et les RDV importés localement en **clair** (avec consentement), affiche Pulse prises faites/planifiées et gère les alertes Agenda. Authentification par pairing et AES-GCM ; pas de docs/analyses/ordonnances partagés.
- **Correspondance Nexus :** V0.21.5, fichiers sante-link-core.js, nexus-sante.js/css, app.js, pulse-v018.js, settings-v0214.js, index.html, sw.js. Import calendrier manuel ou opt-in automatique, IDs stables et conflits sans écraser les éditions locales.
- **Pas encore livré :** modifications du calendrier Nexus répercutées vers Santé (vraie écriture bidirectionnelle), temps réel quand les deux PWAs sont fermées, validation iPhone E2E.
- **Important** : ne jamais modifier le relais LINK commun Gaming/Rituel/Vestiaire pour Santé ; ne jamais redéployer Santé sans ses DEUX modules worker.mjs et push.js et sans conserver bindings DB/VAPID/PEPPER. Références : sante-app/docs/PROJECT-HANDOFF.md, nexus-app/docs/PROJECT-HANDOFF.md, FORGE #4/#6.


## Quand ajouter une autre application ?

Mettre à jour ce fichier, `docs/DEPENDENCIES.md`, et la liste de projets de la PWA. **Ne jamais importer des données privées** depuis l'app dans FORGE pour l'y enregistrer.
