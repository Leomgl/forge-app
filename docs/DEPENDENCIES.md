# Contrats et dépendances inter-applications

FORGE ne synchronise aucune donnée applicative ; il suit les changements et leurs conséquences. Tout nouveau lien entre apps exige une discussion et une analyse explicite des permissions.

## Connexions documentées

| Source → Destination | État (11/11/2026) | Contrat à préserver | Risques |
|---|---|---|---|
| GAMING → NEXUS | Actif V0.7 + NEXUS V0.14 | NEXUS LINK, jumelage, scopes approuvés, AES-GCM, proposition à réception puis validation | Doubles tâches, dépenses fictives, suppression, données en clair, perte de jumelage |
| RITUEL → NEXUS | Import documenté côté NEXUS | Vérifier code d'import actuel et format accepté avant changement | Doublons, permissions, ancienne sauvegarde, collision d'identifiants |
| VESTIAIRE → NEXUS | Projet futur/non activé | Planning/tenues avec opt-in, sans exposer photos | Photos privées, synchronisation involontaire, limites stockage |
| VESTIAIRE → RITUEL | Idée future/non activée | Aucune intégration active à supposer | Effets de bord et données liées sans consentement |
| SANTÉ ↔ NEXUS | Futur/non activé V0.1.1 | Santé est source médicale, NEXUS organise rendez-vous et rappels dans les deux sens, IDs/revisions/tombstones, permissions distinctes et synchronisation par réconciliation | Exposition clinique, conflits, doublons de rendez-vous ou notifications, suppression divergente |

## Frontières d'hébergement

- `leomgl.github.io/nexus-app` et `/rituel-app` partagent **une même origine** malgré leurs sous-chemins. Ne pas considérer les chemins comme une isolation de sécurité du navigateur.
- GAMING, VESTIAIRE et SANTÉ ont leurs **Workers Cloudflare** à URL distinctes. Santé utilise une origine dédiée et un coffre local chiffré.
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
