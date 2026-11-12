# Protocole FORGE — traitement d'un ticket

## Ticket de référence : GitHub Issue dans Leomgl/forge-app

Un ticket publié est un numéro de type `Leomgl/forge-app#12`. Une note non publiée dans la PWA est un **brouillon local**, invisible à ChatGPT. L'issue peut être créée manuellement ou via un formulaire prérempli de l'application, connecté au compte GitHub de l'utilisateur.

La description doit idéalement contenir :
- Application, type (bug/idée/évolution/test), importance et contexte ;
- Version visible, comportement observé, comportement attendu, étapes de reproduction ;
- Contrainte/décisions, risques et éventuelles captures expurgées ;
- Critères de validation/recette, liens vers le dépôt source et documents ;
- Commentaires au fil des choix, commit/PR après intervention.

Les intitulés `[NEXUS]`, `[GAMING]`, `[RITUEL]`, `[VESTIAIRE]`, `[SANTE]`, `[GARAGE]`, `[FORGE]` permettent le tri. Une métadonnée structurée dans un commentaire HTML est facultative ; ne faire confiance qu'aux données vérifiées dans le repo.

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


## À chaque thread de développement iPhone (contrat de maintenance du 12/11/2026)

1. Vérifier l'état courant du ou des dépôts GitHub, et l'infrastructure Cloudflare uniquement quand elle joue un rôle pour la modification ou la vérification.
2. Avant de terminer, mettre à jour le contexte FORGE si une nouvelle application, une version, une décision, un bug résolu ou un contrat technique a changé. Pour une nouvelle app, vérifier le registre unique `app.js`, les documents, et la liste blanche du Worker `edge-worker/index.mjs`.
3. Lier la livraison à l'issue existante, préciser la PR/les commits, l'impact sur les données et ce qui est **réellement** validé sur iPhone. Ne pas ouvrir des tickets doublons.
4. Ne pas attendre une exécution invisible après la conversation : la documentation et les changements doivent être effectués immédiatement dans le chantier.

## Compte rendu de développement en commentaires GitHub (V0.6)

**Toute intervention liée à un ticket** doit laisser, avant la fin de la conversation, un commentaire clair dans l'issue d'origine. Format de référence :

- **Fait** : modifications fonctionnelles visibles.
- **Pourquoi** : cause, arbitrage, choix retenu.
- **Comment** : fichiers concernés, commits/PR, Worker ou déploiement.
- **Vérifié** : tests réellement exécutés, niveau de confiance, risques.
- **À vérifier sur iPhone** : recette concrète à réaliser par le propriétaire.
- **Suite** : points ouverts, ou aucune suite si terminé.

La V0.6 permet de lire la demande et les échanges depuis la fiche intégrée et, une fois connecté, de commenter en direct via `POST /api/comments`. L'authentification et les en-têtes anti-CSRF restent côté Worker. GitHub conserve la source de vérité ; ne jamais stocker un token dans le navigateur ni promettre une automatisation des réponses entre threads.

## Ticket général / transversal (FORGE V0.7)

Créer un ticket `[GENERAL][IDEE|EVOLUTION|BUG|TEST]` pour un chantier commun, une future application ou une étude sans app cible. Le formulaire affiche le périmètre et les précisions seulement quand `GÉNÉRAL` est sélectionné. Valeurs : `scope=all|multiple|newapp|other`. Les détails et commentaires appartiennent à la même GitHub Issue et la même fiche de Forge.

**Ne pas dupliquer** artificiellement le même chantier sur toutes les applications : garder ce ticket comme référence et lier les commits/PR par app au fur et à mesure. Lors du diagnostic, déterminer les dépôts touchés, vérifier les dépendances et planifier les validations. Une nouvelle app n'est inscrite au registre Forge qu'une fois son dépôt et son contexte existants. Les issues demeurent publiques ; aucune donnée confidentielle d'autres apps.


## Navigation FORGE V0.8 — les tickets clos restent des sources d'histoire

Une issue `closed` est rangée dans **Terminés**, jamais sur l'accueil, même si son ancien `FORGE_META.workflow` indique encore `todo` ou `doing`. Ouvrir un ticket terminé, lire son corps/commentaires, et décider de la suite exactement comme pour un ticket actif ; la fermeture n'est pas une suppression. Lorsqu'on rouvre l'issue via son statut, elle revient dans l'accueil. Le formulaire est dans **Nouveau**, les fiches d'apps dans **Apps**. Préserver les liens `#ticket/N` en reprenant un ticket depuis un thread. Vérifier GitHub actuel à chaque fois ; le cache local est seulement une copie temporaire.
