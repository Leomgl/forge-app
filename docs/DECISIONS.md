# Décisions — fondation du 15 novembre 2026

## Confirmées

- **Reconstruction à zéro des apps métier** : aucun ancien projet métier n'est actuellement actif. Les prochains produits et leurs noms seront décidés ensemble.
- **LINK unique** : centralise identité, permissions, événements, synchronisation et notification Web Push. La sécurité et les ressources existantes sont préservées.
- **FORGE unique** : centralise le développement, les issues, commentaires, documentation et décisions, via GitHub + Cloudflare OAuth, sans créer de nouvelle base.
- **Catalogue de départ** : LINK + FORGE. `GENERAL` désigne un ticket transversal ou une idée de nouvelle app, pas une application.
- **Nouvelle génération d'issues** : #40 et suivantes dans le cockpit FORGE. Les anciennes issues sont archivées et consultables dans GitHub, hors tableaux actifs.
- **Modules communs à élaborer** : Réglages partagés et `Me notifier`, avec personnalisation à la DA et aux contraintes de l'app.
- **Cible budgétaire** : zéro abonnement supplémentaire ; limiter les coûts et lectures D1 Cloudflare.

## Décisions de lancement (15/11/2026)

- **LABORATOIRE**, PWA autonome et légère, est la première application à réaliser. Interface en pile de feuilles d'essai. Données fictives, aucune D1 propre ni moteur Push. Tickets FORGE #43.
- **BLOCKS**, bibliothèque transversale séparée des apps, fournit composants, comportements et tokens personnalisables. Ni duplication ni héritage forcé de DA. Tickets FORGE #44.
- **Ordre validé :** structure d'app et navigation → page Réglages universels → Me notifier → liaison/permissions LINK → nouveaux blocs au besoin.
- **Isolation :** les blocs construisent l'UI, les apps détiennent leur logique métier, LINK transporte les événements et distribue les notifications. Ne pas exiger que LINK déchiffre toutes les données privées.
- **Promotion :** bloc partagé seulement après deux scénarios distincts et une recette iPhone réelle.
- [Cahier d'architecture](ARCHITECTURE-BLOCKS.md) · [Spécification LABORATOIRE](LABORATORY.md).

## Non décidées

Noms des nouvelles apps, ordre de reconstruction, périmètre fonctionnel et partage des données, identité graphique de la nouvelle génération, architecture des dépôts métiers, découpage précis des composants communs.

Ne pas traiter ces sujets comme déjà validés ; les cadrer avec l'utilisateur.

## Archive

Le registre historique et les décisions précédentes sont consultables sur la branche `snapshot/forge-preclean-2026-11-15` et dans l'historique GitHub. Ils ne sont pas des exigences de la nouvelle génération.
