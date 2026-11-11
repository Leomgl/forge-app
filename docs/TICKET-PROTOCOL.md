# Protocole FORGE — traitement d'un ticket

## Ticket de référence : GitHub Issue dans Leomgl/forge-app

Un ticket publié est un numéro de type `Leomgl/forge-app#12`. Une note non publiée dans la PWA est un **brouillon local**, invisible à ChatGPT. L'issue peut être créée manuellement ou via un formulaire prérempli de l'application, connecté au compte GitHub de l'utilisateur.

La description doit idéalement contenir :
- Application, type (bug/idée/évolution/test), importance et contexte ;
- Version visible, comportement observé, comportement attendu, étapes de reproduction ;
- Contrainte/décisions, risques et éventuelles captures expurgées ;
- Critères de validation/recette, liens vers le dépôt source et documents ;
- Commentaires au fil des choix, commit/PR après intervention.

Les intitulés `[NEXUS]`, `[GAMING]`, `[RITUEL]`, `[VESTIAIRE]` permettent le tri. Une métadonnée structurée dans un commentaire HTML est facultative ; ne faire confiance qu'aux données vérifiées dans le repo.

## Reprise dans n'importe quelle conversation

Lorsque l'utilisateur dit « On attaque le ticket #12 » :

1. Ouvrir `docs/AI-START-HERE.md`.
2. Lire l'issue **#12 et tous ses commentaires**, pas uniquement son titre.
3. Identifier la source du code actuelle, README, version, dépendances, contraintes, commits récents pertinents.
4. Présenter une synthèse de travail, détecter les contradictions ou faits obsolètes.
5. Définir solution minimale, migrations, plan de test, état attendu et retour arrière.
6. Implémenter et vérifier, sans casser le reste, puis écrire l'état réel de la livraison dans l'issue et les docs concernées.

## Règles de statuts (FORGE V0.3)

**Source de vérité : GitHub Issues, jamais le cache iPhone.**

- **À faire** : issue `open` et `FORGE_META.workflow` absent, `todo` ou autre valeur non reconnue (rétrocompatibilité).
- **En cours** : issue `open` et métadonnée `FORGE_META.workflow=doing` dans le commentaire HTML en tête du corps.
- **Terminé** : issue `closed`, quelle que soit la métadonnée. Fermer une issue est une action volontaire, pas une preuve de recette iPhone.

Pour passer de l'un à l'autre, modifier le commentaire HTML `FORGE_META` sans effacer les autres champs ni le Markdown et appliquer l'état GitHub `closed` pour Terminé / `open` pour les deux autres. Une réouverture manuelle d'une issue précédemment terminée sans mise à jour du workflow vaut **À faire**, sauf si l'on choisit explicitement `doing`. Ne pas confondre `not_planned` avec une livraison : une issue fermée comme rejetée ou doublon doit être documentée comme telle.

**Quand l'assistant change un statut :** lire d'abord la version actuelle de l'issue et ses commentaires, mettre à jour métadonnée et état via GitHub, contrôler le résultat, écrire le compte rendu/commit dans un commentaire si pertinent. Ne jamais changer le statut sur la seule base du cache FORGE.

**Depuis la PWA V0.4 :** l'origine Cloudflare dédiée gère une connexion GitHub App OAuth sans jeton à coller. Après installation de la GitHub App (permission `Issues: Read and write` sur le seul dépôt FORGE), le Worker vérifie une session sécurisée puis écrit dans GitHub. Les jetons restent dans un cookie chiffré HttpOnly de la même origine et n'entrent jamais dans le JavaScript client. Voir [GITHUB-AUTH.md](GITHUB-AUTH.md). Une vérification de `updated_at` et du statut côté GitHub avant PATCH refuse un écrasement évident ; cela ne constitue pas une transaction atomique et une modification simultanée reste possible. Un rafraîchissement relit GitHub. Sans autorisation, lecture seule ou modification sur github.com.


## Exemple de suivi après intervention

- Diagnostic confirmé : …
- Solution : …
- Fichiers et modules modifiés : …
- Sauvegarde/migration : …
- Commit/PR : …
- Tests automatiques : …
- **Recette iPhone : à faire / réussie avec retour utilisateur**.
- Notes pour prochaine intervention : …

## Sécurité et limites

- Issues d'un dépôt public : ne pas publier captures nominatives, secrets, exports de stockage, codes d'accès, tokens ou données médicales.
- Aucun jeton GitHub ne doit être embarqué dans la PWA, le code source ou les stockages navigateur. Depuis V0.4, un jeton personnel ne doit plus être saisi : si la connexion GitHub App est active, le bouton « Publier » crée directement le ticket ; sinon il ouvre GitHub pour validation manuelle. Les secrets OAuth restent dans Cloudflare.
- GitHub API : lecture publique accessible sans compte et soumise aux limites de requêtes ; écritures authentifiées uniquement après action explicite.
- Les pièces jointes sont ajoutées **manuellement sur GitHub** après contrôle du contenu.
- La PWA n'exécute aucun travail en arrière-plan, aucune notification et aucune synchronisation de code.
