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

Décision du propriétaire : créer une PWA dédiée à la gestion des relations inter-applications et de la synchronisation. LINK remplacera à terme la dispersion des menus LINK, mais **aucune ancienne connexion ne sera supprimée avant migration et vérification complète**. Les données restent propriétaires des apps, avec chiffrement E2EE client et séparation de Santé. La première version indépendante V0.1 est **lecture seule** ; le dépôt officiel privé Leomgl/link-app est désormais créé et remplace la copie d'incubation dans FORGE comme source de vérité. Voir `docs/LINK-V01.md` et ticket #28. Ni FORGE ni LINK ne deviennent une base de données utilisateurs unifiée.

## 2026-11-12 — LINK V0.2 et Forge

Le propriétaire a validé la V0.1 sur iPhone et créé le dépôt privé LINK. La V0.2 publie un SDK de contrat/ACK et une API documentaire sans migrer aucun jumelage. Forge référence LINK et le backend forge-hub a été redéployé en préservant ses 3 bindings GitHub. V0.2 et les flux futurs restent soumis à recette Safari, sauvegarde et retour arrière.

## 2026-11-12 — LINK V0.3 : observation technique opt-in avant tout jumelage central

Première interface réelle Gaming → LINK, mais **pas de transfert de données métier** : le propriétaire déclenche un code `LDO1` à usages diagnostiques (paires oui/non, volumes, date locale, nombre de permissions), passé uniquement dans un fragment d'URL ou par copie manuelle. Aucune écriture serveur, aucune nouvelle permission et aucun ancien lien supprimé. Les informations ne sont ni signées ni en temps réel ; le statut LINK reste read-only. Préserver les clés locales et le relay push Gaming, avec recette sur Safari iPhone avant progression vers un adaptateur automatique réellement authentifié.

## 2026-11-12 — LINK V0.4, comparaison croisée sans extrapolation

Choix confirmé pour le pilote : les diagnostics de Gaming et Nexus restent **manuels, locaux et non signés**. LINK compare volumes/permissions/horodatages mais n'affirme jamais que des comptes identiques prouvent une bonne synchronisation. Les ID de paires et des messages, ainsi que les secrets NXL1, ne sont pas transférés. L'automatisation et la migration des anciens panneaux sont volontairement reportées à une phase avec consentement fort, contrôle d'identité, revue des conflits et restauration testée. Le ticket #28 reste ouvert.

## 2026-11-12 — LINK V0.5 — vérification par événement avant automatisation

Décision d'architecture : approfondir d'abord le contrôle en lecture seule. Gaming et Nexus produisent volontairement des empreintes HMAC éphémères, calculées avec la **clé de paire déjà détenue localement**, mais dérivées dans un domaine de sécurité distinct. LINK peut comparer présence/révision des événements, avec signalement des différences de jour, paire, révision et de la troncature. Les rapports manuels sont **non signés et ne prouvent jamais les ACK ou la livraison réseau**. Aucun secret NXL1, sourceKey, contenu métier ou nouvelle permission ne transite par LINK ; aucun ancien jumelage ou menu supprimé. Le développement d'une preuve d'ACK authentifiée reste un jalon ultérieur sous consentement strict et rollback.

## 2026-11-13 — LINK V0.10.1 : priorité aux recettes réelles avant la suppression des anciens liens

Décision maintenue : **LINK reçoit et distribue les messages chiffrés**, sans centraliser les données métier, et administre les invitations et autorisations depuis la PWA Face ID. Les modules LINK historiques de chaque app ne seront retirés qu'après une recette E2E iPhone réussie de chacun des sept contrats (dont révisions, hors ligne, ACK durable, conflits, déduplication et rollback). Les apps restent responsables de leurs données et validations ; Santé conserve un verrou de consentement supplémentaire. La V0.10.1 a sa CI verte et est déployée sur Cloudflare avec ses secrets/bindings intacts ; seule la passerelle Gaming→Nexus a une preuve de réception réelle. Le centre de notifications via LINK et l'assainissement D1 suivront **après** la migration ; les crons push demeurent suspendus pour ne pas épuiser le quota gratuit. Suivi central : Forge #28.
