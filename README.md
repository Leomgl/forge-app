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
| GARAGE | [garage-app](https://github.com/Leomgl/garage-app) | Inventaire privé, emplacements, prêts, kits de départ (PWA Cloudflare) |
| SANTÉ | [sante-app](https://github.com/Leomgl/sante-app) | Carnet médical chiffré, traitements, agenda, habitudes (boissons/hydratation) ; partage NEXUS sur consentement |

Consulter [la cartographie](docs/APP-MAP.md) pour les liens techniques et [les dépendances](docs/DEPENDENCIES.md) pour les régressions possibles.

## Déroulement d'un ticket

1. Le propriétaire crée un ticket depuis FORGE (formulaire GitHub prérempli) ou directement sur [GitHub Issues](https://github.com/Leomgl/forge-app/issues). Il **valide lui-même la publication sur GitHub** ; les brouillons non publiés restent sur son téléphone.
2. Dans une nouvelle conversation : « On attaque FORGE #12 » ou « On se concentre sur le ticket #12 ».
3. L'assistant lit `docs/AI-START-HERE.md`, l'issue #12 **et ses commentaires**, puis le README/code/tests/commits récents du dépôt concerné. Il vérifie si la situation a changé avant de proposer une solution.
4. Il expose son diagnostic, les fichiers touchés, le risque sur les données et les dépendances, les tests, puis applique le correctif dans l'app concernée.
5. Après livraison, il ajoute au ticket le commit/PR, le changelog, les tests réalisés et la recette iPhone à faire. Il actualise les documents FORGE si une règle ou architecture a changé. **Ne jamais dire « testé sur iPhone » sans test réel.**

Voir [le protocole complet](docs/TICKET-PROTOCOL.md).

## Publication de la PWA et connexion GitHub (V0.4)

**Nouvelle adresse dédiée :** https://forge-hub.q9pfwtztsc.workers.dev/ — Worker Cloudflare `forge-hub` déployé le 11 novembre 2026. Il sert les fichiers publics de ce dépôt depuis une origine HTTPS indépendante. Le code serveur est versionné dans [edge-worker/index.mjs](edge-worker/index.mjs).

**Connexion GitHub :** l'utilisateur a confirmé le 11 novembre 2026 que la connexion depuis la PWA fonctionne après configuration de la GitHub App. L'état dépend toujours de la session du navigateur ; l'assistant doit recontrôler avant d'affirmer qu'un changement est enregistré. [Guide de configuration pas-à-pas](docs/GITHUB-AUTH.md).

La V0.4 remplace l'ancien champ de jeton personnel par **Se connecter avec GitHub**. Une fois configurée, la GitHub App a seulement `Issues: Read and write` pour le dépôt FORGE ; le Worker vérifie l'identité du propriétaire et garde les jetons dans un cookie chiffré HttpOnly. Le navigateur envoie uniquement des demandes métier sur `/api/issues` et `/api/workflow`. Il ne voit ni jeton personnel ni secret OAuth. Le compte autorisé peut **publier une issue directement** et **changer ses trois statuts** depuis la PWA. GitHub Issues reste la source de vérité. Hors connexion, les issues publiques restent consultables et le formulaire GitHub prérempli reste disponible.

L'ancienne adresse GitHub Pages `https://leomgl.github.io/forge-app/` peut rester accessible en lecture seule ; le bouton de connexion renvoie vers la nouvelle origine Cloudflare. Les brouillons locaux ne se transfèrent pas automatiquement d'une origine à l'autre. Pour les notifications iPhone, aucune nouvelle API push n'est activée ici. **Aucun abonnement, aucun service payant et aucune base Cloudflare D1.**

## Protection des données et gratuité

Le dépôt **et ses issues sont publics** : ne jamais publier noms/contacts personnels, mots de passe, secrets VAPID, passkeys, clés, codes de jumelage ou captures privées. Une issue ou sa capture jointe est visible à toute personne. L'API publique peut être limitée/rate-limitée ; FORGE indique l'échec et conserve le lien direct vers GitHub. Aucun Worker, D1, fournisseur payant ou abonnement n'est nécessaire pour cette étape. **Attention sécurité :** toutes les PWA GitHub Pages du même propriétaire partagent une origine web. Même si le jeton n'est jamais persisté, ce partage de domaine et tout code de la page restent des risques. Pour l'édition, préférer à terme une **origine HTTPS dédiée** (Worker Cloudflare gratuit si disponible) ou modifier les tickets directement dans GitHub ; éviter de saisir le jeton sur un appareil non fiable.

Les données locales de brouillon peuvent être effacées par iOS ; seul un ticket effectivement publié est durable. GitHub Issues n'est pas un coffre privé ni un moteur d'instructions automatiques à l'assistant. L'assistant doit **ouvrir activement** les sources à chaque nouvelle session.

## Version

**Version active : FORGE V0.8.0 (12 novembre 2026, déploiement en cours).** Quatre onglets, accueil actif et archives séparées. Recette Safari iPhone à confirmer.

## FORGE V0.6 — fiche ticket et journal de livraison (12/11/2026)

- Un titre de carte pointe désormais vers `#ticket/N` : consultation intégrée et navigation par URL partageable, avec retour au tableau ; lien GitHub externe conservé.
- La fiche lit en direct le **corps complet de l'issue** et ses **commentaires GitHub** (pagination jusqu'à 1 000, limite signalée), avec auteur et date, affichage Markdown simplifié et sûr via nœuds DOM sans exécution de HTML.
- Lorsqu'une session GitHub valide est présente, `POST /api/comments` permet de publier un commentaire sur une issue FORGE. La passerelle Cloudflare vérifie session, origine, en-tête de mutation, taille du commentaire et existence du ticket, puis utilise GitHub. Aucune donnée utilisateur ni token ne doit être placé dans l'UI.
- L'assistant commente les tickets **lors de la conversation** avec une synthèse *Fait / Pourquoi / Comment / Tests / Recette iPhone / Suite*. FORGE n'écoute pas les conversations automatiquement et ne produit pas de compte rendu tout seul.
- Architecture inchangée : une seule source de vérité GitHub Issues + commentaires, stockage local uniquement pour les brouillons et le cache existant des cartes, aucun stockage D1.
- Risques testés statiquement : injection HTML dans commentaires, schéma des liens, accès non authentifié en lecture seule, protection des routes d'écriture. **Recette réelle sur Safari iPhone à confirmer.**


**V0.5.0 (historique) — 12 novembre 2026 (Worker Cloudflare déployé à 100 %, recette Safari V0.5 en attente) :** refonte du tableau de tickets en colonnes par état, priorités visibles et filtrables, formulaire compact avec options avancées repliables, catalogue commun au suivi et à la saisie des tickets comprenant **SANTÉ et GARAGE**. Liste des projets gérée en un seul endroit dans `app.js`, acceptation des deux nouvelles apps dans la passerelle `edge-worker/index.mjs`, cache PWA actualisé. Les données et tickets restent exclusivement dans GitHub ; aucune migration de stockage, aucun secret OAuth modifié. Recette iPhone de cette version à effectuer.

**Routine de synchronisation du contexte :** après tout chantier iPhone (nouveau dépôt, décision, changement de schéma, contrat LINK, correction critique ou déploiement), relire GitHub et, si utile, Cloudflare ; mettre à jour `docs/APP-MAP.md`, `docs/DEPENDENCIES.md`, `docs/EVOLUTION-HISTORY.md`, le registre `apps` de `app.js`, et le ticket concerné **dans la même intervention**. Voir `docs/AI-START-HERE.md`.


**V0.4.2 — 11 novembre 2026 :** correction de l'appel GitHub REST API depuis Cloudflare Worker avec l'en-tête obligatoire `User-Agent`. Ajout de diagnostics OAuth distincts (`exchange`, `profile`, `session`), sans exposer de secret. Code redéployé sur le Worker avec conservation des bindings existants ; test de parcours OAuth réel sur iPhone encore nécessaire.

**V0.4.1 — 11 novembre 2026 :** correction du parcours de connexion : nouveau déploiement du Worker avec conservation des variables Cloudflare, diagnostic non sensible dans `/auth/status`, messages de retour GitHub, bannière sur l'ancienne origine GitHub Pages et actualisation du cache PWA iPhone. **Les variables ont été détectées mais leur validité et la réussite OAuth restent à confirmer par essai réel sur iPhone.** Vérification d'infrastructure effectuée, aucun ticket existant modifié.

**V0.4 — 11 novembre 2026 :** passerelle GitHub App OAuth (state, PKCE, cookie chiffré), suppression de la saisie de PAT et création/édition directement dans l'app. Pas de connexion définitivement validée tant que l'autorisation GitHub n'a pas été testée.

V0.3 — 11 novembre 2026 : suivi des trois états sur GitHub Issues. Ancienne édition par PAT supprimée en V0.4.

V0.2 — 11 novembre 2026 : mémoire de tickets et documentation inter-applications.

## Vérifications de la V0.2

- JavaScript compilé sans erreur de syntaxe.
- Test en environnement simulé : chargement d'une liste d'issues GitHub, affichage du ticket, génération d'un formulaire d'issue prérempli et conservation du brouillon — **réussis**.
- Tests de parsing des métadonnées `FORGE_META`, génération du Markdown, fallbacks sur le titre et liens techniques — **réussis**.
- `node tests/smoke.mjs` : banc de test minimal versionné pour les maintenances futures ; à exécuter dans un environnement Node lors de la recette.
- **Non vérifié :** GitHub Pages réellement activé, Safari iPhone installé, navigation externe vers GitHub et soumission d'une issue depuis la PWA. Aucune promesse de test physique.

## Suivre l'évolution des apps

[Historique par version et points de non-régression](docs/EVOLUTION-HISTORY.md) et [AGENTS.md](AGENTS.md) complètent les instructions de reprise. Ces documents sont des instantanés ; contrôler les sources actuelles avant de modifier du code.

**Déploiement FORGE V0.6 (12/11/2026)** : PR #16 fusionnée, commit `2f07eeb8a9a72b1579e97fa113166adbd3e4d33f`. Worker Cloudflare `forge-hub` mis à jour avec conservation des trois bindings OAuth ; déploiement `2faa5604-d579-4de0-81e9-1a94850d36ac`, version `1bc69bf1-c134-4f84-806d-74b9c299bd12`, trafic à 100 %. Ticket #15 clôturé avec un commentaire de livraison. Les contrôles de syntaxe et simulation Markdown sont passés ; recette physique Safari iPhone, connexion/commentaire via l'UI et suite Node complète restent à confirmer.

## FORGE V0.7 — Tickets GÉNÉRAL, multi-app et nouvelles apps (12/11/2026)

- Un **ticket GÉNÉRAL** est un ticket de suivi transversal, pas une application supplémentaire du catalogue.
- Le formulaire et les filtres ont une option `GÉNÉRAL`, avec périmètre conditionnel : *Toutes les apps*, *Plusieurs apps*, *Nouvelle app*, *Projet / réflexion générale*. Un texte libre facultatif documente les apps concernées ou l'idée.
- Le ticket est créé avec le préfixe `[GENERAL]`, `FORGE_META.project=GENERAL`, `scope` et éventuellement `scopeDetails`. Le corps Markdown reprend le périmètre.
- **Aucun repo n'est supposé exister** si le ticket porte sur une nouvelle app. Au début du chantier, identifier les projets pertinents, lire leur code actuel et les déploiements liés (Cloudflare si utile), puis créer le nouveau repo seulement quand on traite le sujet.
- Les tickets classiques existants, leur format et les brouillons locaux restent compatibles ; `GENERAL` est accepté par la passerelle GitHub OAuth de Forge, sans nouveaux droits ni D1.
- Exemple envisagé par le propriétaire : refonte de tous les logos des PWA sous un seul ticket général. **Ne pas créer cette refonte ni modifier les logos à ce stade** : la demande actuelle concerne le dispositif de suivi.
- Tests JS : génération d'un ticket pour toutes les apps, pour une nouvelle app, comparaison avec un ticket NEXUS, absence de lien de repo inventé ; recette Safari iPhone à confirmer.

**FORGE Cloudflare V0.7 déployée (12/11/2026)** : PR #20 fusionnée (squash `c9a23901bb78cbb7222a7da36e336c07d0ecd261`), Worker `forge-hub` sur la version `8115f368-e14d-4fc0-8344-5aee6e9a072d` à **100 %** (déploiement `9d8fe30a-26f7-4290-b799-0ed2026e4e9f`). Trois bindings OAuth conservés, aucune app ni D1 supplémentaires. Ticket #18 clôturé, commentaire de livraison publié. Tests de syntaxe et génération de tickets effectués dans V8 ; test de création connecté depuis la PWA et recette Safari iPhone restent à confirmer.

## FORGE V0.8 — navigation modulaire et archive des tickets (12/11/2026)

- **Accueil :** seules les issues `open` en états `À faire` / `En cours` apparaissent, avec deux modules classés par priorité. Une issue `closed` n'apparaît **jamais** sur l'accueil, indépendamment de sa métadonnée historique.
- **Terminés :** onglet à part, liste de toutes les issues `closed`, triées par dernière activité ; recherche, filtre app et priorité, fiches et commentaires inchangés. Repasser un ticket terminé à `À faire` ou `En cours` le réintègre dans l'accueil.
- **Nouveau :** formulaire existant isolé (brouillons persistants, ticket Général, création OAuth, options avancées inchangés).
- **Apps :** catalogue et documents techniques sortis du flux d'accueil.
- **Navigation :** barre fixe à 4 onglets sur iPhone (safe area) et navigateur, URL `#tickets`, `#completed`, `#composer`, `#context`. Les liens directs `#ticket/N` restent fonctionnels ; fermer une fiche ramène à l'onglet d'origine, notamment `Terminés`.
- **Stockage / backend :** GitHub reste l'unique source des tickets et commentaires. Aucun nouveau Worker, D1, schéma ou secret n'a été introduit ; seul le frontend et le cache PWA sont modifiés.
- **Recette :** validation automatisée de la répartition et du routage, puis contrôle réel sur Safari iPhone à confirmer séparément.
