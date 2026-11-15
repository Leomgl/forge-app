# Historique des livraisons — nouveau cycle

## 15 novembre 2026 — Migration des sources GitHub et LABORATOIRE V0.1.1

- L'utilisateur a créé les repos privés `Leomgl/laboratoire-app` et `Leomgl/blocks-app`. Code source officiellement migré ; `forge-app/bootstrap/laboratoire-v0-1` n'est plus source de vérité.
- BLOCKS V0.1.0 : 3 modules ESM, styles partagés CSS et tests verts ; commit `b41d3fcf99c1d9dcfc0935db007e6678316c77f2`.
- LABORATOIRE V0.1.1 : app et Worker empaquetant des modules BLOCKS depuis le commit verrouillé dans `blocks.lock.json`, sans copie source. GitHub Actions LAB et BLOCKS vertes.
- Worker Cloudflare `laboratoire-app` mis à jour à **100 % du trafic** ; même URL, 0 binding/D1 ; aucun changement LINK ou FORGE.
- L'utilisateur avait validé V0.1.0 sur iPhone et ses deux DA ; recette V0.1.1 encore à effectuer.

## 15 novembre 2026 — Lancement de BLOCKS et LABORATOIRE

- Documentation architecture validée par l'utilisateur, PR [#45](https://github.com/Leomgl/forge-app/pull/45) et tickets #41/#43/#44.
- LABORATOIRE V0.1.0 déployé indépendamment sur `laboratoire-app.q9pfwtztsc.workers.dev` ; code versionné sur branche isolée `bootstrap/laboratoire-v0-1` ; 2 feuilles, 2 DA, 3 modules réutilisables.
- CI [43762489809](https://github.com/Leomgl/forge-app/actions/runs/43762489809) validée, aucune D1 ni connexion LINK ; recette iPhone restante.
- Aucun changement de la version de FORGE V0.10.1 ni de LINK V0.12.0.

## 15 novembre 2026 — FORGE V0.10.1

- Dernières références stylistiques obsolètes nettoyées dans le code actif.
- Numérotation de version harmonisée dans tous les fichiers de la PWA.
- Aucun changement sur OAuth ou les données des tickets.

## 15 novembre 2026 — FORGE V0.10.0

- Nouvelle base : deux projets actifs, LINK et FORGE, sans anciennes apps métiers.
- Les anciens tickets et leurs commentaires sont conservés dans GitHub, mais exclus du cockpit FORGE ; la nouvelle génération commence au #40.
- Retrait des anciennes listes d'apps dans la création de ticket et de l'autorisation correspondante sur le Worker OAuth.
- Conservation de la navigation, des priorités, de la création de tickets, des commentaires, des statuts, de la recherche, des réglages et de l'installation iPhone.
- Documentation réinitialisée pour décrire le noyau LINK et la construction future des apps.
- Source pré-nettoyage : branche `snapshot/forge-preclean-2026-11-15`.

## Infrastructure protégée

Worker FORGE `forge-hub` : session OAuth GitHub sécurisée. Worker LINK `link-app` : notifications et connexions. Les secrets et bindings en production sont préservés.

Aucune validation d'interface iPhone ne peut être inférée d'une CI ou d'une requête serveur.
