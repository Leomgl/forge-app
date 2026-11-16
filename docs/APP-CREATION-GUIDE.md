# GUIDE OFFICIEL — Création d'une nouvelle app iPhone (PWA)

> **Document obligatoire avant toute nouvelle application** — établi le 16 novembre 2026.
> **Source de vérité :** ce guide dans FORGE. À relire au début de chaque nouveau thread ou dépôt.
> Pour les évolutions techniques, compléter ce guide sans effacer les règles déjà validées.

## 1. Principes non négociables

- **FORGE** pilote le catalogue, les décisions, les tickets, les dépendances, les versions et les recettes.
- **LABORATOIRE (LABO)** est la PWA où l'on prototype et teste les nouveaux modules et leurs variantes.
- **BLOCKS** est **une bibliothèque technique, PAS une app**, ni un Worker, ni un service distant à joindre au runtime. Elle conserve le **code canonique des modules** et leurs contrats de réutilisation.
- **LINK** reste le service central d'identité inter-apps, autorisations, événements partagés et **unique moteur de notifications Push**. Ne pas développer un second ordonnanceur par app.
- **Chaque nouvelle app** est une PWA métier autonome, avec son identité, son origine HTTPS, ses propres données et sa propre logique métier.

### Interdiction fondamentale : ne jamais copier-coller un module BLOCKS

**Correct :** déclarer la dépendance à BLOCKS avec une version/commit vérifiable, **importer les modules** et leurs styles dans le build de l'app, puis personnaliser via **paramètres, callbacks, slots, adaptateurs métier et design tokens**. Un correctif du module se fait **dans BLOCKS**, et les apps sont reconstruites contre sa nouvelle version.

