# Journal des décisions transversales

## 2026-11-11 — FORGE est d'abord la mémoire de travail de l'assistant

Le propriétaire ne souhaite pas un gestionnaire de projets générique, mais un **contexte durable exploitable d'une conversation à l'autre**. GitHub Issues de FORGE contient les tickets et décisions ; le code reste dans les dépôts d'origine. Les tickets ne sont pas déplacés vers les issues des applications, afin de conserver **un registre central unique**.

## 2026-11-11 — Aucune connexion de données FORGE ↔ apps

FORGE lit les documents publics sur GitHub et les GitHub Issues publiées. Il ne lit pas les données internes NEXUS/GAMING/RITUEL/VESTIAIRE, ne tente pas d'importer leurs IndexedDB, n'utilise pas NEXUS LINK et ne gère aucun secret.

## 2026-11-11 — Publication explicite dans GitHub

Pour ne pas exposer un token d'écriture dans une PWA publique, le propriétaire crée l'issue par la page GitHub, préremplie par FORGE, puis valide l'envoi. Les brouillons peuvent exister localement mais sont invisibles dans une autre conversation tant qu'ils ne sont pas publiés.

## Règle de mise à jour

Lorsqu'une évolution change un invariant, un contrat d'intégration ou un chemin critique, mettre à jour la cartographie/dépendances et ajouter un enregistrement daté ici. Ne pas considérer le journal comme un relevé automatique des commits.

## 2026-11-12 — FORGE V0.6 : une fiche par issue, un journal de commentaires

Décision : conserver GitHub Issues comme registre central et les commentaires GitHub comme journal des interventions et des retours utilisateurs. Le navigateur lit les tickets et commentaires publics et affiche le Markdown sous forme de nœuds texte sûrs. Seule la session OAuth GitHub App du Worker peut écrire via l'endpoint dédié. Aucun agent autonome ni base de données ne vient dupliquer les tickets. Les comptes rendus sont publiés volontairement dans les conversations de développement.

## 2026-11-12 — Ticket GÉNÉRAL plutôt qu'un ticket par application

Décision : ajouter une catégorie de **tickets transversaux** sans en faire une septième application métier. Elle peut piloter une refonte des logos de toutes les PWA, la création d'une nouvelle app ou une évolution multi-repos. Le périmètre est une métadonnée supplémentaire, et les commentaires GitHub servent au suivi commun. Les tickets existants conservent leur format et chaque application garde son propre dépôt/source de vérité.


## 2026-11-12 — FORGE V0.8 : séparation opérationnel / historique

Décision : l'accueil est réservé au travail actif (`doing`, `todo`), tandis que les tickets terminés rejoignent un onglet d'historique indépendant. Garder un formulaire de création autonome et un catalogue documentaire distinct, accessibles par une barre inférieure sur iPhone. **Pas d'archivage dans une seconde base** : une issue close reste un ticket GitHub consultable, modifiable et réouvrable. Le statut GitHub reste prioritaire sur les métadonnées locales.

## 2026-11-12 — LINK : plan de contrôle séparé, pas une base centrale

Décision du propriétaire : créer une PWA dédiée à la gestion des relations inter-applications et de la synchronisation. LINK remplacera à terme la dispersion des menus LINK, mais **aucune ancienne connexion ne sera supprimée avant migration et vérification complète**. Les données restent propriétaires des apps, avec chiffrement E2EE client et séparation de Santé. La première version indépendante V0.1 est **lecture seule** ; la création d'un dépôt séparé reste à faire, source provisoire versionnée dans FORGE. Voir `docs/LINK-V01.md` et ticket #28. Ni FORGE ni LINK ne deviennent une base de données utilisateurs unifiée.
