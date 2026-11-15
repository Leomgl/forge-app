# Registre de la nouvelle génération

Version du registre : **2026-11-15 / FORGE V0.10.1**.

| Identifiant | Produit | Fonction | Dépôt GitHub | Cloudflare |
|---|---|---|---|---|
| LINK | LINK | Connexions chiffrées, permissions, notifications centralisées | `Leomgl/link-app` | Worker `link-app`, D1 `link-hub-db`, ordonnanceur DO |
| FORGE | FORGE | Catalogue, tickets, décisions, interventions et documentation | `Leomgl/forge-app` | Worker `forge-hub` (OAuth) |

## Projets de construction validés, hors catalogue métier

| Projet | Statut | Rôle |
|---|---|---|
| BLOCKS | En construction, [FORGE #44](https://github.com/Leomgl/forge-app/issues/44) | Bibliothèque versionnée de composants et comportements personnalisables |
| LABORATOIRE | En construction, [FORGE #43](https://github.com/Leomgl/forge-app/issues/43) | PWA légère, feuilles d’expérimentation pour tester et valider BLOCKS sur iPhone |

**Aucune application métier n'est validée à ce stade.** Ne pas inscrire d'autres noms avant notre travail commun de cadrage.

[Architecture commune](ARCHITECTURE-BLOCKS.md) · [Spécification Laboratoire](LABORATORY.md).

## Pour enregistrer une nouvelle app

Valider ensemble : nom et rôle principal, données propriétaires, écrans de base, modules partagés, notifications, flux LINK, dépendances, DA, dépôt et méthode de déploiement. Ensuite ouvrir le ticket de lancement, créer le dépôt, inscrire l'app dans FORGE et dans LINK, et exécuter la recette de sécurité et de notification iPhone.

La liste du formulaire FORGE et l'autorisation de création des tickets sur `forge-hub` doivent être modifiées ensemble lors de l'ajout d'une app. Un identifiant inconnu ne doit pas être accepté automatiquement.

**Historique archivé** : tickets GitHub #1–#39 et branche `snapshot/forge-preclean-2026-11-15`; ne fait plus partie du catalogue actif.
