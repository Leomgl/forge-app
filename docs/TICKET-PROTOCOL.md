# FORGE — protocole de ticket de la nouvelle génération

## Règles

Le projet source de vérité est [GitHub Issues](https://github.com/Leomgl/forge-app/issues) sur `Leomgl/forge-app`. Les tickets actifs de la nouvelle génération portent un numéro **#40 ou supérieur**. Les anciens tickets ne figurent pas dans l'interface FORGE, mais leurs pages/commentaires demeurent consultables sur GitHub.

Les projets disponibles sont :
- `LINK` : noyau des synchronisations et notifications.
- `FORGE` : gestion du suivi du développement.
- `CORTEX` : première PWA métier (app manager), ticket #53, recette iPhone en attente. Publication des tickets via l'interface FORGE en attente de mise à jour coordonnée de l'allowlist OAuth du Worker.
- `GENERAL` : idée ou chantier transversal **sans app spécifique**.

Un nouveau nom d'app n'est autorisé qu'après définition et mise à jour coordonnée du catalogue FORGE et de l'allowlist du Worker OAuth.

## Création

Le préfixe est `[PROJET][BUG|EVOLUTION|IDEE|TEST]`. Le corps contient `<!-- FORGE_META: {...} -->`, le contexte, les étapes, les critères, contraintes et points de contrôle. Les tickets `GENERAL` acceptent `scope=all|multiple|newapp|other` et des précisions.

**Statuts** : Issue fermée = Terminé ; issue ouverte avec `workflow=doing` = En cours ; toute autre issue ouverte = À faire. Conserver le corps de la demande lors d'une modification ; utiliser l'horodatage GitHub pour détecter les conflits.

## Intervention

1. Lire l'issue et ses commentaires, puis le code et la version réellement déployés.
2. Identifier ce qu'il faut préserver, notamment LINK, la PWA FORGE et les quotas Cloudflare.
3. Implémenter le plus petit changement cohérent ; vérifier syntaxe, tests, appels au service et sécurité.
4. Décrire précisément fichiers, commit/PR, migration, incidents, preuve de validation et recette iPhone restante dans un commentaire du ticket.
5. Actualiser le registre, les dépendances et les décisions si la nouvelle génération évolue.

## Sécurité

La création, le changement de statut et les commentaires passent par le Worker OAuth FORGE, avec session HTTP-only. Aucun PAT dans la PWA, aucun secret dans les docs ou issues. Seuls les nouveaux projets autorisés peuvent être publiés depuis le formulaire.
