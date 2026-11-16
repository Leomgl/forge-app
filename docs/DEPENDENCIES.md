## CORTEX — première app métier en recette (16/11/2026)

- **Repo** `Leomgl/Cortex-app`, URL `https://cortex-app.q9pfwtztsc.workers.dev/`, Worker `cortex-app`, Cloudflare 0 binding, 0 D1.
- **BLOCKS** V0.3.3, SHA `700ae421a2c2d56536c3793afa9f6f807973e72a` verrouillé ; import au build de Réglages, Me notifier, thème, densité, shell et mise à jour. Pas de sources dupliquées.
- **LINK** SDK navigateur commit `97f7ed86525351421a25eb204ae29c14f60a6443` ; pairing autorisé par propriétaire et intents opaques versionnées. LINK Worker/D1/DO et notifications inchangés. Synchronisation inter-app non livrée ; patchs externes en attente de contrat authentifié, chiffré et droits explicites. Push réel iPhone en attente de recette ; aucun second moteur.
- **Données** IndexedDB local : agenda, rappels, notes, contacts, budget ; export/import JSON. Pas de synchronisation entre appareils.
- **FORGE** : [#53](https://github.com/Leomgl/forge-app/issues/53). Ajouter CORTEX à la liste officielle des projets Forge (interface + Worker OAuth) dans un changement coordonné, sans redéployer le Worker en effaçant ses secrets.

# Dépendances techniques — nouvelle génération

## Validation officielle — deux premiers modules de BLOCKS

**Validation utilisateur officielle — 16 novembre 2026 : feuilles LABO 01 et 02 TERMINÉES.** L'utilisateur confirme que **tout est au vert** sur son iPhone. **Feuille 01 : Réglages universels VALIDÉS**, avec thèmes Graphite/Papier/Tabac/Minuit/Sauge, densités Compact/Normal/Spacieux, préférences persistantes, LINK dans Réglages, version, recherche et mise à jour. **Feuille 02 : Me notifier VALIDÉ**, avec RDV/pass/stock, rappels J/H/M, six échéances max et interface adaptable. **Les deux premiers modules sont prêts à être intégrés aux futures apps depuis BLOCKS V0.3.3**, coffre canonique non-PWA. LABO **V0.4.3** expose **deux badges « ✓ VALIDÉ »**, [CI verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43780598930), version Cloudflare `7e0d3d94-8c68-4bfe-98f3-45f5da605aba` à 100 % ; code de modules inchangé. **FORGE #50 = Terminé**, tandis que #43/#44 restent les suivis évolutifs LABO et BLOCKS. LINK V0.13.0 et son moteur Push sont inchangés. **Ne pas confondre cette validation de modules avec un Push réel LABO (#47 non encore attesté) ou l'automatisation des rappels (#49 non développée).**


## M7 — Dernière évolution : densité universelle des Réglages

**M7 (16/11/2026) — Densité d'affichage réutilisable.** Le module **Réglages** de BLOCKS V0.3.3 accueille désormais dans **Préférences** un sélecteur **Compact / Normal / Spacieux**. API bibliothèque `src/density.mjs` : `normalizeDensity`, `applyDensity`, `mountDensityPicker` ; CSS structurel dans `src/blocks.css` (Shell, Réglages, Me notifier). Densité indépendante de la palette : cinq DA toujours disponibles, cibles tactiles ≥44–48 px. L'app hôte applique et persiste la valeur, **BLOCKS n'est pas une app**. **LABO V0.4.2** est le banc d'essai : `Réglages → Préférences`, persisté sous `lab-density-v1`, 18 assets déployés à 100 % sur Cloudflare Worker `f330afdb-6e13-433a-9977-05cca1666ae0`. GitHub CI [BLOCKS verte](https://github.com/Leomgl/blocks-app/actions/runs/43779810916) et [LABO verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43780036982). **LINK V0.13.0 inchangé** : 25 bindings, D1 et ordonnanceur Push préservés. Me notifier toujours validé à 100 %, aucune modification de ses règles. **À valider physiquement sur iPhone** : les trois densités sur les cinq thèmes, persistance, lisibilité, tactile et absence de régression ; le module Réglages sera déclaré prêt pour les futures apps après cette validation. Voir tickets FORGE #44/#43.


## État de livraison finale — BLOCKS V0.3.2 / LABO V0.4.1

**M6 correctif de finition (16/11/2026)** : modules **Réglages** et **Me notifier** inchangés fonctionnellement, cinq thèmes disponibles. **BLOCKS V0.3.2** (source canonique, non-PWA) remplace la couleur blanche fixe du monogramme Shell par une couleur dérivée du fond, pour un contraste suffisant dans Minuit et les quatre autres palettes. **LABORATOIRE V0.4.1** importe BLOCKS depuis le SHA `8fedfa3e4c08c958a44b7bdc1c7616978ea48cae`, 17 assets. CI [BLOCKS verte](https://github.com/Leomgl/blocks-app/actions/runs/43778662474) et [LABO verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43778771460) ; Worker LABO `e9205982-fbe9-48b9-8cc2-902f798ec662` déployé **100 %**. LINK V0.13.0 inchangé (25 bindings, scheduler Push préservé). Me notifier **validé par l'utilisateur** ; connexion LABO ↔ LINK **validée sur iPhone** ; à confirmer physiquement : rendu des 3 nouveaux thèmes et réception d'un Push test.


## M6 — Réglages/Apparence et Me notifier · 16/11/2026

**M6 — deux premiers modules réutilisables finalisés (16/11/2026).** **BLOCKS V0.3.1** est la bibliothèque canonique (ce n'est PAS une PWA). MODULE 1 : **Réglages universels** incluant la section **Apparence** et le sélecteur visuel `mountThemePicker` de cinq thèmes partagés : **Graphite**, **Papier**, **Tabac** (crème / brun tabac / cuivre), **Minuit** (bleu nuit / acier) et **Sauge** (olive / lin). Le **Shell/Structure** existe toujours comme composant technique, mais n'a plus de feuille démo autonome. MODULE 2 : **Me notifier** est **validé à 100 % par l'utilisateur**, code `notify-editor.mjs` inchangé ; configuration J/H/M jusqu'à 30 jours, maximum six rappels, RDV/pass/stock. LABO **V0.4.0** ne conserve que ses deux feuilles de test « Réglages » et « Notifier », branche BLOCKS au commit `7bdc4c897e142737b15ffac5574866a5a3eae191` (17 assets), et laisse la connexion LINK sous Réglages. Les préférences et rappels restent locaux/persistants. CI [BLOCKS](https://github.com/Leomgl/blocks-app/actions/runs/43777820077) et [LABO](https://github.com/Leomgl/laboratoire-app/actions/runs/43778200631) vertes ; worker LABO `6a9e17aa-1dad-422d-a859-20711acd3525` à 100 %. LINK V0.13.0, ses 25 bindings, D1 et ordonnanceur Push sont inchangés. **Association LABO ↔ LINK confirmée par l'utilisateur sur iPhone** ; réception d'un Push LABO et recette visuelle des nouveaux thèmes non encore confirmées physiquement. Suivi FORGE #43/#44, moteur automatique futur #49.


## M6 — Réglages et Me notifier : état actuel validé en code

**M6 — finalisation technique Réglages + Me notifier, 16 novembre 2026.** **BLOCKS est uniquement une bibliothèque**, pas une application PWA. Source canonique `Leomgl/blocks-app` **V0.3.0**, SHA précis `846f92de94a8a31ace6f4a4ed58bd9d4fd4bf3c4` (CI [verte](https://github.com/Leomgl/blocks-app/actions/runs/43777534738)). Deux composants stabilisés : **Réglages universels** (recherche, catégories dont état ouvert conservé après update, préférences fournies et persistées par l'app, actions async, version/À propos/mise à jour PWA et cleanup des extensions `decorate`) et **Me notifier** (`blocks.notify.v1` inchangé, RDV/pass/stock, offsets 0–43200 min / max six, rappel exactement à l'échéance, changement de contexte isolé). Les contrats sont dans `blocks-app/docs/SETTINGS.md` et `docs/NOTIFY-EDITOR.md`. **LABORATOIRE V0.4.0** importe ces modules via `blocks.lock.json` épinglé, les affiche et garde localement les valeurs **par scénario** ; bundle GitHub `cb2e69537d5bfdc75456cd7cf58c2955192fb4ff`, CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43777784164), Worker Cloudflare existant `a15681c1-11cc-4183-b600-3fc7ed6ddd53` à 100 % (16 assets, 0 bindings). **LINK V0.13.0 inchangé** (25 bindings, DO, D1 et Push) et LABO↔LINK déjà associé sur iPhone. **Statut : code & tests validés, recette tactile iPhone de V0.4.0 encore nécessaire pour clôturer les modules.** Suivi dédié : [FORGE #50](https://github.com/Leomgl/forge-app/issues/50). Réception d'un vrai Push test encore à valider dans [#47](https://github.com/Leomgl/forge-app/issues/47), automatisation métier RDV non encore réalisée : [#49](https://github.com/Leomgl/forge-app/issues/49).


## M5 — État de référence actuel pour les autres threads

**M5 — liaison par code courte livrée (15 novembre 2026).** LINK **V0.13.0** et LAB **V0.3.2** ont été déployés à 100 % sur Cloudflare. L'app source affiche un code alphanumérique de 12 caractères (**10 minutes**, un usage), l'utilisateur le saisit dans **LINK → Applications**, vérifie le nom et l'origine HTTPS, choisit explicitement la permission de notification sous Face ID, puis revient dans l'app : la connexion se finalise par un échange de preuve locale, sans second formulaire. Les anciennes interfaces « Inscrire une nouvelle application » et « Créer un contrat » restent dans **Réglages → Outils avancés** pour maintenance uniquement. LINK utilise une **table additive** `hub_pairing_requests` dans sa D1 existante, un rate limiter déjà présent et son Worker actuel, sans autre moteur ou ressource. Tests automatisés LINK [verts](https://github.com/Leomgl/link-app/actions/runs/43774926751) et LAB [verts](https://github.com/Leomgl/laboratoire-app/actions/runs/43775044930). LINK Worker `dd12eb78-eef1-4ed2-a8ff-1429ad0a3425` à 100 %, **25 bindings**, même DO `LinkNotificationScheduler`, migration `link-live-notifications-v1`. LAB Worker `0117f6b4-ab19-481b-a881-e4d9ea0f9e1d` à 100 %, 16 assets. **Recette d'association sur iPhone encore nécessaire.** Le test de programmation de rappel dans LAB reste MANUEL ; le comportement produit « création/modification/suppression d'un RDV ⇒ intentions vers LINK automatiques ⇒ Push seul par LINK » demeure la prochaine phase du ticket [FORGE #49](https://github.com/Leomgl/forge-app/issues/49).


## État courant : LINK V0.12.1 / LAB V0.3.1 / BLOCKS V0.2.3

**LINK V0.12.1** déployé à 100 % : correctif Réglages vides, 25 bindings et ordonnanceur DO préservés ; ticket [#48](https://github.com/Leomgl/forge-app/issues/48), CI [verte](https://github.com/Leomgl/link-app/actions/runs/43772864227). **Décision de la cible UX** : une app neuve affiche un code, l'utilisateur l'entre dans LINK et autorise les permissions avec Face ID. Après association, la création/modification/suppression d'un RDV avec « Me notifier » provoque automatiquement un upsert/cancel de rappels opaques, à révision monotone et outbox hors ligne ; LINK planifie et envoie seul le Push même si l'app est fermée. Ticket [#49](https://github.com/Leomgl/forge-app/issues/49). LAB V0.3.1 et son invitation LINK→LAB, ainsi que les boutons « Préparer / Programmer », restent exclusivement une **simulation/test M4**, pas le parcours produit définitif.

## Dépendances actuelles du prototype

**15 novembre 2026 — M4 liaison LINK (prototype intégré et déployé).** LABORATOIRE **V0.3.1** / BLOCKS **V0.2.3** / Worker LINK **V0.12.0 inchangé**. LINK a reçu un SDK navigateur (sans modification du Worker) au commit `9d98d59dbbd52ec6a818b4dbe2c1ce7a52cb2b1e` : échange d'invitation copiée `LHI1.laboratoire.…`, capacité temporaire et conversion de rappels en commandes `link.notification.command.v1` opaques. LAB a intégré l'enrôlement propriétaire, la vérification du grant, un stockage d'identité côté PWA (IndexedDB) et la programmation **volontaire d'une seule occurrence de test**. SDK LINK CI [verte](https://github.com/Leomgl/link-app/actions/runs/43771185719), LAB CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43771334855), Worker LAB `4b4448a1-9988-4d97-8d4a-8d91688c80d0` déployé à **100 %** sur la même URL. 16 assets, pas de nouvelle D1, Worker ou moteur Push. **La liaison réelle nécessite encore l'inscription et le grant propriétaire dans LINK, puis le test physique iPhone avec abonnement Push LINK.** Les révisions, annulations, files hors ligne et gestion du stock événementiel restent à construire avant app métier. Suivi : [FORGE #47](https://github.com/Leomgl/forge-app/issues/47), [manuel M4](./LINK-BRIDGE.md).

## Rôles

- **LINK** est le noyau technique indépendant de chaque PWA métier. Il centralise les enveloppes de transport chiffrées, l'inscription des apps, les permissions et les notifications Web Push iOS. Il conserve sa D1, ses secrets et son Durable Object.
- **FORGE** orchestre le développement mais ne transporte aucune donnée métier. Il est servi depuis `forge-hub`, Worker disposant de GitHub OAuth pour créer des issues et commentaires dans `Leomgl/forge-app`. Aucune dépendance de FORGE à une app métier.
- **Nouvelles apps** : pas encore définies. Chaque app garde ses données et connecte les services communs à LINK uniquement une fois autorisée.

## Bibliothèque et laboratoire

**BLOCKS** contient uniquement le rendu/comportement partagé, les thèmes, les champs, l'onglet Réglages et le configurateur de notifications ; ne transporte aucune donnée entre apps. **LABORATOIRE** importe et teste ces modules à travers des feuilles indépendantes, avec données fictives et sans stockage Cloudflare. Les apps métiers utiliseront la même version des blocs, par import, pas par copier-coller. LINK conserve l'exclusivité de la distribution des événements et Web Push. Voir [ARCHITECTURE-BLOCKS.md](ARCHITECTURE-BLOCKS.md) et [LABORATORY.md](LABORATORY.md).

## Sources officielles et assemblage de LAB

- **Release courante : V0.2.1.** BLOCKS `93a04c6429ade3885ef1c3cf3133240ecf3059e8` ; LAB `0d3fcc4fff9ae552557f13c289e309c6aeb9df47`. Durées personnalisées jours/heures/minutes en 03, stock inchangé ; aucun Push local. V0.2.0 testée sur iPhone ; V0.2.1 à vérifier.
- Bibliothèque : [Leomgl/blocks-app](https://github.com/Leomgl/blocks-app), modules `src/theme.mjs`, `src/shell.mjs`, `src/settings.mjs`, `src/notify-editor.mjs` et `src/blocks.css`, version V0.2.1, commit `93a04c6429ade3885ef1c3cf3133240ecf3059e8`.
- PWA : [Leomgl/laboratoire-app](https://github.com/Leomgl/laboratoire-app), version V0.2.1, Worker `laboratoire-app` indépendant, aucune D1/binding. `blocks.lock.json` référence précisément la version de BLOCKS.
- Le bundle `dist/worker.mjs` est généré depuis les **deux sources privées** et sert le JS/CSS partagé depuis l'origine HTTPS de LAB. Pas de duplication maintenable, pas de requêtes cross-origin et pas de service Worker BLOCKS séparé.
- Deux dépôts privés : les CI de chaque repo restent autonomes ; recompiler avec les deux dépôts clonés et authentifiés. Pas de PAT inter-repos configuré. L'utilisateur a confirmé la recette fonctionnelle de V0.2.0 sur iPhone ; V0.2.1 reste à vérifier. Le bloc ne programme rien ; l'adaptateur LINK n'est pas encore branché.

## Contrat d'intégration d'une nouvelle PWA

1. Définir son identité et sa propre origine HTTPS. L'inscription dans LINK est propriétaire et explicite.
2. Définir des flux nécessaires seulement, avec contrat nominatif, portée de permissions, version et garantie de non-écriture automatique sans consentement.
3. Partager le composant de création de notifications **Me notifier**, la logique des rappels et les réglages communs sans recopier le moteur de livraison.
4. Vérifier les coûts et quotas Cloudflare avant toute nouvelle D1, lecture récurrente, Worker ou tâche ; viser l'offre gratuite et les événements plutôt que le polling.
5. Tester séparément : lecture/écriture, fonctionnement hors ligne, reprise, double envoi, révocation, chiffrement, notifications iOS, mise à jour de PWA.
6. Mettre à jour FORGE (ticket, versions, registry et décisions).

## Invariants

Pas de liaison de données directe entre les futures apps hors LINK. Pas de notification locale concurrente : livraison centrale LINK. Pas d'app automatique créée depuis des données historiques. Aucune permission implicitement activée. Aucun changement sur les secrets, D1 ou ordonnanceur existants sans justification ni sauvegarde.

Les références techniques de la génération antérieure sont archivées hors de cette documentation active.
