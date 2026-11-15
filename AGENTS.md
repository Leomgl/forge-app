# FORGE — consignes de développement, génération V0.10.1

1. Le **catalogue actif** contient LINK et FORGE seulement. Ne pas réactiver d'ancienne application ou reprendre ses contrats sans nouvelle décision. Les apps futures ne sont pas encore nommées.
2. **Sources OFFICIELLES désormais séparées :** `Leomgl/laboratoire-app` (V0.1.1) et `Leomgl/blocks-app` (V0.1.0). BL0CKS est la bibliothèque ESM/CSS, LAB utilise `blocks.lock.json` pour un SHA épinglé (`b41d3fcf99c1d9dcfc0935db007e6678316c77f2`). Source `forge-app/bootstrap/laboratoire-v0-1` **obsolète** : ne pas y faire de changements. Uniquement mettre à jour ces deux vrais dépôts et synchroniser FORGE.
3. **Architecture approuvée :** LINK (transport et notifications), FORGE (suivi), BLOCKS (bibliothèque de modules transversaux), LABORATOIRE (première PWA, feuilles de tests). Lire `docs/ARCHITECTURE-BLOCKS.md` et `docs/LABORATORY.md`; FORGE #41/#43/#44.
4. La **source de vérité des tickets** est GitHub Issues de `Leomgl/forge-app`. Pour les nouveaux chantiers, créer des issues #40 ou suivantes. Les issues précédentes sont archives historiques, pas un backlog vivant.
4. Dans une intervention, lire l'issue **et ses commentaires**, puis le dépôt/branche et la version réellement déployés. Documenter les changements dans FORGE avant de conclure.
4. LINK demeure l'unique passerelle technique pour notifications, identités et synchronisations des nouvelles PWA. Préserver le Hub, le Web Push, ses permissions, sa D1 et son ordonnanceur.
5. Les interfaces des futures apps partageront une architecture de **Réglages** et un bloc **Me notifier**, adaptés à chaque domaine. Préserver leurs DA respectives.
6. Chaque app garde ses données métier. Les nouveaux contrats LINK sont explicitement approuvés, chiffrés, et les permissions sont fermées par défaut.
7. Les tickets GÉNÉRAL sont transversaux. Pour une app créée, ajouter une entrée au catalogue FORGE après validation du nom, rôle, dépôt et intégration LINK ; adapter la liste autorisée côté passerelle GitHub.
8. GitHub OAuth sécurisé par `forge-hub` ; jamais de jeton PAT en front ni de valeur secrète dans un ticket/commit. La session doit être vérifiée avant mutation.
9. Statuts : fermé = Terminé, ouvert + `workflow=doing` = En cours, autre ouvert = À faire. Toujours confirmer les écritures distantes.
10. Ne pas annoncer de recette iPhone sans avoir réellement testé sur l'appareil. Rédiger le compte rendu : fait, tests, risques, version, commit/PR, recette à faire.
11. Conserver l'historique de l'ancienne génération uniquement dans GitHub et dans la branche `snapshot/forge-preclean-2026-11-15`. Ne pas réintroduire ces références dans les pages actives.
12. Aucun travail en arrière-plan sans automatisation explicitement créée : vérifier et synchroniser FORGE **pendant le chat**.
