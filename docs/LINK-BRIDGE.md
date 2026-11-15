# M4 — Liaison LABORATOIRE ↔ LINK, test et reprise

## Architecture livrée

**15 novembre 2026 — M4 liaison LINK (prototype intégré et déployé).** LABORATOIRE **V0.3.1** / BLOCKS **V0.2.3** / Worker LINK **V0.12.0 inchangé**. LINK a reçu un SDK navigateur (sans modification du Worker) au commit `9d98d59dbbd52ec6a818b4dbe2c1ce7a52cb2b1e` : échange d'invitation copiée `LHI1.laboratoire.…`, capacité temporaire et conversion de rappels en commandes `link.notification.command.v1` opaques. LAB a intégré l'enrôlement propriétaire, la vérification du grant, un stockage d'identité côté PWA (IndexedDB) et la programmation **volontaire d'une seule occurrence de test**. SDK LINK CI [verte](https://github.com/Leomgl/link-app/actions/runs/43771185719), LAB CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43771334855), Worker LAB `4b4448a1-9988-4d97-8d4a-8d91688c80d0` déployé à **100 %** sur la même URL. 16 assets, pas de nouvelle D1, Worker ou moteur Push. **La liaison réelle nécessite encore l'inscription et le grant propriétaire dans LINK, puis le test physique iPhone avec abonnement Push LINK.** Les révisions, annulations, files hors ligne et gestion du stock événementiel restent à construire avant app métier. Suivi : [FORGE #47](https://github.com/Leomgl/forge-app/issues/47), [manuel M4](./LINK-BRIDGE.md).

- **LINK** est le seul moteur de notifications et d'identité. Son Worker Cloudflare et la D1 existante restent inchangés. Le nouveau SDK navigateur en source `Leomgl/link-app/src/notification-client-sdk.mjs` est importé par LAB au SHA indiqué dans `link.lock.json`.
- **BLOCKS V0.2.3** conserve l'éditeur universel `blocks.notify.v1` (RDV, pass, stock) et n'envoie aucune notification.
- **LAB V0.3.1** convertit des choix de date/rappel en intentions `link.notification.command.v1` : `schema`, `operation:"upsert"`, `items:[{id,dueAt,category,revision}]`. Une seule occurrence par requête, `id` SHA-256 opaque. Le serveur ne reçoit pas le libellé, ni le nom du rendez-vous, ni la date de l'événement parent. Les appels sont volontaires.

## Recette pas à pas sur l'iPhone

1. Installer/ouvrir la PWA **LINK**, accéder à ses **Réglages** et authentifier le propriétaire (Face ID/passkey). Dans la gestion des applications, inscrire une nouvelle app avec identifiant **`laboratoire`**, nom **`LABORATOIRE`** et origine exacte **`https://laboratoire-app.q9pfwtztsc.workers.dev`**.
2. Dans LINK, sélectionner cette app et **« Générer une invitation »**. Copier la chaîne `LHI1.laboratoire.<64 caractères>` complète avant expiration (~15 min).
3. Ouvrir la PWA **LABORATOIRE** V0.3.1, feuille **Notifier**. Dans « Connecter le moteur LINK », coller l'invitation, **« Connecter LAB à LINK »**. Une capacité d'accès Hub de durée limitée est conservée uniquement dans IndexedDB de LAB.
4. Dans **LINK**, accorder à `laboratoire` l'autorisation de notifications et vérifier qu'un appareil LINK est abonné au Web Push depuis l'écran d'accueil iPhone. Un contrat entre deux apps métiers n'est **pas nécessaire** pour cette autorisation unilatérale de notifications.
5. Revenir dans LAB et cliquer **« Vérifier l'autorisation LINK »**. Cela prouve seulement l'authentification et le grant, **pas encore la délivrabilité Push**.
6. Pour un RDV fictif, configurer un rappel **2 minutes avant**. Choisir une date d'événement à **5–10 minutes dans le futur**, puis **« Préparer un rappel test »** et **« Programmer CE rappel dans LINK »**. Vérifier le message d'acceptation, puis la réception à l'heure prévue sur la PWA **LINK**.
7. Vérifier les refus sans grant, invitation incorrecte, réseau hors ligne, apparence Graphite/Papier et bouton de mise à jour.

## Invariants et limites

- Aucune identité LAB ne peut être créée ou autorisée implicitement. N'ajouter aucune permission en écrivant directement dans D1. L'utilisateur propriétaire doit agir dans LINK.
- LINK reçoit uniquement des données minimales (id opaque, date UTC, catégorie et révision). L'éditeur n'envoie rien sur changement et LAB n'a pas de Service Worker Push autonome.
- Le credential Hub est dans IndexedDB LAB ; le SDK conserve une capacité notification courte **en mémoire seulement**, jamais dans URL/localStorage ni logs. Supprimer l'identité locale **ne révoque pas** l'autorisation serveur ni les intentions déjà programmées ; utiliser la gestion LINK pour révoquer.
- Le stock nécessite une vraie mesure de stock. BLOCKS définit le seuil ; le moteur de notification ne peut pas décider seul quand un produit passe sous seuil.
- **Pas encore prêt en production métier** : révision incrémentale, mise à jour d'un RDV, suppression d'un rappel, annulation, expiration/reprise hors ligne, journal durable, déduplication et audit. La démo n'envoie volontairement qu'une occurrence après clic utilisateur.
- Aucun nouveau Worker, D1, cron, polling, contrat automatique ni accès aux secrets LINK depuis LAB. Le schéma D1/DO et les flags de production LINK restent intacts.

## Dépendances verrouillées et vérification

- `Leomgl/blocks-app` : V0.2.3, SHA `b7a6e7924a76b9be24ee71669af199298dfc83b1`.
- `Leomgl/link-app` : SDK source SHA `9d98d59dbbd52ec6a818b4dbe2c1ce7a52cb2b1e`, **Worker live toujours V0.12.0**.
- `Leomgl/laboratoire-app` : PWA V0.3.1, compilation réelle depuis **trois dépôts frères** (LAB, BLOCKS, LINK), cache SW `laboratoire-v0.3.1`, 16 ressources.
- LINK CI https://github.com/Leomgl/link-app/actions/runs/43771185719 ; LAB CI https://github.com/Leomgl/laboratoire-app/actions/runs/43771334855.
- Cloudflare LAB `4b4448a1-9988-4d97-8d4a-8d91688c80d0` à 100 %.
- Tickets FORGE #41, #43, #44, **#47**. Conserver #47 « en cours » jusqu'au test iPhone et distinguer continuellement test d'autorisation et réception de notification.
