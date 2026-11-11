# FORGE — consignes pour assistant / agent développeur

La mission de ce dépôt est **de conserver la mémoire de travail technique** : besoins, bugs, décisions, dépendances et suivi de validation. L'application PWA FORGE elle-même est volontairement indépendante des applications suivies.

1. Lire `docs/AI-START-HERE.md` avant toute analyse d'issue.
2. Les tickets sont les **GitHub Issues de `Leomgl/forge-app`**, pas les brouillons locaux et pas des issues dispersées dans chaque dépôt.
3. Pour « ticket #N », ouvrir l'issue et **ses commentaires**, puis le dépôt de code actuel de l'app cible. Ne pas coder uniquement sur la base des notes FORGE.
4. Lire `docs/APP-MAP.md`, `docs/DEPENDENCIES.md` et `docs/EVOLUTION-HISTORY.md` ; vérifier les contrats et migrations avant de toucher aux données.
5. Après modification, référencer le commit, les fichiers touchés, les tests et la recette iPhone dans l'issue. Mettre à jour les documents transversaux si besoin.
6. Aucun secret ou donnée personnelle dans un dépôt public. Aucun service payant ou synchronisation entre apps sans accord.
7. Les tests simulés ne prouvent pas le résultat sur iPhone réel.

Le code principal de chaque app vit dans ses propres dépôts GitHub (liens dans `docs/APP-MAP.md`).

8. Statuts FORGE V0.3 : `closed` = Terminé ; `open` avec `FORGE_META.workflow=doing` = En cours ; autre `open` = À faire. Pour mettre à jour, préserver le corps existant et vérifier l'écriture distante. Ne jamais se fier à un statut local non publié.

9. Depuis FORGE V0.4, aucune saisie de jeton GitHub dans la PWA : utiliser la GitHub App avec OAuth et un Worker Cloudflare à origine dédiée. La mise en route initiale de la GitHub App et des secrets est requise et ne doit jamais être déclarée validée sans recette. Détails : `docs/GITHUB-AUTH.md`.
