# FORGE — POINT D'ENTRÉE POUR L'ASSISTANT

**À ouvrir en premier à chaque nouvelle conversation lorsqu'on parle d'un ticket FORGE.** Mise en place : 2026-11-11. Ce document est une *aide à la reprise* ; une documentation ancienne ne prouve pas le comportement actuel d'une application.

## Mission

Le propriétaire dépose des idées, bugs et demandes d'évolutions. **L'assistant est le principal consommateur.** Il doit pouvoir commencer par « on va se concentrer sur le ticket #N » et disposer de tout le contexte nécessaire, sans demander de recopier l'historique du projet. Le système doit permettre des développements incrémentaux, sûrs et vérifiables.

## Dans l'ordre, ouvrir :

1. Cette page, puis `docs/APP-MAP.md`, `docs/DEPENDENCIES.md` et `docs/TICKET-PROTOCOL.md`.
2. L'issue `Leomgl/forge-app#N`, ses commentaires et éventuels liens de PR/commit. Relever app, reproduction, attendu, état, version, décision précédente.
3. **La branche actuelle du dépôt de l'application ciblée** : README, docs associées, points d'entrée du code, tests disponibles, derniers commits pertinents. Le contenu GitHub prime sur les versions instantanées dans FORGE.
4. Les autres dépôts **uniquement si le ticket touche un contrat d'intégration** (par ex. Gaming → NEXUS). Vérifier les deux côtés du contrat, les permissions et les chemins de migration.
5. Établir une fiche d'exécution : diagnostic / hypothèse, périmètre, points de non-régression, sauvegarde/migration, tests, plan de retour arrière.

## Format d'une réponse utile au propriétaire

- « Voilà ce que fait l'app aujourd'hui » (à partir du code actuel) ;
- « Voilà l'origine probable du problème / le changement ciblé » ;
- « Ces fichiers et fonctionnalités sont concernés » ;
- « Voilà comment intervenir sans perdre les données ni casser les autres modules » ;
- « Voilà les tests automatisés et les tests iPhone à faire ».
- Après implémentation : version/commit, ce qui est réellement vérifié, ticket actualisé, documentation modifiée.

**Ne jamais prétendre** qu'une issue locale non publiée, une photo présente uniquement sur l'iPhone, une conversation passée ou une démo simulée est automatiquement visible. GitHub est lu **à la demande**, pas en tâche de fond.

## Sources de vérité

| Type | Autorité |
|---|---|
| Code et versions réellement livrées | Dépôts GitHub des 6 apps (NEXUS, GAMING, RITUEL, VESTIAIRE, SANTÉ, GARAGE) et de FORGE + configuration de déploiement |
| Demandes / bugs / arbitrages | Issues et commentaires de `Leomgl/forge-app` |
| Contrats techniques inter-apps | Code des deux côtés + docs des dépôts |
| Inventaire d'architecture transversal | `docs/APP-MAP.md`, `docs/DEPENDENCIES.md` (à actualiser) |
| Vérification iPhone physique | Retour explicite du propriétaire ou test réellement exécuté |

## Invariants absolus

- Préserver **données utilisateur** et schémas de stockage (IndexedDB/localStorage, exports, identifiants). Migrations additives et réversibles, sauvegarde avant modifications risquées.
- Préserver les frontières de sécurité et les secrets de NEXUS LINK, des coffres, push VAPID et imports Fits.
- Ne pas modifier une autre application pour « simplifier » un ticket sans analyser les contrats existants.
- PWA iPhone sans App Store, sans abonnement, gratuit sous les limites Free ; vérifier safe areas et comportement hors ligne.
- Ne jamais activer une dépense ni un service payant sans validation du propriétaire.
- Les tests Chromium/Node ne prouvent pas le rendu Safari iOS. Décrire précisément le niveau de preuve.
- Ne jamais mettre d'informations privées dans un dépôt ou une issue publics.

## Liens

