# LINK V0.1 — centre des connexions (FORGE #28)

**12 novembre 2026 — première phase livrée, lecture seule.** LINK doit devenir le pilote central de la synchronisation entre Nexus, Gaming, Rituel, Vestiaire, Santé et Garage. Aucune suppression d'ancien lien avant migration validée.

## Livraison

- Worker Cloudflare indépendant : link-app. URL prévue et sous-domaine activé : https://link-app.q9pfwtztsc.workers.dev/
- Source provisoirement versionnée dans Forge : incubation/link-app/worker.mjs ; tests : incubation/link-app/smoke.test.mjs. Le dépôt séparé Leomgl/link-app reste à créer ; le connecteur GitHub utilisé ne prend pas en charge la création de nouveaux dépôts. Ne pas l'inventer dans le registre Forge.
- PWA autonome avec manifeste, icône PNG iPhone 180px, cache Service Worker, navigation et safe areas.
- Accueil et carte de réseau, Relations (filtre, détails et scopes), Applications (liens), Diagnostic.
- API GET /api/v1/catalog : registre architectural documenté (6 apps, 7 flux), sans données personnelles ; GET /api/v1/status : santé du service LINK seulement, linksManaged=0.
- Liste locale de préparation stockée uniquement sur l'appareil dans localStorage sous link-preparation-v01 ; ne modifie pas les connexions.
- Toutes les requêtes autres que GET/HEAD sont refusées en 405. CSP restrictive, aucun binding D1, aucune clé de jumelage dans LINK.
- Cloudflare a confirmé la mise en service du Worker et 100 % du trafic sur le déploiement initial. L'environnement de développement ne pouvait pas résoudre le DNS externe pour effectuer un test HTTP réel : validation navigateur/iPhone requise.

## Inventaire initial

| Flux | Relais existant | Invariant |
| --- | --- | --- |
| Gaming → Nexus | nexus-link-api | propositions contrôlées, pas d'ajout silencieux |
| Rituel → Nexus | nexus-link-api | achats réels ≠ prévisions |
| Vestiaire → Nexus | nexus-link-api | catalogue de looks paginé, sans photos |
| Santé → Nexus (résumés) | sante-nexus-link | opt-in, données minimales |
| Santé ↔ Nexus (agenda) | sante-nexus-link | champs minimaux, révisions, conflits et coffre |
| Rituel ↔ Garage | nexus-link-api | catalogue minimal, stocks toujours dans Rituel |
| Nexus → Garage | nexus-link-api | contexte séjour, aucune action sur les objets sans confirmation |

Santé utilise un relais isolé à préserver. Toutes les PWA sont local-first ; LINK ne peut pas lire leurs IndexedDB par simple changement d'interface. L'E2EE côté client, les scopes, les ACK après écriture, les IDs et révisions, les tombstones, la reprise offline et les consentements restent incontournables.

## Limitations explicites de V0.1

Les anciens liens ne sont ni migrés ni modifiés. LINK ne jumelle, synchronise, révoque ou reconfigure encore aucune app. Le catalogue ne représente pas l'état réel d'une liaison sur iPhone. La PWA ne fonctionne pas comme service permanent en arrière-plan et ne lit aucune donnée privée des autres applications. Les Workers et bases D1 historiques n'ont pas été changés.

## Plan de migration (#28)

1. Audit exhaustif des clients, données, origines, endpoints et permissions.
2. Construire un protocole commun de contrôle (identité et authentification, scopes, contrat versionné, E2EE préservé).
3. Développer un adaptateur léger dans chaque app et conserver leur validation métier, leurs données et notifications.
4. Migrer flux par flux : sauvegarde, compatibilité ancien/nouveau, anti-doublons, révisions, ACK, conflits, tests et rollback.
5. Désactiver puis retirer les anciens menus uniquement lorsque tous les tests iPhone sont validés ; les remplacer par un raccourci Gérer dans LINK.

## Recette Safari iPhone

- Ouvrir l'URL et naviguer dans les quatre vues, vérifier les 7 flux et leurs détails.
- Ajouter à l'écran d'accueil ; vérifier icône LINK, plein écran, safe areas et accès après redémarrage.
- Tester filtre, recherche, ouverture des applications et diagnostic LINK.
- Cocher une étape locale, recharger ; confirmer sa persistance uniquement sur ce téléphone.
- Tester l'ouverture hors ligne après premier chargement ; l'API doit signaler hors ligne.
- Contrôler que les anciens jumelages et leurs échanges restent inchangés dans les apps sources.

Aucun contrôle Safari réel ni synchronisation de bout en bout n'a encore été vérifié pour LINK V0.1.

## Mise à jour post-recette (12/11/2026)

Le propriétaire a confirmé que la **V0.1 LINK fonctionne sur son iPhone** et a créé le dépôt privé officiel Leomgl/link-app. Cette page garde l'historique V0.1 ; la source et l'évolution V0.2 sont dans https://github.com/Leomgl/link-app . La validation V0.1 ne valide pas V0.2 ni les échanges inter-apps.
