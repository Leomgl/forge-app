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
| Code et versions réellement livrées | Dépôts GitHub des 4 apps + configuration de déploiement |
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

Voir aussi `docs/TICKET-PROTOCOL.md` pour le cycle complet et `docs/DECISIONS.md` pour les choix transversaux.


## Mise à jour V0.3 — pilotage des statuts FORGE

Les états visibles dans la PWA sont `À faire`, `En cours`, `Terminé`. Les tickets restent exclusivement sur GitHub Issues. Pour déterminer l'état actuel : `closed` signifie Terminé ; sinon lire `<!-- FORGE_META: {... "workflow":"doing" ...} -->` pour En cours ; tout autre ticket `open` vaut À faire. Pour modifier : fetch de l'issue actuelle, conserver son Markdown et les métadonnées, mettre `workflow=todo|doing|done` et ouvrir/fermer l'issue en conséquence via le connecteur GitHub. Vérifier ensuite l'état confirmé par GitHub. L'assistant peut effectuer la mise à jour avec sa connexion GitHub sans demander le jeton que l'utilisateur peut saisir localement dans la PWA. Toujours respecter les tests, les contraintes de non-régression et le bilan de livraison.
