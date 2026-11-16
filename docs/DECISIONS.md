## 16/11/2026 — Relation LINK au niveau des collections, et non des objets

**Décision validée :** le contrat est l'unité d'autorisation. Exemple : un seul consentement `rituels → cortex / travel_kits` publie toutes les trousses disponibles de Rituels ; Cortex n'attache qu'une référence à un voyage. Plus de `Partager cette trousse via LINK` ni de `linkShared` effectif. Révisions par instantané complet, actualisation sur activité, sans polling ni seconde D1. Le changement étant un élargissement du partage, l'ancien grant a été désactivé et son snapshot supprimé ; l'utilisateur devra réapprouver la relation élargie sous Face ID. Versions LINK V0.13.9, Rituels V0.3.9 et Cortex V0.5.3 publiées ; test physique de la nouvelle règle en attente. Principe à suivre pour toute future relation, mais les schémas/scopes doivent rester spécifiques par catégorie. [FORGE #61](https://github.com/Leomgl/forge-app/issues/61).

## 16/11/2026 — CORTEX : l'UI d'abord, LINK ensuite

Priorité utilisateur : barre basse en icônes thématisées, modules groupés, calendrier et recherche, rappels Tous/Priorité/Date, contacts photos/4 favoris/index alphabétique. **Budget inchangé ; LINK reporté.** Aucun moteur LINK ou source BLOCKS modifié durant cette phase. CORTEX V0.1.2 publiée, recette iPhone en attente.

## 16/11/2026 — naissance de CORTEX

## 16/11/2026 — LINK V0.13.1 : interface BLOCKS, aucun changement métier

Décision appliquée et publiée après autorisation utilisateur : remplacer les Réglages de LINK par le module canonique BLOCKS, afficher sur l'accueil les apps/relations/sessions/messages en attente issus des APIs propriétaire existantes, et rendre les fiches Apps lisibles avec permissions et liens. **Limiter le périmètre à la présentation**, avec Face ID préalable pour toute donnée privée et aucune permission automatique. BLOCKS V0.3.3 est verrouillé dans LINK par commit/SHA-256 ; les mises à jour automatiques inter-dépôts restent à raccorder séparément en Phase 4. Livraison Cloudflare version `f2ae0fa5-2ff8-43d5-8b3c-c5a334f2e71f` à 100 % ; 25 bindings/D1/DO préservés ; tests automatiques verts, recette physique iPhone en attente. Suivi [FORGE #52](https://github.com/Leomgl/forge-app/issues/52).


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
