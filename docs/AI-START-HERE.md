# FORGE — point d'entrée IA / nouvelle génération

**Dernière mise à jour : 15 novembre 2026.**

**SOURCES OFFICIELLES, 15/11/2026 :** LABORATOIRE V0.1.1 est en ligne https://laboratoire-app.q9pfwtztsc.workers.dev/ et son dépôt officiel est [Leomgl/laboratoire-app](https://github.com/Leomgl/laboratoire-app) (`main`). BLOCKS V0.1.0 est dans [Leomgl/blocks-app](https://github.com/Leomgl/blocks-app) (`main`, SHA `b41d3fcf99c1d9dcfc0935db007e6678316c77f2`). Le fichier `laboratoire-app/blocks.lock.json` épingle la dépendance ; `dist/worker.mjs` regroupe les deux sources **sans dupliquer les modules maintenables**. CI des deux repos vertes ; Worker LAB diffusé à 100 %, 0 binding/D1, aucun Push. L'utilisateur a validé sur iPhone V0.1.0 et les DA Graphite/Papier ; **recette de la V0.1.1 post-migration à refaire**. La branche provisoire FORGE `bootstrap/laboratoire-v0-1` est **ARCHIVE seulement**, ne plus y coder.

**NOUVELLE DÉCISION VALIDÉE (15/11/2026) :** LABORATOIRE est la première PWA à développer, et BLOCKS est la bibliothèque des modules réutilisables. Le Laboratoire sert à tester les blocs, pas à stocker des données métier. Lire [ARCHITECTURE-BLOCKS.md](ARCHITECTURE-BLOCKS.md) et [LABORATORY.md](LABORATORY.md) **avant tout nouveau développement**. Tickets : #41 (plan), #43 (LABORATOIRE), #44 (BLOCKS).

Au démarrage d'une nouvelle conversation sur les apps iPhone :

1. Consulter les GitHub Issues actuelles `Leomgl/forge-app`, particulièrement les tickets **#40 et suivants**, et les commentaires pertinents.
2. Vérifier les dépôts réellement présents et la version déployée. **LINK + FORGE sont les deux services de fondation en production ; BLOCKS + LABORATOIRE sont les nouveaux travaux validés.**
3. LINK V0.12.0 est l'unique noyau des notifications et liaisons : préserver Worker `link-app`, D1 `link-hub-db`, Durable Object, Web Push et passkeys. FORGE V0.10.1 gère le travail via `forge-hub` et GitHub OAuth.
4. Pour une nouvelle app, **convenir avec l'utilisateur** de son objectif, frontières, écrans, données, DA, modules communs, contrat LINK, notifications et ordre de priorité avant d'ajouter une entrée au catalogue.
5. L'utilisateur autorise les interventions techniques sur les projets concernés, mais les suppressions doivent rester cohérentes avec la cible et les preuves de déploiement.
6. Mettre à jour les tickets GitHub et `docs/APP-MAP.md`, `docs/DEPENDENCIES.md`, `docs/DECISIONS.md` lorsque la configuration change ; ne jamais annoncer qu'un test iPhone a été réalisé sans retour de l'utilisateur.
7. Ne jamais exposer de jeton, code OAuth, informations privées, clés Web Push ou secrets de Worker.

L'ancien registre et ses dépendances ont été désactivés. Son historique reste dans la branche `snapshot/forge-preclean-2026-11-15` et les issues GitHub antérieures au #40 ; **ne pas l'utiliser comme source des projets actuels**.

**Liens utiles :** [FORGE Issues](https://github.com/Leomgl/forge-app/issues), [LINK](https://github.com/Leomgl/link-app), [FORGE](https://github.com/Leomgl/forge-app).
