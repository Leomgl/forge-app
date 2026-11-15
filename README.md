# FORGE — Development Memory · V0.10.1

## Statut actif : liaison LINK M4

**15 novembre 2026 — M4 liaison LINK (prototype intégré et déployé).** LABORATOIRE **V0.3.1** / BLOCKS **V0.2.3** / Worker LINK **V0.12.0 inchangé**. LINK a reçu un SDK navigateur (sans modification du Worker) au commit `9d98d59dbbd52ec6a818b4dbe2c1ce7a52cb2b1e` : échange d'invitation copiée `LHI1.laboratoire.…`, capacité temporaire et conversion de rappels en commandes `link.notification.command.v1` opaques. LAB a intégré l'enrôlement propriétaire, la vérification du grant, un stockage d'identité côté PWA (IndexedDB) et la programmation **volontaire d'une seule occurrence de test**. SDK LINK CI [verte](https://github.com/Leomgl/link-app/actions/runs/43771185719), LAB CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43771334855), Worker LAB `4b4448a1-9988-4d97-8d4a-8d91688c80d0` déployé à **100 %** sur la même URL. 16 assets, pas de nouvelle D1, Worker ou moteur Push. **La liaison réelle nécessite encore l'inscription et le grant propriétaire dans LINK, puis le test physique iPhone avec abonnement Push LINK.** Les révisions, annulations, files hors ligne et gestion du stock événementiel restent à construire avant app métier. Suivi : [FORGE #47](https://github.com/Leomgl/forge-app/issues/47), [manuel M4](./LINK-BRIDGE.md).

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

**Dernière livraison :** LABORATOIRE et BLOCKS V0.2.1 — feuille 03 avec saisie personnalisée Jours/Heures/Minutes pour RDV et pass, stock inchangé ; LINK n'a pas été modifié. V0.2.0 validée iPhone, V0.2.1 en attente de recette.

**Premières réalisations de l'architecture :** [LABORATOIRE V0.2.0](https://github.com/Leomgl/laboratoire-app) (PWA d'essais, https://laboratoire-app.q9pfwtztsc.workers.dev/) et [BLOCKS V0.2.0](https://github.com/Leomgl/blocks-app) (composants partagés ESM + CSS). Le `blocks.lock.json` de LAB verrouille le commit de BLOCKS ; le Worker est compilé à partir des deux sources privées. Les deux CI sont opérationnelles. Feuille 03 « Me notifier » en démonstration sur LAB, recette iPhone à faire ; aucun moteur Push local. Les anciens fichiers bootstrap FORGE ne sont plus actifs.

Les **futures apps** restent à décider ensemble. Aucune ancienne app n'est recréée ou préinscrite par défaut.

## Tickets et archives

Les tickets de la nouvelle génération commencent au **#40**. Seuls les tickets de cette génération sont affichés dans les tableaux À faire, En cours et Terminés de FORGE. Les tickets précédents et leurs commentaires sont **conservés sur GitHub**, sans figurer dans le cockpit actif. Les références historiques de code/docs restent consultables dans la branche de sauvegarde `snapshot/forge-preclean-2026-11-15`.

Le ticket `GENERAL` est réservé aux idées non attribuées, décisions transversales, blocs communs ou à la préparation d'une nouvelle app. Il n'est pas une application supplémentaire.

## Fonctionnement

Le formulaire génère une issue avec le marqueur `FORGE_META` (projet, type, priorité, workflow, version), le contexte, les critères et les éléments à préserver. Les états sont À faire, En cours et Terminé. La publication directe, les commentaires et la modification des statuts passent par l'authentification GitHub sur le Worker `forge-hub`. Le jeton GitHub n'est jamais saisi manuellement dans la PWA.

La page de détail de ticket charge les commentaires et rend le Markdown en DOM sécurisé, sans HTML arbitraire. La PWA reste installable, et son Service Worker ne met pas en cache les API de session ni les écritures.

## Liens techniques

- [Architecture BLOCKS · LABORATOIRE](docs/ARCHITECTURE-BLOCKS.md)
- [Spécification LABORATOIRE](docs/LABORATORY.md)
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
