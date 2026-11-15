# Historique des livraisons — nouveau cycle

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
