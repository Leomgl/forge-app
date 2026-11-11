# Journal des décisions transversales

## 2026-11-11 — FORGE est d'abord la mémoire de travail de l'assistant

Le propriétaire ne souhaite pas un gestionnaire de projets générique, mais un **contexte durable exploitable d'une conversation à l'autre**. GitHub Issues de FORGE contient les tickets et décisions ; le code reste dans les dépôts d'origine. Les tickets ne sont pas déplacés vers les issues des applications, afin de conserver **un registre central unique**.

## 2026-11-11 — Aucune connexion de données FORGE ↔ apps

FORGE lit les documents publics sur GitHub et les GitHub Issues publiées. Il ne lit pas les données internes NEXUS/GAMING/RITUEL/VESTIAIRE, ne tente pas d'importer leurs IndexedDB, n'utilise pas NEXUS LINK et ne gère aucun secret.

## 2026-11-11 — Publication explicite dans GitHub

Pour ne pas exposer un token d'écriture dans une PWA publique, le propriétaire crée l'issue par la page GitHub, préremplie par FORGE, puis valide l'envoi. Les brouillons peuvent exister localement mais sont invisibles dans une autre conversation tant qu'ils ne sont pas publiés.

## Règle de mise à jour

Lorsqu'une évolution change un invariant, un contrat d'intégration ou un chemin critique, mettre à jour la cartographie/dépendances et ajouter un enregistrement daté ici. Ne pas considérer le journal comme un relevé automatique des commits.
