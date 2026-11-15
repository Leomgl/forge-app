# Dépendances techniques — nouvelle génération

## Rôles

- **LINK** est le noyau technique indépendant de chaque PWA métier. Il centralise les enveloppes de transport chiffrées, l'inscription des apps, les permissions et les notifications Web Push iOS. Il conserve sa D1, ses secrets et son Durable Object.
- **FORGE** orchestre le développement mais ne transporte aucune donnée métier. Il est servi depuis `forge-hub`, Worker disposant de GitHub OAuth pour créer des issues et commentaires dans `Leomgl/forge-app`. Aucune dépendance de FORGE à une app métier.
- **Nouvelles apps** : pas encore définies. Chaque app garde ses données et connecte les services communs à LINK uniquement une fois autorisée.

## Bibliothèque et laboratoire

**BLOCKS** contient uniquement le rendu/comportement partagé, les thèmes, les champs, l'onglet Réglages et plus tard le configurateur de notifications ; ne transporte aucune donnée entre apps. **LABORATOIRE** importe et teste ces modules à travers des feuilles indépendantes, avec données fictives et sans stockage Cloudflare. Les apps métiers utiliseront la même version des blocs, par import, pas par copier-coller. LINK conserve l'exclusivité de la distribution des événements et Web Push. Voir [ARCHITECTURE-BLOCKS.md](ARCHITECTURE-BLOCKS.md) et [LABORATORY.md](LABORATORY.md).

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
