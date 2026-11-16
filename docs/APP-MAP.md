## RITUELS V0.1.0 — première PWA publiée (16/11/2026)

- **Nom / ID** : Rituels / `rituels` ; routine skincare personnelle, produits, stocks et trousses pour week-ends.
- **Repo GitHub** : [`Leomgl/rituels-app`](https://github.com/Leomgl/rituels-app) (privé), branche `main`, commit source `c053a7dde4f4ad8d72fcbfed42b7a8e12f1efdcf`.
- **Hébergement** : Worker Cloudflare statique `rituels-app` ; URL `https://rituels-app.q9pfwtztsc.workers.dev/` ; version Cloudflare `039ff052-8b20-4584-a509-39e2dce9047d`, trafic 100 %, workers.dev activé ; **0 binding, 0 D1, 0 cron, 0 scheduler Push**.
- **App** : `V0.1.0`, manifest / Service Worker indépendant, stockage IndexedDB local, sauvegarde JSON et import manuel, autonomie offline après mise en cache.
- **BLOCKS** : V0.3.3 verrouillé SHA `700ae421a2c2d56536c3793afa9f6f807973e72a`; shell, settings, theme, density, pwa-update et CSS canoniques importés au build, sans copie de source dans le repo.
- **LINK/Cortex** : pas de SDK actif, aucune permission accordée, aucune dépense/liaison trousse envoyée. Contrats futurs via LINK exclusivement : `rituels.purchase.recorded.v1`, `rituels.kit.linked.v1`, validation de permission/anti-doublons préalable.
- **Recette** : six tests métier OK et CI GitHub verte ([exécution](https://github.com/Leomgl/rituels-app/actions/runs/43790514310)). Mise en ligne confirmée Cloudflare ; contrôle HTTP externe et recette tactile/installation iPhone à confirmer. Fiches produits officielles et éventuel branchement LINK à compléter ultérieurement. [FORGE #54](https://github.com/Leomgl/forge-app/issues/54).

## CORTEX V0.1.2 — consolidation de l'interface (16/11/2026)

## LINK live — V0.13.3 au 16/11/2026

Le Worker `link-app` sert **LINK V0.13.3 à 100 %** (Cloudflare version `f637f007-d717-4ade-a285-ada0be63647f`). Ce patch corrige uniquement la vérification des mises à jour PWA anciennement susceptible d'être servie depuis un cache obsolète : manifeste réseau non pré-caché et URL anti-cache. **25 bindings D1/DO/Push préservés**, BLOCKS V0.3.3 inchangé, distribution des patchs BLOCKS restant un chantier distinct. Voir [FORGE #57](https://github.com/Leomgl/forge-app/issues/57). La recette de la nouvelle version dans la PWA iPhone reste à confirmer.


## LINK — Version live au 16/11/2026

LINK `link-app` est désormais en **V0.13.2** (Worker Cloudflare version `f07d14df-d75a-4813-a1c0-c990423beab6`, 100 %). Le raccourci Face ID du hero « Ton réseau » rejoint les points d'accès existants dans Réglages et Apps ; **même session propriétaire WebAuthn**, aucune API nouvelle. BLOCKS V0.3.3 reste au même verrou de dépendances, distribution automatique toujours à raccorder dans [#51](https://github.com/Leomgl/forge-app/issues/51). D1, DO, Push et les 25 bindings conservés. Suivi [FORGE #56](https://github.com/Leomgl/forge-app/issues/56) ; confirmation tactile du raccourci iPhone en attente.


**PWA publiée** : https://cortex-app.q9pfwtztsc.workers.dev/ ; Cloudflare `cortex-app` version `37880540-cdbc-4a31-8a8b-dbb254f31b4c` à **100 %**, sans nouveau binding/D1. [CI CORTEX V0.1.2 verte](https://github.com/Leomgl/Cortex-app/actions/runs/43787564500). **Recette tactile iPhone en attente**.

- Navigation : correction de la barre inférieure héritée de BLOCKS (transform/position), **5 icônes dynamiques** utilisant `currentColor` et les tokens d'apparence BLOCKS. Les raccourcis 1 et 2 suivent le module choisi.
- Modules : Organisation (Agenda, Rappels, Notes) ; Carnet personnel (Contacts) ; Finances (Budget).
- Agenda : calendrier mensuel cliquable, repères sur les jours occupés, recherche, sélection d'un jour pour voir/créer un RDV, prochains rendez-vous sous la grille.
- Rappels : bloc Aujourd'hui, liste par Tous / Priorité / Date, choix de priorité par rappel, zone Terminé.
- Contacts : prénom/nom, photos recadrées localement, quatre favoris, barre de recherche, index A–Z, import VCF et liens système tel/SMS/email.
- **Budget inchangé. LINK inchangé et ajourné**, en attendant une base UI robuste ; aucune synchronisation métier inter-app déclarée opérationnelle.
- Enregistrements IndexedDB et sauvegarde JSON préservés, BLOCKS V0.3.3 et SDK LINK verrouillés.
- Suivi : [FORGE #53](https://github.com/Leomgl/forge-app/issues/53).

# Registre de la nouvelle génération

## Livraison LINK — V0.13.1 (16/11/2026)

**LINK V0.13.1 est déployé à 100 %** sur le Worker existant `link-app` : [PR #9 fusionnée](https://github.com/Leomgl/link-app/pull/9), [FORGE #52](https://github.com/Leomgl/forge-app/issues/52), version Cloudflare `f2ae0fa5-2ff8-43d5-8b3c-c5a334f2e71f` (déploiement `6ab8ad55-d75d-4ae0-81d6-f98f46dc9123`). Interface uniquement : accueil réseau, fiches Apps/Relations, Réglages universels de BLOCKS V0.3.3 importés au build et verrouillés (commit `92c79f8bd26be85ecdf50260090d7ee5f80355ae`, hashes SHA-256). Les 25 bindings, D1 et Durable Object sont conservés. **Test physique iPhone encore à valider** (Face ID, pairing, Push et affichage). La distribution automatique des PATCH BLOCKS vers LINK reste à intégrer à la Phase 4 et ne doit pas être confondue avec l'import versionné actuel.


Version du registre : **2026-11-15 / FORGE V0.10.2**.

| Identifiant | Produit | Fonction | Dépôt GitHub | Cloudflare |
|---|---|---|---|---|
| LINK | LINK | Connexions chiffrées, permissions, notifications centralisées | `Leomgl/link-app` | Worker `link-app`, D1 `link-hub-db`, ordonnanceur DO |
| FORGE | FORGE | Catalogue, tickets, décisions, interventions et documentation | `Leomgl/forge-app` | Worker `forge-hub` (OAuth) |
| CORTEX | CORTEX | Gestionnaire personnel : agenda, rappels, notes, contacts, budget | `Leomgl/Cortex-app` | Worker `cortex-app` (statique, 0 binding, 0 D1) |
| RITUELS | Rituels | Routines skincare, produits, stocks, trousses | `Leomgl/rituels-app` | Worker `rituels-app` (statique, 0 binding, 0 D1) |

## Règle d'enregistrement d'une nouvelle app

**Avant toute création de PWA métier**, appliquer le [Guide obligatoire de création d'app](APP-CREATION-GUIDE.md). Déclarer ici nom, rôle, dépôt, URL, Worker, données, modules BLOCKS **importés** (versions/commit, jamais copiés), connexion LINK, permissions, coûts, tests et recette iPhone. La distribution automatique des mises à jour BLOCKS est suivie dans [FORGE #51](https://github.com/Leomgl/forge-app/issues/51) : **non implémentée à ce jour**.

## Projets de construction validés, hors catalogue métier

| Projet | Statut | Rôle |
|---|---|---|
| BLOCKS | Dépôt officiel `Leomgl/blocks-app`, V0.1.0 — thème/shell/réglages/styles, [FORGE #44](https://github.com/Leomgl/forge-app/issues/44) | Bibliothèque versionnée de composants et comportements personnalisables |
| LABORATOIRE | Dépôt officiel `Leomgl/laboratoire-app`, déployé V0.1.1 — recette post-migration à confirmer, [FORGE #43](https://github.com/Leomgl/forge-app/issues/43) | PWA légère, feuilles d’expérimentation pour tester et valider BLOCKS sur iPhone |

**Laboratoire :** https://laboratoire-app.q9pfwtztsc.workers.dev/ ; Worker `laboratoire-app` (0 binding/D1). **Sources officielles :** `Leomgl/laboratoire-app` (PWA + build + tests + artefact) et `Leomgl/blocks-app` (modules ESM + styles CSS + tests). **BLOCKS est épinglé au commit** `b41d3fcf99c1d9dcfc0935db007e6678316c77f2` par `blocks.lock.json`, et assemblé dans `dist/worker.mjs`. L'ancien bootstrap FORGE n'est plus qu'une archive.

**CORTEX V0.1.1** est la première PWA métier publiée en recette, non encore validée sur iPhone. URL : https://cortex-app.q9pfwtztsc.workers.dev/ ; repo `Leomgl/Cortex-app`, [ticket #53](https://github.com/Leomgl/forge-app/issues/53). Les données sont locales dans IndexedDB, sauvegardables par export JSON. L'app importe BLOCKS V0.3.3 (SHA `700ae421a2c2d56536c3793afa9f6f807973e72a`) et SDK LINK commit `97f7ed86525351421a25eb204ae29c14f60a6443` ; l'édition inter-app est en attente du contrat chiffré, tout comme la recette Push.

**CORTEX et RITUELS sont les deux PWA métiers publiées en recette ; aucune recette physique iPhone de RITUELS n'est encore validée.**

[Architecture commune](ARCHITECTURE-BLOCKS.md) · [Spécification Laboratoire](LABORATORY.md).

## Pour enregistrer une nouvelle app

Valider ensemble : nom et rôle principal, données propriétaires, écrans de base, modules partagés, notifications, flux LINK, dépendances, DA, dépôt et méthode de déploiement. Ensuite ouvrir le ticket de lancement, créer le dépôt, inscrire l'app dans FORGE et dans LINK, et exécuter la recette de sécurité et de notification iPhone.

La liste du formulaire FORGE et l'autorisation de création des tickets sur `forge-hub` doivent être modifiées ensemble lors de l'ajout d'une app. Un identifiant inconnu ne doit pas être accepté automatiquement.

**Historique archivé** : tickets GitHub #1–#39 et branche `snapshot/forge-preclean-2026-11-15`; ne fait plus partie du catalogue actif.
