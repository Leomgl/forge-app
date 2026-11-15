# FORGE — point d'entrée IA / nouvelle génération

**Dernière mise à jour : 15 novembre 2026.**

Au démarrage d'une nouvelle conversation sur les apps iPhone :

1. Consulter les GitHub Issues actuelles `Leomgl/forge-app`, particulièrement les tickets **#40 et suivants**, et les commentaires pertinents.
2. Vérifier les dépôts réellement présents et la version déployée. **À ce jour seuls LINK et FORGE sont les projets actifs.**
3. LINK V0.12.0 est l'unique noyau des notifications et liaisons : préserver Worker `link-app`, D1 `link-hub-db`, Durable Object, Web Push et passkeys. FORGE V0.10.1 gère le travail via `forge-hub` et GitHub OAuth.
4. Pour une nouvelle app, **convenir avec l'utilisateur** de son objectif, frontières, écrans, données, DA, modules communs, contrat LINK, notifications et ordre de priorité avant d'ajouter une entrée au catalogue.
5. L'utilisateur autorise les interventions techniques sur les projets concernés, mais les suppressions doivent rester cohérentes avec la cible et les preuves de déploiement.
6. Mettre à jour les tickets GitHub et `docs/APP-MAP.md`, `docs/DEPENDENCIES.md`, `docs/DECISIONS.md` lorsque la configuration change ; ne jamais annoncer qu'un test iPhone a été réalisé sans retour de l'utilisateur.
7. Ne jamais exposer de jeton, code OAuth, informations privées, clés Web Push ou secrets de Worker.

L'ancien registre et ses dépendances ont été désactivés. Son historique reste dans la branche `snapshot/forge-preclean-2026-11-15` et les issues GitHub antérieures au #40 ; **ne pas l'utiliser comme source des projets actuels**.

**Liens utiles :** [FORGE Issues](https://github.com/Leomgl/forge-app/issues), [LINK](https://github.com/Leomgl/link-app), [FORGE](https://github.com/Leomgl/forge-app).
