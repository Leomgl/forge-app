# FORGE — Development Memory · V0.10.1

FORGE est le cockpit de suivi des **nouvelles applications iPhone**. L'architecture conservée au 15 novembre 2026 compte exactement deux applications : [LINK](https://github.com/Leomgl/link-app) et [FORGE](https://github.com/Leomgl/forge-app).

**Application :** https://forge-hub.q9pfwtztsc.workers.dev/

## V0.10.1 — nouvelle génération

## Nouvelle génération

- **LINK V0.12.0** : seul centre technique des connexions chiffrées, permissions inter-apps et notifications iOS. Les applications à venir devront s'y inscrire ; aucune app historique n'est encore retenue.
- **FORGE V0.10.1** : gestion des projets, tickets GitHub, décisions, versions, recettes et dépendances. Les nouvelles apps seront définies ensemble et ajoutées au catalogue après validation.
- **GitHub** : les issues de `Leomgl/forge-app` sont la référence des tickets. Les projets techniques et leur source vivent dans leurs dépôts distincts.
- **Cloudflare** : un Worker `forge-hub` assure l'interface FORGE et la session GitHub OAuth sécurisée. Pas de nouvelle base D1, ni nouveau Worker, ni système de notifications propres à FORGE.

## État initial du catalogue

| Projet | Rôle | Dépôt |
|---|---|---|
| LINK | Transport inter-apps, identité, permissions, Web Push | [link-app](https://github.com/Leomgl/link-app) |
| FORGE | Pilotage du développement et décisions | [forge-app](https://github.com/Leomgl/forge-app) |

Les **futures apps** restent à décider ensemble. Aucune ancienne app n'est recréée ou préinscrite par défaut.

## Tickets et archives

Les tickets de la nouvelle génération commencent au **#40**. Seuls les tickets de cette génération sont affichés dans les tableaux À faire, En cours et Terminés de FORGE. Les tickets précédents et leurs commentaires sont **conservés sur GitHub**, sans figurer dans le cockpit actif. Les références historiques de code/docs restent consultables dans la branche de sauvegarde `snapshot/forge-preclean-2026-11-15`.

Le ticket `GENERAL` est réservé aux idées non attribuées, décisions transversales, blocs communs ou à la préparation d'une nouvelle app. Il n'est pas une application supplémentaire.

## Fonctionnement

Le formulaire génère une issue avec le marqueur `FORGE_META` (projet, type, priorité, workflow, version), le contexte, les critères et les éléments à préserver. Les états sont À faire, En cours et Terminé. La publication directe, les commentaires et la modification des statuts passent par l'authentification GitHub sur le Worker `forge-hub`. Le jeton GitHub n'est jamais saisi manuellement dans la PWA.

La page de détail de ticket charge les commentaires et rend le Markdown en DOM sécurisé, sans HTML arbitraire. La PWA reste installable, et son Service Worker ne met pas en cache les API de session ni les écritures.

## Liens techniques

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
