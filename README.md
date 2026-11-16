## Cortex V0.3.1 — Espacements ciblés Modules et raccourcis (16/11/2026)

- **Github** : `Leomgl/Cortex-app`, commit final `1352450fc3a4030d14355ca2846dbeca77710bb1` ; [CI verte](https://github.com/Leomgl/Cortex-app/actions/runs/43798220687).
- **Cloudflare** : Worker `cortex-app`, déploiement `7894e3d1-8a29-4f20-81e7-9d8aa99be0a2`, version `dae7925e-a797-4f35-ae6f-96d4c2b06172` à **100 %**, `bindings=[]`, aucune nouvelle ressource.
- **UI uniquement** : CSS scoped `cx-page--compact` pour les trois onglets `modules`, `slot1`, `slot2` : réduire les espacements barre Cortex→titre, puis titre→première section. Règles locales uniquement, aucun changement sur Home, Réglages ni styles de la barre BLOCKS.
- **Préservation des versions** : maintient BLOCKS `0.7.0` / SYNAPSE compact `0.5.0`, LINK `0.13.0`, météo et données. Cache SW V0.3.1 et artefacts statiques régénérés depuis les sources actuelles (pas l'ancienne compilation V0.1.6).
- **Tests** : CI verte, Cloudflare validé. **Recette visuelle iPhone en attente**, issue FORGE #53 reste ouverte jusqu'à validation.

## Cortex V0.1.6 — Living Home & météo (16/11/2026)

- **GitHub** : `Leomgl/Cortex-app`, commit `52e24db1444dd3f0f01e14827110090af5c64af9` ; [CI verte](https://github.com/Leomgl/Cortex-app/actions/runs/43792778723).
- **Cloudflare** : Worker `cortex-app`, déploiement `02c56157-afd7-497c-8834-478be008540b`, version `ea547219-832d-4d46-82dc-cff09ed5b9b9` à **100 %** avec `bindings=[]`. Aucun D1.
- **Home** : titre contextuel selon l'heure, typographie premium, météo compacte interactive (actuel/ressenti/min/max/pluie/6 h), indicateurs ouvrant leur module, capture rapide valorisée et animations discrètes respectant `prefers-reduced-motion`.
- **Météo** : module métier local `weather.mjs`, API Open-Meteo libre pour usage non commercial, géocodage GeoNames via Open-Meteo, choix manuel ville par défaut Lille, GPS **uniquement sur bouton explicite**, URL de prévisions avec coordonnées, cache localStorage 20 min et affichage cache hors ligne. Autorisations CSP adaptées aux deux hôtes API et `Permissions-Policy: geolocation=(self)` sans suivi automatique. Affichage attribution source.
- **Préférences** : nouvelle sous-vue `Météo` dans Réglages BLOCKS → Personnalisation Cortex (extension locale `decorate`, BLOCKS V0.3.3 immuable). État d'accueil migré vers `schema:2` : météo insérée en premier tout en conservant ordre/visibilités historiques. LINK V0.13.0 et Budget inchangés.
- **Limites/recette iPhone** : CI verte, Cloudflare confirmé ; **test iPhone réel en attente** : chargement live Open-Meteo via Safari/PWA, sélection de ville, consentement/refus GPS, gestion hors ligne/cache, changement de thème, sections réorganisables, réduction d'animations. **FORGE #53 reste ouvert.**

## Cortex V0.1.5 — Multi-contacts et recherche dans les rendez-vous (16/11/2026)

- **GitHub** : `Leomgl/Cortex-app`, commit `b868b67a167aa72c35bd71ab4a7b9d53d4f52571` ; [CI verte](https://github.com/Leomgl/Cortex-app/actions/runs/43791287814).
- **Cloudflare** : Worker `cortex-app`, déploiement `b20f32fe-01ba-465f-b300-c0eff9beff22`, version `3f9c165a-060a-45bf-b088-6935e1f035b6` **100 %**, sans bindings (ni D1 supplémentaire).
- **Fonctions** : Éditeur d'événement → Contacts associés : sélection multiple recherchable sans longue liste déroulante ; recherche par prénom/nom accent-insensible, entreprise, email ou téléphone ; favoris proposés, sélection sous forme de pastilles, retrait individuel, aucune duplication, affichage des noms dans les événements. La recherche de l'Agenda porte sur **tous** les participants.
- **Compatibilité** : `contactIds[]` devient le champ canonique, `contactId` (premier ID) reste fourni en compatibilité. Anciennes fiches `contactId` importées dans le sélecteur sans migration irréversible ; enregistrement sous forme multi-contacts. Pas d'envoi d'invitations ni de nouveau moteur de synchronisation ; BLOCKS, LINK et Budget inchangés.
- **Validation** : tests GitHub réussis ; **recette iPhone à confirmer** : recherche, multi-ajout, suppression, réouverture de fiche, recherche Agenda sur deuxième/troisième contact, anciens RDV.

## Cortex V0.1.4 — Sélecteurs de date et d’heure natifs iOS (16/11/2026)

- **GitHub** : `Leomgl/Cortex-app`, correctif final `a889cc901c1799ff4b3fdbbce7c0542fea0d2e16` ; [CI verte](https://github.com/Leomgl/Cortex-app/actions/runs/43790368408).
- **Cloudflare** : `cortex-app`, deployment `8ddb90f9-b4c1-4fe4-a62b-b5943e598c99`, version `c9cffbcb-0552-41c5-bf83-c31b86fe259f` à **100 %** ; `bindings=[]`, sans D1.
- **Évolution** : formulaire d'événement (Début et Fin) et de rappel (Échéance) avec deux champs natifs HTML `date` et `time` visibles et tactiles. Le picker système Safari/iOS s'ouvre en touchant le champ. Aucun `showPicker()` dépendant de Safari iOS. Fin et échéance restent facultatives via case d'activation. Conversion locale → ISO au moment de l'enregistrement préservée ; BLOCKS, LINK et logique du Budget inchangés.
- **Tests** : nouveaux tests pour structure des inputs natifs, heures, dates et champ facultatif, CI réussie. **Recette iPhone réelle en attente** : vérifier ouverture des sélecteurs sous Safari/PWA, dates de début/fin, rappel sans date, modification d'événement existant et validation de notifications.

## Cortex V0.1.3 — Interface personnalisable (16/11/2026)

- **GitHub** `Leomgl/Cortex-app` commit `02a197ecb569da60e9168fc0e617c4c4da17dd71` ; CI `43789449219` **success**.
- **Cloudflare** Worker `cortex-app`, déploiement `09d53200-aa04-4f22-92b9-f8d5e9520e29`, version `673ad695-b8d2-4057-ae46-fea19b387bed` **100 %**, `bindings=[]` (aucun D1 additionnel).
- **Fonctions** : raccourcis 1/2 affichent immédiatement le nom du module choisi, sans sélecteur dans leur page ; les choix se pilotent via **Réglages BLOCKS → Personnalisation Cortex → Raccourcis** (extension locale `sections[].decorate`, sans modifier BLOCKS). Accueil en sections configurables : indicateurs, capture rapide, échéances, activité récente (masquée par défaut), ordre modifiable par poignée tactile ou flèches, visibilité et réinitialisation.
- **Stockage** : réglages `cortex-slots-v1` migrés/normalisés sans perdre les choix antérieurs ; nouvel état `cortex-home-layout-v1` dans `localStorage`. **Pas de changement** dans BLOCKS V0.3.3, LINK V0.13.0, la logique Budget, les notifications ni la base locale.
- **État** : tests automatiques au vert, déploiement confirmé. **Recette iPhone réelle en attente** : comportement tactile du déplacement, sous-menu réglages, persistance après fermeture, thèmes/densité et raccourcis. **FORGE #53 reste ouvert**.

# FORGE — Development Memory · V0.10.2

## Validation officielle — deux premiers modules de BLOCKS

**Validation utilisateur officielle — 16 novembre 2026 : feuilles LABO 01 et 02 TERMINÉES.** L'utilisateur confirme que **tout est au vert** sur son iPhone. **Feuille 01 : Réglages universels VALIDÉS**, avec thèmes Graphite/Papier/Tabac/Minuit/Sauge, densités Compact/Normal/Spacieux, préférences persistantes, LINK dans Réglages, version, recherche et mise à jour. **Feuille 02 : Me notifier VALIDÉ**, avec RDV/pass/stock, rappels J/H/M, six échéances max et interface adaptable. **Les deux premiers modules sont prêts à être intégrés aux futures apps depuis BLOCKS V0.3.3**, coffre canonique non-PWA. LABO **V0.4.3** expose **deux badges « ✓ VALIDÉ »**, [CI verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43780598930), version Cloudflare `7e0d3d94-8c68-4bfe-98f3-45f5da605aba` à 100 % ; code de modules inchangé. **FORGE #50 = Terminé**, tandis que #43/#44 restent les suivis évolutifs LABO et BLOCKS. LINK V0.13.0 et son moteur Push sont inchangés. **Ne pas confondre cette validation de modules avec un Push réel LABO (#47 non encore attesté) ou l'automatisation des rappels (#49 non développée).**


## M7 — Dernière évolution : densité universelle des Réglages

**M7 (16/11/2026) — Densité d'affichage réutilisable.** Le module **Réglages** de BLOCKS V0.3.3 accueille désormais dans **Préférences** un sélecteur **Compact / Normal / Spacieux**. API bibliothèque `src/density.mjs` : `normalizeDensity`, `applyDensity`, `mountDensityPicker` ; CSS structurel dans `src/blocks.css` (Shell, Réglages, Me notifier). Densité indépendante de la palette : cinq DA toujours disponibles, cibles tactiles ≥44–48 px. L'app hôte applique et persiste la valeur, **BLOCKS n'est pas une app**. **LABO V0.4.2** est le banc d'essai : `Réglages → Préférences`, persisté sous `lab-density-v1`, 18 assets déployés à 100 % sur Cloudflare Worker `f330afdb-6e13-433a-9977-05cca1666ae0`. GitHub CI [BLOCKS verte](https://github.com/Leomgl/blocks-app/actions/runs/43779810916) et [LABO verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43780036982). **LINK V0.13.0 inchangé** : 25 bindings, D1 et ordonnanceur Push préservés. Me notifier toujours validé à 100 %, aucune modification de ses règles. **À valider physiquement sur iPhone** : les trois densités sur les cinq thèmes, persistance, lisibilité, tactile et absence de régression ; le module Réglages sera déclaré prêt pour les futures apps après cette validation. Voir tickets FORGE #44/#43.


## M6 — Réglages et Me notifier : état actuel validé en code

**M6 — finalisation technique Réglages + Me notifier, 16 novembre 2026.** **BLOCKS est uniquement une bibliothèque**, pas une application PWA. Source canonique `Leomgl/blocks-app` **V0.3.0**, SHA précis `846f92de94a8a31ace6f4a4ed58bd9d4fd4bf3c4` (CI [verte](https://github.com/Leomgl/blocks-app/actions/runs/43777534738)). Deux composants stabilisés : **Réglages universels** (recherche, catégories dont état ouvert conservé après update, préférences fournies et persistées par l'app, actions async, version/À propos/mise à jour PWA et cleanup des extensions `decorate`) et **Me notifier** (`blocks.notify.v1` inchangé, RDV/pass/stock, offsets 0–43200 min / max six, rappel exactement à l'échéance, changement de contexte isolé). Les contrats sont dans `blocks-app/docs/SETTINGS.md` et `docs/NOTIFY-EDITOR.md`. **LABORATOIRE V0.4.0** importe ces modules via `blocks.lock.json` épinglé, les affiche et garde localement les valeurs **par scénario** ; bundle GitHub `cb2e69537d5bfdc75456cd7cf58c2955192fb4ff`, CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43777784164), Worker Cloudflare existant `a15681c1-11cc-4183-b600-3fc7ed6ddd53` à 100 % (16 assets, 0 bindings). **LINK V0.13.0 inchangé** (25 bindings, DO, D1 et Push) et LABO↔LINK déjà associé sur iPhone. **Statut : code & tests validés, recette tactile iPhone de V0.4.0 encore nécessaire pour clôturer les modules.** Suivi dédié : [FORGE #50](https://github.com/Leomgl/forge-app/issues/50). Réception d'un vrai Push test encore à valider dans [#47](https://github.com/Leomgl/forge-app/issues/47), automatisation métier RDV non encore réalisée : [#49](https://github.com/Leomgl/forge-app/issues/49).


## M5 — État de référence actuel pour les autres threads

**M5 — liaison par code courte livrée (15 novembre 2026).** LINK **V0.13.0** et LAB **V0.3.2** ont été déployés à 100 % sur Cloudflare. L'app source affiche un code alphanumérique de 12 caractères (**10 minutes**, un usage), l'utilisateur le saisit dans **LINK → Applications**, vérifie le nom et l'origine HTTPS, choisit explicitement la permission de notification sous Face ID, puis revient dans l'app : la connexion se finalise par un échange de preuve locale, sans second formulaire. Les anciennes interfaces « Inscrire une nouvelle application » et « Créer un contrat » restent dans **Réglages → Outils avancés** pour maintenance uniquement. LINK utilise une **table additive** `hub_pairing_requests` dans sa D1 existante, un rate limiter déjà présent et son Worker actuel, sans autre moteur ou ressource. Tests automatisés LINK [verts](https://github.com/Leomgl/link-app/actions/runs/43774926751) et LAB [verts](https://github.com/Leomgl/laboratoire-app/actions/runs/43775044930). LINK Worker `dd12eb78-eef1-4ed2-a8ff-1429ad0a3425` à 100 %, **25 bindings**, même DO `LinkNotificationScheduler`, migration `link-live-notifications-v1`. LAB Worker `0117f6b4-ab19-481b-a881-e4d9ea0f9e1d` à 100 %, 16 assets. **Recette d'association sur iPhone encore nécessaire.** Le test de programmation de rappel dans LAB reste MANUEL ; le comportement produit « création/modification/suppression d'un RDV ⇒ intentions vers LINK automatiques ⇒ Push seul par LINK » demeure la prochaine phase du ticket [FORGE #49](https://github.com/Leomgl/forge-app/issues/49).


## Nouveauté du 15/11 : correctif LINK et cible automatique

**LINK V0.12.1** déployé à 100 % : correctif Réglages vides, 25 bindings et ordonnanceur DO préservés ; ticket [#48](https://github.com/Leomgl/forge-app/issues/48), CI [verte](https://github.com/Leomgl/link-app/actions/runs/43772864227). **Décision de la cible UX** : une app neuve affiche un code, l'utilisateur l'entre dans LINK et autorise les permissions avec Face ID. Après association, la création/modification/suppression d'un RDV avec « Me notifier » provoque automatiquement un upsert/cancel de rappels opaques, à révision monotone et outbox hors ligne ; LINK planifie et envoie seul le Push même si l'app est fermée. Ticket [#49](https://github.com/Leomgl/forge-app/issues/49). LAB V0.3.1 et son invitation LINK→LAB, ainsi que les boutons « Préparer / Programmer », restent exclusivement une **simulation/test M4**, pas le parcours produit définitif.

## Statut actif : liaison LINK M4

**15 novembre 2026 — M4 liaison LINK (prototype intégré et déployé).** LABORATOIRE **V0.3.1** / BLOCKS **V0.2.3** / Worker LINK **V0.12.0 inchangé**. LINK a reçu un SDK navigateur (sans modification du Worker) au commit `9d98d59dbbd52ec6a818b4dbe2c1ce7a52cb2b1e` : échange d'invitation copiée `LHI1.laboratoire.…`, capacité temporaire et conversion de rappels en commandes `link.notification.command.v1` opaques. LAB a intégré l'enrôlement propriétaire, la vérification du grant, un stockage d'identité côté PWA (IndexedDB) et la programmation **volontaire d'une seule occurrence de test**. SDK LINK CI [verte](https://github.com/Leomgl/link-app/actions/runs/43771185719), LAB CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43771334855), Worker LAB `4b4448a1-9988-4d97-8d4a-8d91688c80d0` déployé à **100 %** sur la même URL. 16 assets, pas de nouvelle D1, Worker ou moteur Push. **La liaison réelle nécessite encore l'inscription et le grant propriétaire dans LINK, puis le test physique iPhone avec abonnement Push LINK.** Les révisions, annulations, files hors ligne et gestion du stock événementiel restent à construire avant app métier. Suivi : [FORGE #47](https://github.com/Leomgl/forge-app/issues/47), [manuel M4](./LINK-BRIDGE.md).

FORGE est le cockpit de suivi des **nouvelles applications iPhone**. L'architecture conservée au 15 novembre 2026 compte exactement deux applications : [LINK](https://github.com/Leomgl/link-app) et [FORGE](https://github.com/Leomgl/forge-app).

**Application :** https://forge-hub.q9pfwtztsc.workers.dev/

## V0.10.2 — CORTEX dans le catalogue

CORTEX V0.1.1 (Worker statique `cortex-app`) rejoint le catalogue visible FORGE ; le ticket de lancement et de recette est [#53](https://github.com/Leomgl/forge-app/issues/53). L'interface propose les nouveaux tickets CORTEX via le formulaire GitHub tant que l'allowlist de création OAuth du Worker n'est pas mise à jour. LINK/FORGE Workers et leurs bindings sont inchangés.

## V0.10.1 — nouvelle génération

## Nouvelle génération

- **LINK V0.12.1** : seul centre technique des connexions chiffrées, permissions inter-apps et notifications iOS. Les applications à venir devront s'y inscrire ; aucune app historique n'est encore retenue.
- **FORGE V0.10.1** : gestion des projets, tickets GitHub, décisions, versions, recettes et dépendances. Les nouvelles apps seront définies ensemble et ajoutées au catalogue après validation.
- **GitHub** : les issues de `Leomgl/forge-app` sont la référence des tickets. Les projets techniques et leur source vivent dans leurs dépôts distincts.
- **Cloudflare** : un Worker `forge-hub` assure l'interface FORGE et la session GitHub OAuth sécurisée. Pas de nouvelle base D1, ni nouveau Worker, ni système de notifications propres à FORGE.

## État initial du catalogue

| Projet | Rôle | Dépôt |
|---|---|---|
| LINK | Transport inter-apps, identité, permissions, Web Push | [link-app](https://github.com/Leomgl/link-app) |
| FORGE | Pilotage du développement et décisions | [forge-app](https://github.com/Leomgl/forge-app) |

**Dernière livraison :** LABORATOIRE et BLOCKS V0.2.1 — feuille 03 avec saisie personnalisée Jours/Heures/Minutes pour RDV et pass, stock inchangé ; LINK n'a pas été modifié. V0.2.0 validée iPhone, V0.2.1 en attente de recette.

**Premières réalisations de l'architecture :** [LABORATOIRE V0.2.0](https://github.com/Leomgl/laboratoire-app) (PWA d'essais, https://laboratoire-app.q9pfwtztsc.workers.dev/) et [BLOCKS V0.2.0](https://github.com/Leomgl/blocks-app) (composants partagés ESM + CSS). Le `blocks.lock.json` de LAB verrouille le commit de BLOCKS ; le Worker est compilé à partir des deux sources privées. Les deux CI sont opérationnelles. Feuille 03 « Me notifier » en démonstration sur LAB, recette iPhone à faire ; aucun moteur Push local. Les anciens fichiers bootstrap FORGE ne sont plus actifs.

Les **futures apps** restent à décider ensemble. Aucune ancienne app n'est recréée ou préinscrite par défaut.

## Tickets et archives

Les tickets de la nouvelle génération commencent au **#40**. Seuls les tickets de cette génération sont affichés dans les tableaux À faire, En cours et Terminés de FORGE. Les tickets précédents et leurs commentaires sont **conservés sur GitHub**, sans figurer dans le cockpit actif. Les références historiques de code/docs restent consultables dans la branche de sauvegarde `snapshot/forge-preclean-2026-11-15`.

Le ticket `GENERAL` est réservé aux idées non attribuées, décisions transversales, blocs communs ou à la préparation d'une nouvelle app. Il n'est pas une application supplémentaire.

## Fonctionnement

Le formulaire génère une issue avec le marqueur `FORGE_META` (projet, type, priorité, workflow, version), le contexte, les critères et les éléments à préserver. Les états sont À faire, En cours et Terminé. La publication directe, les commentaires et la modification des statuts passent par l'authentification GitHub sur le Worker `forge-hub`. Le jeton GitHub n'est jamais saisi manuellement dans la PWA.

La page de détail de ticket charge les commentaires et rend le Markdown en DOM sécurisé, sans HTML arbitraire. La PWA reste installable, et son Service Worker ne met pas en cache les API de session ni les écritures.

## Liens techniques

- **[Guide obligatoire de création d'une nouvelle app](docs/APP-CREATION-GUIDE.md)** — règles, intégration BLOCKS, LINK, versions et checklist
- [Architecture BLOCKS · LABORATOIRE](docs/ARCHITECTURE-BLOCKS.md)
- [Spécification LABORATOIRE](docs/LABORATORY.md)
- [Guide de reprise IA](docs/AI-START-HERE.md)
- [Catalogue des applications](docs/APP-MAP.md)
- [Dépendances](docs/DEPENDENCIES.md)
- [Protocole de ticket](docs/TICKET-PROTOCOL.md)
- [Décisions](docs/DECISIONS.md)
- [Configuration OAuth](docs/GITHUB-AUTH.md)
- [Historique des livraisons](docs/EVOLUTION-HISTORY.md)

## Contrôles

```bash
node --check app.js
node --check ticket-detail.js
node --check edge-worker/index.mjs
node tests/smoke.mjs
node scripts/check-release-version.cjs
```

Une CI verte valide le code, pas la recette visuelle et fonctionnelle sur iPhone. Les anciennes fonctionnalités ne doivent pas être réintroduites sans nouvelle définition produit.
