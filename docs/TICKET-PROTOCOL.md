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

## Règles de statuts

- **Open** : demande à traiter, diagnostiquée ou en test. Utiliser commentaires/labels pour affiner.
- **Closed / completed** : correctif livré et, si la recette iPhone était nécessaire, validé ou explicitement signalé comme restant à confirmer ; éviter de déclarer une recette non réalisée.
- **Closed / not planned** : rejet / remplacé / doublon avec justification et lien.
- Les changements de statut doivent correspondre à la réalité du code, pas seulement à un brouillon local.

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
- Aucun token GitHub ne doit être embarqué dans la PWA ou stocké dans localStorage. Le bouton « Publier » ouvre GitHub : l'utilisateur finalise son issue.
- GitHub API publique en lecture seule : accessible sans compte mais sujette aux limites de requêtes.
- Les pièces jointes sont ajoutées **manuellement sur GitHub** après contrôle du contenu.
- La PWA n'exécute aucun travail en arrière-plan, aucune notification et aucune synchronisation de code.