- [Issues FORGE](https://github.com/Leomgl/forge-app/issues)
- [NEXUS](https://github.com/Leomgl/nexus-app)
- [GAMING](https://github.com/Leomgl/gaming-app)
- [RITUEL](https://github.com/Leomgl/rituel-app)
- [VESTIAIRE](https://github.com/Leomgl/Vestiaire-app)
- [SANTÉ (privé)](https://github.com/Leomgl/sante-app)
- [GARAGE (privé)](https://github.com/Leomgl/garage-app)

Voir aussi `docs/TICKET-PROTOCOL.md` pour le cycle complet et `docs/DECISIONS.md` pour les choix transversaux.


## Mise à jour V0.3 — pilotage des statuts FORGE

Les états visibles dans la PWA sont `À faire`, `En cours`, `Terminé`. Les tickets restent exclusivement sur GitHub Issues. Pour déterminer l'état actuel : `closed` signifie Terminé ; sinon lire `<!-- FORGE_META: {... "workflow":"doing" ...} -->` pour En cours ; tout autre ticket `open` vaut À faire. Pour modifier : fetch de l'issue actuelle, conserver son Markdown et les métadonnées, mettre `workflow=todo|doing|done` et ouvrir/fermer l'issue en conséquence via le connecteur GitHub. Vérifier ensuite l'état confirmé par GitHub. L'assistant peut effectuer la mise à jour avec sa connexion GitHub sans demander le jeton que l'utilisateur peut saisir localement dans la PWA. Toujours respecter les tests, les contraintes de non-régression et le bilan de livraison.

## Mise à jour FORGE V0.4 — édition sans PAT dans la PWA

Source serveur dans `edge-worker/index.mjs`, adresse dédiée `https://forge-hub.q9pfwtztsc.workers.dev/`. Une fois une GitHub App installée sur le **seul** repo `Leomgl/forge-app` avec droits Issues et les deux identifiants configurés dans les secrets Cloudflare, l'utilisateur peut se connecter via OAuth et piloter les tickets sans saisir de PAT. **Au 12/11/2026, l'utilisateur a confirmé sur iPhone que l'authentification GitHub fonctionne.** Le Worker est désormais en V0.5 (déploiement 100 % confirmé) ; revérifier toute nouvelle session plutôt que supposer l'utilisateur connecté. Lire `docs/GITHUB-AUTH.md`. L'assistant continue d'opérer directement avec son outil GitHub et de relire le code réel de l'app concernée.


## Routine obligatoire pour les prochains threads « Apps iPhone » (12/11/2026)

- Quand un chantier touche une app existante : consulter sa branche actuelle, les PR fusionnées et si nécessaire ses Workers/D1/Pages Cloudflare ; ne pas supposer que l'instantané FORGE est à jour.
- À l'arrivée d'une nouvelle app : l'ajouter à `app.js` (registre unique alimentant **cartes + filtres + formulaire**), et autoriser son préfixe dans `edge-worker/index.mjs` pour publier un ticket depuis la PWA ; déployer le Worker si ce code change. Mettre à jour `README.md`, `docs/APP-MAP.md`, `docs/DEPENDENCIES.md` et `docs/EVOLUTION-HISTORY.md`.
- En cas d'évolution importante, de correction ou de contrat NEXUS LINK : synchroniser contexte, suivi et dépendances **pendant la conversation**, et créer/compléter la GitHub Issue appropriée sans duplication. Documenter version réellement livrée, tests automatiques et recette Safari iPhone restant à effectuer.
- Garder la confidentialité : issues/docs FORGE publics, repos `sante-app` et `garage-app` privés ; aucun détail médical, identifiant d'objet, photo, secret ou export utilisateur dans FORGE.
- FORGE ne se met pas à jour tout seul quand un thread se termine. Le rituel est une action de développement à exécuter dans le même chantier, pas une promesse de veille automatique.

## FORGE V0.6 — journal des interventions

La fiche interne `#ticket/N` affiche la description entière ainsi que les commentaires de l'issue GitHub. **Lire les commentaires précédents** pour éviter de reposer des questions déjà tranchées ou de dupliquer un correctif. Après une intervention, **ajouter réellement un commentaire GitHub** (ce que j'ai fait, pourquoi, comment, PR/commit, tests, recette iPhone, suite). Quand l'issue est terminée, mettre à jour son état avec preuve de livraison. Une réponse dans le chat n'est pas automatiquement visible dans FORGE : il faut publier le commentaire pendant le chantier. Ne jamais publier de données privées (notamment Santé ou Garage).

## FORGE V0.7 — traiter les tickets GÉNÉRAL

Les tickets `[GENERAL]` ne désignent **aucun dépôt unique**. Lire `FORGE_META.scope` (`all`, `multiple`, `newapp`, `other`) et `scopeDetails`, ainsi que le corps et les commentaires. Pour un chantier transversal : identifier les dépôts réellement impactés, synchroniser la cartographie/contrats, préparer la cohérence et les risques de régression pour chaque app. Pour une création : le dépôt peut ne pas exister ; ne pas inventer une URL ni ajouter une app au catalogue avant création effective. Garder un seul ticket central pour la coordination, avec commentaires de livraison par étape. Source de vérité GitHub et recette iPhone séparées.


## FORGE V0.8 — organisation de la PWA (12/11/2026)

La page d'accueil `#tickets` montre uniquement `À faire` + `En cours`. Les issues closes restent dans `#completed` et ont toujours leurs commentaires : **ne pas déduire de leur absence sur l'accueil qu'elles ont disparu**. Le formulaire est `#composer` et la cartographie est `#context`. Les liens `#ticket/N` ouvrent une fiche complète depuis n'importe quelle vue. Les changements d'état sont enregistrés sur GitHub via le Worker existant ; toute réouverture quitte les archives. Mettre à jour les docs et le journal de l'issue après intervention, comme auparavant.
