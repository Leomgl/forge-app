# FORGE — mémoire de développement des applications

**FORGE est un système de tickets et de contexte technique conçu d'abord pour l'assistant qui développe les applications.** Le propriétaire y dépose des bugs, idées et validations ; l'assistant lit directement les issues et les dépôts de code pour préparer une intervention sans casser l'existant.

**Commencer ici : [docs/AI-START-HERE.md](docs/AI-START-HERE.md)** — ce fichier est le point d'entrée durable à consulter au début de toute nouvelle conversation de développement.

## Principe et source d'autorité

- **Tickets durables = GitHub Issues de ce dépôt** : un numéro unique `#N`, le projet, le contexte, les critères de recette et un historique de décisions/discussions. Une note locale dans la PWA n'est **pas** un ticket publié.
- **Code courant = branche par défaut du dépôt de chaque application**, pas une copie figée dans FORGE.
- **Contexte architectural = fichiers `docs/` de FORGE** ; ils sont des instantanés à mettre à jour après chaque évolution importante et ne remplacent pas la lecture du code actuel.
- **Historique de livraison = commits/PR et README des apps** ; les GitHub Issues contiennent les liens, les vérifications et les suites.

## Projets suivis

| App | Dépôt | Contexte initial |
|---|---|---|
| NEXUS | [nexus-app](https://github.com/Leomgl/nexus-app) | Second cerveau, Agenda, Notes, Budget, Contacts, NEXUS LINK |
| GAMING | [gaming-app](https://github.com/Leomgl/gaming-app) | Bibliothèque, stockage PS5, saisons/passes, push iOS, export NEXUS |
| RITUEL | [rituel-app](https://github.com/Leomgl/rituel-app) | Routines, stock, statistiques et push iOS |
| VESTIAIRE | [Vestiaire-app](https://github.com/Leomgl/Vestiaire-app) | Dressing, Fits, mannequin, poses et looks |

Consulter [la cartographie](docs/APP-MAP.md) pour les liens techniques et [les dépendances](docs/DEPENDENCIES.md) pour les régressions possibles.

## Déroulement d'un ticket

1. Le propriétaire crée un ticket depuis FORGE (formulaire GitHub prérempli) ou directement sur [GitHub Issues](https://github.com/Leomgl/forge-app/issues). Il **valide lui-même la publication sur GitHub** ; les brouillons non publiés restent sur son téléphone.
2. Dans une nouvelle conversation : « On attaque FORGE #12 » ou « On se concentre sur le ticket #12 ».
3. L'assistant lit `docs/AI-START-HERE.md`, l'issue #12 **et ses commentaires**, puis le README/code/tests/commits récents du dépôt concerné. Il vérifie si la situation a changé avant de proposer une solution.
4. Il expose son diagnostic, les fichiers touchés, le risque sur les données et les dépendances, les tests, puis applique le correctif dans l'app concernée.
5. Après livraison, il ajoute au ticket le commit/PR, le changelog, les tests réalisés et la recette iPhone à faire. Il actualise les documents FORGE si une règle ou architecture a changé. **Ne jamais dire « testé sur iPhone » sans test réel.**

Voir [le protocole complet](docs/TICKET-PROTOCOL.md).

## Publication de la PWA

FORGE est une PWA gratuite et autonome : aucune synchronisation avec les données NEXUS/GAMING/RITUEL/VESTIAIRE. La PWA consulte uniquement les issues **publiques de ce dépôt** via l'API publique GitHub ; elle ne stocke aucun token GitHub. Le formulaire de signalement ouvre le site GitHub avec le titre et le corps préremplis : **il faut encore toucher « Submit new issue »** en étant connecté. Pas de promesse de synchronisation de brouillons privés ni d'écriture sans validation.

GitHub Pages (branche `main`, racine) peut servir la PWA à `https://leomgl.github.io/forge-app/`. L'installation sur écran d'accueil depuis Safari requiert HTTPS. Activer Pages dans les paramètres du dépôt ; la présence des fichiers n'active pas Pages à elle seule. Pour isoler FORGE des autres PWA GitHub Pages de même origine, utiliser plus tard une origine Cloudflare séparée si nécessaire.

## Protection des données et gratuité

Le dépôt **et ses issues sont publics** : ne jamais publier noms/contacts personnels, mots de passe, secrets VAPID, passkeys, clés, codes de jumelage ou captures privées. Une issue ou sa capture jointe est visible à toute personne. L'API publique peut être limitée/rate-limitée ; FORGE indique l'échec et conserve le lien direct vers GitHub. Aucun Worker, D1, fournisseur payant ou abonnement n'est nécessaire pour cette étape.

Les données locales de brouillon peuvent être effacées par iOS ; seul un ticket effectivement publié est durable. GitHub Issues n'est pas un coffre privé ni un moteur d'instructions automatiques à l'assistant. L'assistant doit **ouvrir activement** les sources à chaque nouvelle session.

## Version

V0.2 — 11 novembre 2026 : architecture « GitHub Issues = registre canonique », docs pour reprise de contexte inter-conversations, cartographie et protocole de non-régression.


## Vérifications de la V0.2

- JavaScript compilé sans erreur de syntaxe.
- Test en environnement simulé : chargement d'une liste d'issues GitHub, affichage du ticket, génération d'un formulaire d'issue prérempli et conservation du brouillon — **réussis**.
- Tests de parsing des métadonnées `FORGE_META`, génération du Markdown, fallbacks sur le titre et liens techniques — **réussis**.
- `node tests/smoke.mjs` : banc de test minimal versionné pour les maintenances futures ; à exécuter dans un environnement Node lors de la recette.
- **Non vérifié :** GitHub Pages réellement activé, Safari iPhone installé, navigation externe vers GitHub et soumission d'une issue depuis la PWA. Aucune promesse de test physique.

## Suivre l'évolution des apps

[Historique par version et points de non-régression](docs/EVOLUTION-HISTORY.md) et [AGENTS.md](AGENTS.md) complètent les instructions de reprise. Ces documents sont des instantanés ; contrôler les sources actuelles avant de modifier du code.
