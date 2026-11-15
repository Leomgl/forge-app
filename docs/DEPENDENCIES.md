# Dépendances techniques — nouvelle génération

## Rôles

- **LINK** est le noyau technique indépendant de chaque PWA métier. Il centralise les enveloppes de transport chiffrées, l'inscription des apps, les permissions et les notifications Web Push iOS. Il conserve sa D1, ses secrets et son Durable Object.
- **FORGE** orchestre le développement mais ne transporte aucune donnée métier. Il est servi depuis `forge-hub`, Worker disposant de GitHub OAuth pour créer des issues et commentaires dans `Leomgl/forge-app`. Aucune dépendance de FORGE à une app métier.
- **Nouvelles apps** : pas encore définies. Chaque app garde ses données et connecte les services communs à LINK uniquement une fois autorisée.

## Bibliothèque et laboratoire

**BLOCKS** contient uniquement le rendu/comportement partagé, les thèmes, les champs, l'onglet Réglages et le configurateur de notifications ; ne transporte aucune donnée entre apps. **LABORATOIRE** importe et teste ces modules à travers des feuilles indépendantes, avec données fictives et sans stockage Cloudflare. Les apps métiers utiliseront la même version des blocs, par import, pas par copier-coller. LINK conserve l'exclusivité de la distribution des événements et Web Push. Voir [ARCHITECTURE-BLOCKS.md](ARCHITECTURE-BLOCKS.md) et [LABORATORY.md](LABORATORY.md).

## Sources officielles et assemblage de LAB

- Bibliothèque : [Leomgl/blocks-app](https://github.com/Leomgl/blocks-app), modules `src/theme.mjs`, `src/shell.mjs`, `src/settings.mjs`, `src/notify-editor.mjs` et `src/blocks.css`, version V0.2.0, commit `755c6f2387d6ccb21a6fca6ad00f3a54523d0b2f`.
- PWA : [Leomgl/laboratoire-app](https://github.com/Leomgl/laboratoire-app), version V0.2.0, Worker `laboratoire-app` indépendant, aucune D1/binding. `blocks.lock.json` référence précisément la version de BLOCKS.
- Le bundle `dist/worker.mjs` est généré depuis les **deux sources privées** et sert le JS/CSS partagé depuis l'origine HTTPS de LAB. Pas de duplication maintenable, pas de requêtes cross-origin et pas de service Worker BLOCKS séparé.
- Deux dépôts privés : les CI de chaque repo restent autonomes ; recompiler avec les deux dépôts clonés et authentifiés. Pas de PAT inter-repos configuré. La recette de la V0.1.1 post-migration et de la V0.2.0 sur iPhone reste à confirmer. Le bloc ne programme rien ; l'adaptateur LINK n'est pas encore branché.

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
