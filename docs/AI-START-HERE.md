# FORGE — point d'entrée IA / nouvelle génération

**Dernière mise à jour : 15 novembre 2026.**

**RELEASE COURANTE (15/11/2026) :** LABORATOIRE **V0.2.1** + BLOCKS **V0.2.1**, 15 novembre 2026 : nouvelle saisie des rappels en **Jours / Heures / Minutes** et champ numérique, ajout/suppression de plusieurs rappels (max. six) pour rendez-vous et fin de pass. Le seuil Stock est inchangé. BLOCKS commit `93a04c6429ade3885ef1c3cf3133240ecf3059e8` (CI verte [43767468999](https://github.com/Leomgl/blocks-app/actions/runs/43767468999)), LAB commit `0d3fcc4fff9ae552557f13c289e309c6aeb9df47` (CI verte [43767626205](https://github.com/Leomgl/laboratoire-app/actions/runs/43767626205)). Cloudflare Worker `laboratoire-app` version `91f2f399-b16e-483e-8349-1b715be5fee7` diffusée à **100 %**, même URL et aucune ressource ajoutée. Sortie `blocks.notify.v1` inchangée, LINK seul moteur de notifications, aucune intégration Web Push active dans LAB. **V0.2.0 a été validée fonctionnelle sur iPhone par l'utilisateur ; V0.2.1 nécessite encore recette iPhone.**

**HISTORIQUE SOURCES, 15/11/2026 :** LABORATOIRE V0.2.0 est déployé à 100 % sur https://laboratoire-app.q9pfwtztsc.workers.dev/ ; code : [Leomgl/laboratoire-app](https://github.com/Leomgl/laboratoire-app) (commit `213ea7e900f5efe9f31852478e3d116ca6e24d28`). BLOCKS V0.2.0 est dans [Leomgl/blocks-app](https://github.com/Leomgl/blocks-app) (commit `755c6f2387d6ccb21a6fca6ad00f3a54523d0b2f`). Trois feuilles disponibles : 01 Shell, 02 Réglages, 03 Me notifier (rendez-vous, pass, stock). Le module partagé `notify-editor.mjs` retourne un objet neutre `blocks.notify.v1`, jamais de Web Push local. Le lock LAB épingle BLOCKS et `dist/worker.mjs` embarque 11 ressources depuis les deux sources privées. CI des deux dépôts vertes. **V0.1.1 et V0.2.0 attendent encore la recette iPhone physique ; ne pas annoncer la validation manuelle.** La branche FORGE `bootstrap/laboratoire-v0-1` reste archivée ; ne plus y coder. LINK V0.12.0 et FORGE V0.10.1 n'ont pas changé.

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
