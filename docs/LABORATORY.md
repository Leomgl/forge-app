# LABORATOIRE — première PWA de la nouvelle génération

**Validation produit :** l'utilisateur a décidé de construire en premier une PWA « Laboratoire », conçue comme une pile de feuilles vierges pour dessiner, tester et valider les blocs communs. Elle **n'est pas** une app métier définitive. Tickets : [#43](https://github.com/Leomgl/forge-app/issues/43) / [#44](https://github.com/Leomgl/forge-app/issues/44).

## Expérience

Accueil = carnet de feuilles. Une feuille = une expérience indépendante : nom du bloc, état (brouillon, essai, validé), zone de démonstration, variantes de thème, panneau de réglages et fiche de recette. On passe à la feuille suivante sans imposer une grosse navigation.

**Feuille 01 — Shell** : en-tête, navigation, actions contextuelles, état vide et vue mobile; switch immédiat entre deux directions graphiques distinctes. Aucune logique métier.

**Feuille 02 — Réglages** : sections communes Version/À propos/Mise à jour/Confidentialité et sections injectées spécifiques au produit. Faire la preuve de l'adaptation à deux apps fictives.

**Feuille 03 — Me notifier** (après les deux précédentes) : un seul bloc affiché en modes rendez-vous et stock/fin de pass ; sortie objet de configuration sans émettre de Web Push. Test LINK seulement ensuite via environnement autorisé.

## Architecture minimale

- PWA HTTPS installable : `manifest.webmanifest`, icônes, `sw.js`, cache prudent, version affichée.
- Bibliothèque BLOCKS : import réel depuis un module partagé plutôt que duplication du code.
- Zero D1 propre, zero moteur de notifications, zero cron; données de démo en mémoire, éventuellement thème préféré en localStorage.
- Toutes les interactions de prototype restent locales et réinitialisables.
- Chaque feuille se teste sur iPhone avec retour utilisateur avant promotion.
- Les nouveaux domaines métier restent **à décider** ; ne pas recréer les anciennes apps à partir d'exemples fictifs.

## Source / déploiement

Cible : deux dépôts séparés `laboratoire-app` et `blocks`. Si la création de nouveaux dépôts est indisponible depuis les connecteurs, utiliser **temporairement une branche de bootstrap isolée de `forge-app` sans fusion dans `main`**, et un Worker Cloudflare dédié au laboratoire. Migrer dans les dépôts propres dès leur création. Ne pas importer ce code de prototype dans FORGE en production.

Cible de première livraison : PWA accessible, deux feuilles fonctionnelles, deux thèmes et composants ESM versionnables, recette Safari iPhone demandée. Déploiement du Laboratoire distinct de LINK et FORGE, sans liaison ni base de données supplémentaire.
