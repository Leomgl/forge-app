# Dépendances techniques — nouvelle génération

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