**Interdit :** copier \`src/settings.mjs\`, \`src/notify-editor.mjs\`, \`src/blocks.css\` ou un autre module dans chaque repo ; créer des versions privées légèrement différentes du même module ; modifier le bundle compilé comme s'il était le code source.

**Exception :** une fonction réellement spécifique au métier de l'app reste dans son repo. Si elle devient générique, passer par LABO, tester, puis l'extraire dans BLOCKS. Le **bundle compilé** de la PWA peut contenir le code BLOCKS pour rester utilisable hors ligne : cela n'est **pas une duplication de source maintenable**.

## 2. Les modules officiellement validés et leurs responsabilités

| Module | Où se trouve le code | Utilisation par une nouvelle app |
| --- | --- | --- |
| Réglages | BLOCKS, \`src/settings.mjs\` | Une architecture commune avec catégories adaptées, recherche, version en haut et mise à jour **dans À propos** |
| Apparence / thèmes | BLOCKS, \`src/theme.mjs\`, \`src/palettes.css\` | Choisir une DA parmi **Graphite, Papier, Tabac, Minuit, Sauge** via **Réglages → Apparence** ; la DA de l'app reste personnalisable |
| Densité | BLOCKS, \`src/density.mjs\`, \`src/blocks.css\` | Trois modes **Compact, Normal, Spacieux** via **Réglages → Préférences**, valeur persistée côté app |
| Me notifier | BLOCKS, \`src/notify-editor.mjs\` | Configuration visuelle des rappels RDV / pass / stock, J/H/M, **jusqu'à 6 rappels** ; ne programme pas lui-même les Push |
| Structure/Shell | BLOCKS, \`src/shell.mjs\` | En-tête et navigation communs ; ce n'est **pas** un écran/une feuille « Structure » supplémentaire à reproduire |
| Mise à jour PWA | BLOCKS, \`src/pwa-update.mjs\` | Vérification de \`/version.json\` et mise à jour du Service Worker de **cette app** |

**Qualification :** feuilles LABO **01 Réglages** et **02 Me notifier** validées sur iPhone le **16/11/2026** ; [FORGE #50](https://github.com/Leomgl/forge-app/issues/50) terminé. Base de référence : **BLOCKS V0.3.3**, **LABO V0.4.3**. Les modules ne changent pas à chaque création d'app : **on les branche**.

## 3. Procédure obligatoire de création (dans cet ordre)

### A — Cadrer l'app avant tout code

Écrire dans FORGE : **nom + rôle de l'app**, besoins réels, limites de son périmètre, écrans MVP, données propriétaires, règle de conservation/suppression des données, scénario hors ligne, DA, modules BLOCKS nécessaires, interactions LINK, permissions exactes et critères de recette. Ne pas reprendre automatiquement une ancienne PWA ni créer de fonctionnalités non demandées.

### B — Démarrer le dépôt de la nouvelle PWA

Créer un repo indépendant, un manifeste PWA installable sur l'écran d'accueil, une icône, un Service Worker **propre à l'app**, \`/version.json\` et une version affichée dans l'interface. Conserver les caches et données utilisateur lors des mises à jour. GitHub + Cloudflare en visant **0 €**, et éviter la création d'une D1, d'un Worker supplémentaire ou d'un cron sans justification chiffrée. Ne pas cloner tout LABO comme application métier : réutiliser sa **méthode d'intégration**.

### C — Brancher BLOCKS, ne pas le dupliquer

1. Ajouter une dépendance **verrouillée** sur un commit/version BLOCKS ; suivre le modèle actuel de \`Leomgl/laboratoire-app/blocks.lock.json\` (routes de modules et SHA exact).
2. Dans le **build** de la PWA, prendre les fichiers depuis ce commit canonique de \`Leomgl/blocks-app\`, **sans créer de copies sources éditables** dans le repo métier.
3. Importer depuis les **routes générées par le build** (exemples de la PWA actuelle : \`/blocks/settings.mjs\`, \`/blocks/theme.mjs\`, \`/blocks/density.mjs\`, \`/blocks/notify-editor.mjs\`, \`/blocks/blocks.css\`, \`/blocks/palettes.css\`). Le nom d'import concret dépend du bundler de l'app.
4. Injecter les **préférences, styles et callbacks** spécifiques à l'app dans les APIs des modules. Persister la sélection de thème/densité et les données **dans l'app hôte**.
5. Vérifier que la compilation et les tests contrôlent la **correspondance du commit BLOCKS verrouillé**, les fichiers réellement embarqués et l'absence de source dupliquée.

**À propos du versionnage :** BLOCKS V0.3.3 possède actuellement un **versionnage global** et LABO épingle un SHA. Le projet d'**indépendance SemVer par module** et de **propagation automatique des correctifs** est à réaliser dans [FORGE #51](https://github.com/Leomgl/forge-app/issues/51). **Ne pas le présenter comme déjà opérationnel.** Une fois livré, chaque nouvelle app devra s'enregistrer dans le catalogue de distribution et déclarer ses modules/version(s).

### D — Brancher LINK une seule fois

Une vraie app possède une **identité distincte** et s'associe à LINK depuis **Réglages → Connexion LINK**, avec code temporaire, origine vérifiée, autorisation explicite et révocation possible. **Jamais** de formulaire de pairing dans « Me notifier ». Les rappels se configurent **dans les formulaires métier** via BLOCKS ; LINK, lui seul, ordonne et envoie les Push.

- **Ne jamais** ajouter de Push local concurrent, deuxième moteur, tables D1 répétées, polling périodique ou secrets de LINK dans le frontend.
- Les créations/modifications/annulations d'événements devront être traduites en intentions minimales vers LINK par un adaptateur de l'app, avec gestion des révisions, idempotence et reprise hors ligne, **après livraison du contrat d'automatisation** [FORGE #49](https://github.com/Leomgl/forge-app/issues/49). Ne pas prétendre cette automatisation déjà réalisée.
- La connexion LABO↔LINK a été confirmée sur iPhone ; la **réception d'un Push de LABO** reste une recette distincte [FORGE #47](https://github.com/Leomgl/forge-app/issues/47).

### E — Tester avant tout déploiement

- Build reproductible, validation des versions et du lock, CI verte, contrats d'import, aucune copie de modules.
- Tester **les 5 thèmes**, **les 3 densités**, les petits écrans, la lisibilité et les zones tactiles.
- Tester les scénarios de l'app avec et sans réseau, redémarrage, persistance, changement de version et mise à jour PWA.
- Tester l'association LINK et le refus/révocation des permissions **sans perturber le LINK existant** ; Push réel seulement si le service et la recette le permettent.
- Déployer progressivement, vérifier les bindings Cloudflare réellement préservés, journaliser versions/commits et garder un **rollback**.
- **Aucune recette iPhone n'est « validée » sur une simple CI** : attendre une confirmation physique de l'utilisateur.

### F — Consigner et enregistrer dans FORGE

Créer/mettre à jour la fiche de l'app dans **\`docs/APP-MAP.md\`** et ses dépendances dans **\`docs/DEPENDENCIES.md\`**, avec :
\`appId\`, nom, rôle, repo GitHub, URL PWA, Worker et bindings, version de l'app, commit/version BLOCKS, modules importés, version SDK LINK, permissions, stockage, coût/quotas, dernière recette, statut. Mettre à jour le ticket et le registre au **même moment** que le déploiement.

## 4. Checklist de conformité — une app ne passe pas en « prête » sans ces points

- [ ] App métier cadrée et enregistrée dans FORGE ; aucun ancien système réintroduit par habitude
- [ ] PWA installable / offline / versionnée, sauvegarde des données et stratégie de rollback
- [ ] **BLOCKS importé comme dépendance verrouillée**, jamais copié dans le code source métier
- [ ] Réglages communs : Apparence, Préférences/densité, LINK dans Réglages, À propos/mise à jour
- [ ] Me notifier fourni par BLOCKS si l'app crée des rappels, sans créer de moteur Push local
- [ ] Permissions LINK explicites, pas d'identité ou secret inter-app exposé
- [ ] Aucune nouvelle D1, Worker, cron ou boucle de polling sans justification
- [ ] Tests CI, compatibilité, changements de thèmes/densités, offline et persistance effectués
- [ ] Déploiement, rollback, dépendances et versions inscrits dans FORGE
- [ ] **Validation réelle sur iPhone confirmée par l'utilisateur** avant statut final

## 5. Exemple de fiche à remplir à chaque nouvelle création

| Champ | Décision |
| --- | --- |
| Nom, objectif métier, périmètre | À définir avec l'utilisateur |
| Repo GitHub / URL PWA / Worker | À créer après cadrage |
| Version applicative / service worker | Indépendants de BLOCKS et LINK |
| Modules BLOCKS consommés | Noms + versions/commits exacts |
| DA / densité par défaut | Une des 5 palettes et Normal, personnalisables |
| Connexion et permissions LINK | Identité propre + consentement par service |
| Données / mode hors ligne | Stockage propriétaire + sauvegarde |
| Coûts et quotas Cloudflare | Hypothèses chiffrées, gratuit si possible |
| Scénarios de tests et critères de succès | À expliciter avant le code |
| Tickets FORGE / validation iPhone | Liens et état réel |

---

**Principe à mémoriser : « Une app assemble les modules ; BLOCKS les possède ; LABO les éprouve ; LINK les relie aux services ; FORGE garde la trace. »**

**Documents voisins :** [Architecture des blocs](ARCHITECTURE-BLOCKS.md), [Démarrage IA](AI-START-HERE.md), [Dépendances](DEPENDENCIES.md), [FORGE #51](https://github.com/Leomgl/forge-app/issues/51).