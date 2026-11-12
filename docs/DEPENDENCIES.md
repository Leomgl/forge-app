# Contrats et dépendances inter-applications

FORGE ne synchronise aucune donnée applicative ; il suit les changements et leurs conséquences. Tout nouveau lien entre apps exige une discussion et une analyse explicite des permissions.

## Connexions documentées

| Source → Destination | État (11/11/2026) | Contrat à préserver | Risques |
|---|---|---|---|
| GAMING → NEXUS | Actif V0.7 + NEXUS V0.14 | NEXUS LINK, jumelage, scopes approuvés, AES-GCM, proposition à réception puis validation | Doubles tâches, dépenses fictives, suppression, données en clair, perte de jumelage |
| RITUEL → NEXUS | Import documenté côté NEXUS | Vérifier code d'import actuel et format accepté avant changement | Doublons, permissions, ancienne sauvegarde, collision d'identifiants |
| VESTIAIRE → NEXUS | **Actif** : Vestiaire V0.7.1 + Nexus V0.21.8 | Consentement et jumelage NEXUS LINK AES-GCM, scope `outfit_catalog` ; V1 (24 looks) accepté en lecture, V2 pages chiffrées (24/page, 200 pages max) et stockage tampon `vestiaireTransfers[]` vérifié avant ACK ; activation **uniquement du catalogue complet**, aucun échange de photo/vêtement détaillé/agenda | iPhone non encore validé sur V2, anciens clients V1, coupure réseau/lot partiel, révocation, sauvegardes contenant le secret LINK |
| VESTIAIRE → RITUEL | Idée future/non activée | Aucune intégration active à supposer | Effets de bord et données liées sans consentement |
| SANTÉ → NEXUS (E2EE) | Actif V0.6 Santé + Nexus V0.21.9 ; retour Nexus→Santé NON livré | Santé source dossier, Nexus affiche le suivi des prises et importe RDV/vaccins avec consentement ; Nexus notifie Agenda, Santé notifie médicaments, scopes dose_summary/health_calendar et agrégat d'hydratation facultatif, IDs/revisions/tombstones, arrêt sur conflits | Secrets de jumelage dans Nexus local non chiffré, exposition des titres de RDV importés, perte de données iOS, divergences d'édition, doublons de notifications si une ancienne version est utilisée |

## Frontières d'hébergement

- `leomgl.github.io/nexus-app` et `/rituel-app` partagent **une même origine** malgré leurs sous-chemins. Ne pas considérer les chemins comme une isolation de sécurité du navigateur.
- GAMING, VESTIAIRE et SANTÉ ont leurs **Workers Cloudflare** distincts. Santé et son relais **sante-nexus-link** utilisent des origines dédiées et des bases D1 européennes séparées ; le relais Santé N'EST PAS le relais LINK des autres apps. Santé garde son coffre local chiffré et ses notifications de médicaments ; Nexus garde ses propres Push Agenda, et le contenu Santé reçu reste dans son IndexedDB non chiffré.
- FORGE consulte **les dépôts et issues publics seulement** et ne doit jamais accéder aux IndexedDB/Workers de production des apps.

## Checklist rapide avant un correctif

1. Modifie-t-on un schéma exporté, une API, un identifiant ou une souscription push ?
2. Y a-t-il un consommateur dans une autre app ? Chercher dans les deux repos.
3. Quelle version de l'app est déjà sur l'iPhone ? Une migration se fait-elle sans effacer des données ?
4. L'opération peut-elle être faite hors-ligne et reprise sans doublons ?
5. Les notifications et les sauvegardes restent-elles valides ?
6. Quel test de régression couvre les interactions entre les applications ?
7. Comment restaurer l'état précédent si la recette iPhone échoue ?

Toute modification de contrat est à documenter ici **dans le même chantier**.


## GARAGE (V0.1.0 — 12/11/2026)

- Application indépendante sur une nouvelle origine `garage-app.q9pfwtztsc.workers.dev`, sans dépendance aux bases ni endpoints des apps existantes.
- Inventaire local IndexedDB privé ; **aucun lien inter-app actif**. Les ensembles et mouvements sont gérés uniquement dans Garage.
- Projet futur `GARAGE → NEXUS` : résumés d'ensembles pour événements de voyage, uniquement après consentement explicite, jumelage chiffré et scopes séparés. Ne pas partager photos, numéros de série, factures ou inventaire complet par défaut.
- **Risque :** l'origine PWA iPhone peut perdre son stockage ; sauvegarde JSON personnelle manuelle et migrations additives obligatoires. Le Worker et le dépôt sont indépendants d'un déploiement automatique.


## Compléments du 12/11/2026

- SANTÉ V0.6 partage **uniquement sur opt-in** un résumé quotidien d'hydratation / caféine vers NEXUS V0.21.9. Aucun journal de boissons, ordonnance ou document clinique ne doit partir vers le stockage non chiffré de NEXUS. Le bloc Pulse ne doit pas régresser le catalogue Vestiaire (transfert paginé V2).
- GARAGE reste indépendant, aucun lien NEXUS actif ; si un futur événement Agenda déclenche une proposition de kit, prévoir permission par catégorie et transfert minimal chiffré, jamais les photos/numéros de série.
- FORGE V0.5 est uniquement un tableau de tickets publics. L'ajout SANTÉ/GARAGE n'autorise **aucune lecture de données privées**. Le Worker `forge-hub` doit accepter leurs préfixes dans les tickets sans être connecté aux Workers/D1 des apps elles-mêmes.
