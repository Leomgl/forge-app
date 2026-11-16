## 16/11/2026 — naissance de CORTEX

CORTEX est validé comme première PWA métier de nouvelle génération : le cerveau/cockpit personnel, quand LINK reste le moteur des identités, échanges, permissions et Push. Architecture cinq onglets (Accueil, Modules, deux raccourcis personnalisables, Réglages BLOCKS). Données locales IndexedDB, pas de D1, cloud Worker statique. BLOCKS canoniques importés au build et versionnés. Notifications confiées à LINK, avec modèle de rappel pass J-7/H-15 ; la réception/propagation de modifications d'autres apps via LINK exige un contrat E2EE et la recette iPhone, non disponibles au lancement. Suivi [FORGE #53](https://github.com/Leomgl/forge-app/issues/53).

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

## Migration officielle des sources (15/11/2026)

- **Repos définitifs :** `Leomgl/laboratoire-app` et `Leomgl/blocks-app`, tous deux privés.
- **Versions :** LABORATOIRE V0.1.1 (compilation des CSS partagés et des modules) ; BLOCKS V0.1.0 (`b41d3fcf99c1d9dcfc0935db007e6678316c77f2`).
- **Dépendance :** bloc versionné par `blocks.lock.json`, injecté à la compilation du Worker et non dupliqué comme source dans LAB.
- **Cloudflare :** Worker `laboratoire-app` redéployé à 100 %, 0 binding et 0 D1 ; LINK et FORGE inchangés.
- **CI :** `blocks-app` teste les composants, `laboratoire-app` teste le bundle et la PWA ; pas d'accès automatique inter-dépôts privés pour recompiler en CI.
- **Ancien prototype :** branche `bootstrap/laboratoire-v0-1` de FORGE désormais historique uniquement, ne plus s'en servir comme dépôt de développement.
- **État de validation :** l'utilisateur a validé V0.1.0 sur iPhone et aime les DA Graphite et Papier ; la V0.1.1 post-migration doit être revalidée physiquement.

## Non décidées

Noms des nouvelles apps, ordre de reconstruction, périmètre fonctionnel et partage des données, identité graphique de la nouvelle génération, architecture des dépôts métiers, découpage précis des composants communs.

Ne pas traiter ces sujets comme déjà validés ; les cadrer avec l'utilisateur.

## Archive

Le registre historique et les décisions précédentes sont consultables sur la branche `snapshot/forge-preclean-2026-11-15` et dans l'historique GitHub. Ils ne sont pas des exigences de la nouvelle génération.
