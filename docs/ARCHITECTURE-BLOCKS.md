# ARCHITECTURE BLOCKS — référence inter-threads

## M7 — Dernière évolution : densité universelle des Réglages

**M7 (16/11/2026) — Densité d'affichage réutilisable.** Le module **Réglages** de BLOCKS V0.3.3 accueille désormais dans **Préférences** un sélecteur **Compact / Normal / Spacieux**. API bibliothèque `src/density.mjs` : `normalizeDensity`, `applyDensity`, `mountDensityPicker` ; CSS structurel dans `src/blocks.css` (Shell, Réglages, Me notifier). Densité indépendante de la palette : cinq DA toujours disponibles, cibles tactiles ≥44–48 px. L'app hôte applique et persiste la valeur, **BLOCKS n'est pas une app**. **LABO V0.4.2** est le banc d'essai : `Réglages → Préférences`, persisté sous `lab-density-v1`, 18 assets déployés à 100 % sur Cloudflare Worker `f330afdb-6e13-433a-9977-05cca1666ae0`. GitHub CI [BLOCKS verte](https://github.com/Leomgl/blocks-app/actions/runs/43779810916) et [LABO verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43780036982). **LINK V0.13.0 inchangé** : 25 bindings, D1 et ordonnanceur Push préservés. Me notifier toujours validé à 100 %, aucune modification de ses règles. **À valider physiquement sur iPhone** : les trois densités sur les cinq thèmes, persistance, lisibilité, tactile et absence de régression ; le module Réglages sera déclaré prêt pour les futures apps après cette validation. Voir tickets FORGE #44/#43.


## État de livraison finale — BLOCKS V0.3.2 / LABO V0.4.1

**M6 correctif de finition (16/11/2026)** : modules **Réglages** et **Me notifier** inchangés fonctionnellement, cinq thèmes disponibles. **BLOCKS V0.3.2** (source canonique, non-PWA) remplace la couleur blanche fixe du monogramme Shell par une couleur dérivée du fond, pour un contraste suffisant dans Minuit et les quatre autres palettes. **LABORATOIRE V0.4.1** importe BLOCKS depuis le SHA `8fedfa3e4c08c958a44b7bdc1c7616978ea48cae`, 17 assets. CI [BLOCKS verte](https://github.com/Leomgl/blocks-app/actions/runs/43778662474) et [LABO verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43778771460) ; Worker LABO `e9205982-fbe9-48b9-8cc2-902f798ec662` déployé **100 %**. LINK V0.13.0 inchangé (25 bindings, scheduler Push préservé). Me notifier **validé par l'utilisateur** ; connexion LABO ↔ LINK **validée sur iPhone** ; à confirmer physiquement : rendu des 3 nouveaux thèmes et réception d'un Push test.


## M6 — Réglages/Apparence et Me notifier · 16/11/2026

**M6 — deux premiers modules réutilisables finalisés (16/11/2026).** **BLOCKS V0.3.1** est la bibliothèque canonique (ce n'est PAS une PWA). MODULE 1 : **Réglages universels** incluant la section **Apparence** et le sélecteur visuel `mountThemePicker` de cinq thèmes partagés : **Graphite**, **Papier**, **Tabac** (crème / brun tabac / cuivre), **Minuit** (bleu nuit / acier) et **Sauge** (olive / lin). Le **Shell/Structure** existe toujours comme composant technique, mais n'a plus de feuille démo autonome. MODULE 2 : **Me notifier** est **validé à 100 % par l'utilisateur**, code `notify-editor.mjs` inchangé ; configuration J/H/M jusqu'à 30 jours, maximum six rappels, RDV/pass/stock. LABO **V0.4.0** ne conserve que ses deux feuilles de test « Réglages » et « Notifier », branche BLOCKS au commit `7bdc4c897e142737b15ffac5574866a5a3eae191` (17 assets), et laisse la connexion LINK sous Réglages. Les préférences et rappels restent locaux/persistants. CI [BLOCKS](https://github.com/Leomgl/blocks-app/actions/runs/43777820077) et [LABO](https://github.com/Leomgl/laboratoire-app/actions/runs/43778200631) vertes ; worker LABO `6a9e17aa-1dad-422d-a859-20711acd3525` à 100 %. LINK V0.13.0, ses 25 bindings, D1 et ordonnanceur Push sont inchangés. **Association LABO ↔ LINK confirmée par l'utilisateur sur iPhone** ; réception d'un Push LABO et recette visuelle des nouveaux thèmes non encore confirmées physiquement. Suivi FORGE #43/#44, moteur automatique futur #49.


## M6 — Réglages et Me notifier : état actuel validé en code

**M6 — finalisation technique Réglages + Me notifier, 16 novembre 2026.** **BLOCKS est uniquement une bibliothèque**, pas une application PWA. Source canonique `Leomgl/blocks-app` **V0.3.0**, SHA précis `846f92de94a8a31ace6f4a4ed58bd9d4fd4bf3c4` (CI [verte](https://github.com/Leomgl/blocks-app/actions/runs/43777534738)). Deux composants stabilisés : **Réglages universels** (recherche, catégories dont état ouvert conservé après update, préférences fournies et persistées par l'app, actions async, version/À propos/mise à jour PWA et cleanup des extensions `decorate`) et **Me notifier** (`blocks.notify.v1` inchangé, RDV/pass/stock, offsets 0–43200 min / max six, rappel exactement à l'échéance, changement de contexte isolé). Les contrats sont dans `blocks-app/docs/SETTINGS.md` et `docs/NOTIFY-EDITOR.md`. **LABORATOIRE V0.4.0** importe ces modules via `blocks.lock.json` épinglé, les affiche et garde localement les valeurs **par scénario** ; bundle GitHub `cb2e69537d5bfdc75456cd7cf58c2955192fb4ff`, CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43777784164), Worker Cloudflare existant `a15681c1-11cc-4183-b600-3fc7ed6ddd53` à 100 % (16 assets, 0 bindings). **LINK V0.13.0 inchangé** (25 bindings, DO, D1 et Push) et LABO↔LINK déjà associé sur iPhone. **Statut : code & tests validés, recette tactile iPhone de V0.4.0 encore nécessaire pour clôturer les modules.** Suivi dédié : [FORGE #50](https://github.com/Leomgl/forge-app/issues/50). Réception d'un vrai Push test encore à valider dans [#47](https://github.com/Leomgl/forge-app/issues/47), automatisation métier RDV non encore réalisée : [#49](https://github.com/Leomgl/forge-app/issues/49).


## Règle de classification — BLOCKS n'est PAS une application (confirmée le 16/11/2026)

**BLOCKS = coffre/bibliothèque technique de modules réutilisables**, pas une PWA iPhone, pas une app métier, pas une destination de liaison LINK, pas une entrée du catalogue des apps installables. Son dépôt `Leomgl/blocks-app` conserve les sources ESM/CSS, versions, contrats d'interface et modules génériques, indépendants des identités graphiques et de toute donnée utilisateur.

**LABORATOIRE (LABO) = application PWA de prototypage et de recette** : on y assemble, visualise, teste les variantes et valide l'ergonomie / fonctionnement iPhone des modules. **Après validation, le module est consolidé et rangé dans BLOCKS**, avec documentation, versionnage et compatibilité, pour intégration par les futures applications métiers. Il ne faut pas confondre le stockage/versionnage des modules dans BLOCKS avec une PWA déployée. LABO consomme les modules de BLOCKS et ne devient pas leur source de vérité.

**LINK = PWA de services transversaux** : associations, permissions, ordonnanceur, notifications Push et liaisons entre véritables apps. LINK est associé à LABO, puis aux futures PWA, mais **jamais à BLOCKS**. **FORGE = PWA de pilotage** : tickets, étapes, décisions et états du développement.

Cycle officiel : **concevoir un bloc → le développer/l'essayer dans LABO → valider sur iPhone → le verser et versionner dans BLOCKS → le réutiliser depuis BLOCKS dans les nouvelles apps**. Si un prototype est testé dans LABO avec une copie transitoire, ce n'est pas sa source définitive : synchroniser le code canonique de BLOCKS pour toute réutilisation.

**Validation utilisateur** : LABO est bien associé à LINK sur iPhone (16/11/2026) ; cette validation concerne l'association, et **ne vaut pas encore preuve de réception d'un Push réel depuis LABO** (FORGE #47).


## Règle à appliquer dans toutes les futures apps — 16/11/2026

**Décision UX transverse — LINK dans Réglages, jamais dans « Me notifier ».** LABORATOIRE **V0.3.3**, CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43776500074), Worker Cloudflare `f1335351-7e8b-4157-a00e-3756f215870a` à **100 %**. Le bloc partagé `mountSettings` accueille maintenant la catégorie **« Connexion LINK »** (extension `decorate`) : générer/recopier le code, associer l'app dans LINK → Applications, état de la connexion, contrôle des permissions et déconnexion locale. La feuille **Notifier** conserve seulement `Me notifier` et un test d'envoi **volontaire**, avec un renvoi aux Réglages si l'app n'est pas encore liée. Code LAB `Leomgl/laboratoire-app` release `f771a16e77bc8f76d00dffa62a4735d384090165`. Identifiants IndexedDB conservés lors de la migration d'UI ; les vues nettoient leurs listeners à la navigation. **LINK V0.13.0 inchangé** (Worker `dd12eb78-eef1-4ed2-a8ff-1429ad0a3425`, 25 bindings, D1 et moteur Push intacts). Le pairing/permission reste manuel une seule fois ; après l'association, l'envoi automatique à la création/modification de RDV demeure un travail à faire dans FORGE #49. **Recette physique iPhone du nouvel emplacement en attente.**


## M5 — État de référence actuel pour les autres threads

**M5 — liaison par code courte livrée (15 novembre 2026).** LINK **V0.13.0** et LAB **V0.3.2** ont été déployés à 100 % sur Cloudflare. L'app source affiche un code alphanumérique de 12 caractères (**10 minutes**, un usage), l'utilisateur le saisit dans **LINK → Applications**, vérifie le nom et l'origine HTTPS, choisit explicitement la permission de notification sous Face ID, puis revient dans l'app : la connexion se finalise par un échange de preuve locale, sans second formulaire. Les anciennes interfaces « Inscrire une nouvelle application » et « Créer un contrat » restent dans **Réglages → Outils avancés** pour maintenance uniquement. LINK utilise une **table additive** `hub_pairing_requests` dans sa D1 existante, un rate limiter déjà présent et son Worker actuel, sans autre moteur ou ressource. Tests automatisés LINK [verts](https://github.com/Leomgl/link-app/actions/runs/43774926751) et LAB [verts](https://github.com/Leomgl/laboratoire-app/actions/runs/43775044930). LINK Worker `dd12eb78-eef1-4ed2-a8ff-1429ad0a3425` à 100 %, **25 bindings**, même DO `LinkNotificationScheduler`, migration `link-live-notifications-v1`. LAB Worker `0117f6b4-ab19-481b-a881-e4d9ea0f9e1d` à 100 %, 16 assets. **Recette d'association sur iPhone encore nécessaire.** Le test de programmation de rappel dans LAB reste MANUEL ; le comportement produit « création/modification/suppression d'un RDV ⇒ intentions vers LINK automatiques ⇒ Push seul par LINK » demeure la prochaine phase du ticket [FORGE #49](https://github.com/Leomgl/forge-app/issues/49).


## Architecture cible confirmée : association par code dans LINK et Push automatique

**ÉTAT ACTUEL — 15 novembre 2026 : LINK V0.12.1**, hotfix de l'affichage Réglages après remise à zéro : [FORGE #48](https://github.com/Leomgl/forge-app/issues/48), CI [verte](https://github.com/Leomgl/link-app/actions/runs/43772864227), Worker Cloudflare `ce04a96c-0063-45ac-a64c-5c693420185c` à 100 %. Les 25 bindings, la D1 et `LinkNotificationScheduler` sont préservés, pas de modification du moteur de notifications. **Cible produit confirmée** : l'app produit un code d'association, l'utilisateur le saisit dans LINK et valide avec Face ID ; par la suite RDV/pass créés ou modifiés dans l'app déclenchent automatiquement des intentions minimales vers LINK. LINK seul ordonnance et envoie des Push iOS, même app fermée. Annulations/révisions et outbox hors ligne obligatoires. [FORGE #49](https://github.com/Leomgl/forge-app/issues/49). **LAB V0.3.1** conserve seulement sa démonstration MANUELLE (invitation LINK → LAB + bouton Programmer), non conforme à l'UX finale.

## Frontière LINK ↔ BLOCKS ↔ LAB (M4)

**15 novembre 2026 — M4 liaison LINK (prototype intégré et déployé).** LABORATOIRE **V0.3.1** / BLOCKS **V0.2.3** / Worker LINK **V0.12.0 inchangé**. LINK a reçu un SDK navigateur (sans modification du Worker) au commit `9d98d59dbbd52ec6a818b4dbe2c1ce7a52cb2b1e` : échange d'invitation copiée `LHI1.laboratoire.…`, capacité temporaire et conversion de rappels en commandes `link.notification.command.v1` opaques. LAB a intégré l'enrôlement propriétaire, la vérification du grant, un stockage d'identité côté PWA (IndexedDB) et la programmation **volontaire d'une seule occurrence de test**. SDK LINK CI [verte](https://github.com/Leomgl/link-app/actions/runs/43771185719), LAB CI [verte](https://github.com/Leomgl/laboratoire-app/actions/runs/43771334855), Worker LAB `4b4448a1-9988-4d97-8d4a-8d91688c80d0` déployé à **100 %** sur la même URL. 16 assets, pas de nouvelle D1, Worker ou moteur Push. **La liaison réelle nécessite encore l'inscription et le grant propriétaire dans LINK, puis le test physique iPhone avec abonnement Push LINK.** Les révisions, annulations, files hors ligne et gestion du stock événementiel restent à construire avant app métier. Suivi : [FORGE #47](https://github.com/Leomgl/forge-app/issues/47), [manuel M4](./LINK-BRIDGE.md).

**Statut : principe validé par l'utilisateur le 15/11/2026.** Référence : [FORGE #41](https://github.com/Leomgl/forge-app/issues/41), [#43 LABORATOIRE](https://github.com/Leomgl/forge-app/issues/43), [#44 BLOCKS](https://github.com/Leomgl/forge-app/issues/44).

## Objectif

Construire des PWA iPhone sur mesure à partir de modules d'interface et de comportements **communs, versionnés et personnalisables**. Garder leurs identités graphiques et fonctionnalités métier propres sans entretenir plusieurs copies d'un même bloc.

```text
                 FORGE (décisions / tickets / versions / validation)
                                    │
           ┌────────────────────────┴─────────────────────┐
           │                                              │
  BLOCKS (bibliothèque partagée)                LABORATOIRE (essais iPhone)
           │                                              │
           └────────── blocs testés et validés ────────────┘
                                    │
             Futurs produits PWA sur mesure (non encore nommés)
                                    │
                          LINK V0.12.0 (noyau)
            contrats / autorisations / transport / Web Push
```

Le schéma n'implique **pas** que LABORATOIRE ou BLOCKS deviennent des moteurs de notifications ou des routeurs de données. **LINK reste seul responsable** du transport inter-apps, des contrats, de la distribution des événements et des notifications iOS. FORGE ne stocke que des métadonnées techniques/tickets, jamais les données métier.

## Un bloc est un contrat, pas un copié-collé

- **Noyau** : comportement, accessibilité, états (loading, empty, error, ready, disabled), API de configuration et rendu stable.
- **Apparence** : tokens CSS de l'app (couleurs, typographies, espacements, rayons, ombres). Aucune couleur ou identité de marque imposée par le noyau.
- **Options** : libellés, sections, ordres, valeurs par défaut et comportements déclaratifs.
- **Extensions** : slots ou callbacks documentés, adaptateurs métiers, hooks d'événements ; pas de fork du bloc.
- **Version** : version du bloc et changelog, tests de non-régression ; les apps choisissent une version et une montée de version explicite.
- **Frontières** : l'app garde les données métier, l'autorisation et l'écriture finale ; les blocs ne contactent pas Cloudflare ni LINK en cachette.

## Découpage technique initial

1. **BLOCKS/core** : thèmes (CSS custom properties), états et structures; aucune dépendance de services.
2. **BLOCKS/ui** : shell, navigation, composants de champs et de listes.
3. **BLOCKS/settings** : page Réglages, catégories extensibles, version, À propos, contrôle de mise à jour PWA, préférences locales, sections optionnelles.
4. **BLOCKS/notify-editor** : configurateur « Me notifier »; sortie en configuration neutre. Ne s'abonne pas à Web Push et n'envoie jamais une notification.
5. **BLOCKS/link-adapter** : transformateur / validateur conforme à l'API LINK réellement déployée, isolé de l'UI; implémenter seulement après examen des contrats LINK V0.12.0.
6. **LABORATOIRE** importe les blocs via leurs modules versionnés. Aucun composant spécifique au laboratoire ne doit être requis par le code d'une app métier.

Le modèle de configuration notification de démonstration peut contenir : `enabled`, `context`, `schedule`, `offsets`, `label` et `channel=link`. **Ce n'est pas un schéma LINK officiel** : les conversions doivent être validées contre l'API réelle et les permissions du Hub.

## Flux d'un événement

1. Une app décide d'émettre un événement pertinent, valide sa donnée et son consentement.
2. Elle prépare le message selon un contrat versionné et les permissions de LINK ; les données sensibles restent chiffrées ou dans l'app.
3. LINK authentifie l'origine, détermine les destinataires autorisés, distribue et déduplique.
4. L'app cible interprète le payload prévu pour elle ; pour les notifications, LINK planifie et envoie le Web Push.
5. FORGE conserve uniquement la preuve de validation du scénario, pas les données privées.

**Ne pas confondre « LINK comprend l'événement » et « LINK lit toutes les données privées » :** le routage doit fonctionner avec un type, une version et des métadonnées suffisamment limitées.

## Design de la première bibliothèque

- ESM natif, CSS scoped ou préfixé, aucune dépendance npm obligatoire, pas de framework lourd par défaut.
- **Dépôts privés dédiés actifs :** `Leomgl/blocks-app` (ESM et `src/blocks.css`) et `Leomgl/laboratoire-app` (PWA). Versionner le bloc par SHA Git dans `laboratoire-app/blocks.lock.json` ; aucune copie de source dans LAB, uniquement un bundle généré `dist/worker.mjs`. Version actuelle BLOCKS V0.2.0, commit `755c6f2387d6ccb21a6fca6ad00f3a54523d0b2f`; LAB V0.1.1. Éviter le copier-coller entre apps.
- Contrat type : `mount(element, options)` avec `destroy()`, options facultatives, callbacks et documentation.
- Ne créer des abstractions communes qu'après **deux scénarios réellement testés**.
- Responsiveness iPhone, navigation clavier, textes dynamiques, contrastes, zones tactiles >= 44 px, préférences de mouvement.
- Aucune D1 ni Cron/polling pour la bibliothèque. Démonstrations en mémoire ou localStorage avec données fictives uniquement.

## Conditions pour promouvoir un bloc

`Brouillon → Test LABORATOIRE → Recette iPhone → Validé → Version réutilisable`.

Pour chaque bloc : API et tokens documentés ; aperçu avec au moins deux thèmes et deux contextes ; tests syntaxe/états ; critères d'accessibilité ; changelog ; exemple d'intégration ; décision de validation utilisateur. Une simple capture ou une CI verte ne vaut pas recette réelle sur iPhone.

## État réel du déploiement

LABORATOIRE V0.2.0 fonctionne sur le même Worker indépendant `laboratoire-app` (100 % du trafic, 0 binding/D1), avec 3 feuilles. Les modules v0.1.0 de BLOCKS et leurs styles sont réellement consommés. Tests GitHub Actions des deux dépôts réussis. L'utilisateur a déjà validé l'app et les DA Graphite/Papier sur iPhone en V0.1.0 ; **refaire la recette iPhone après V0.1.1**. La branche `bootstrap/laboratoire-v0-1` de FORGE ne doit pas recevoir de nouvelles modifications. Avec deux dépôts privés, le build nécessite deux clones authentifiés ; les CI vérifient séparément BLOCKS et le Worker LAB généré, aucun PAT partagé.

## Statut expérimentation (15 novembre 2026)

LABORATOIRE **V0.2.1** + BLOCKS **V0.2.1**, 15 novembre 2026 : nouvelle saisie des rappels en **Jours / Heures / Minutes** et champ numérique, ajout/suppression de plusieurs rappels (max. six) pour rendez-vous et fin de pass. Le seuil Stock est inchangé. BLOCKS commit `93a04c6429ade3885ef1c3cf3133240ecf3059e8` (CI verte [43767468999](https://github.com/Leomgl/blocks-app/actions/runs/43767468999)), LAB commit `0d3fcc4fff9ae552557f13c289e309c6aeb9df47` (CI verte [43767626205](https://github.com/Leomgl/laboratoire-app/actions/runs/43767626205)). Cloudflare Worker `laboratoire-app` version `91f2f399-b16e-483e-8349-1b715be5fee7` diffusée à **100 %**, même URL et aucune ressource ajoutée. Sortie `blocks.notify.v1` inchangée, LINK seul moteur de notifications, aucune intégration Web Push active dans LAB. **V0.2.0 a été validée fonctionnelle sur iPhone par l'utilisateur ; V0.2.1 nécessite encore recette iPhone.**

## Ordre de fabrication

- **M0** : créer la PWA LABORATOIRE, manifest/service worker, feuilles, design tokens et environnement de test.
- **M1** : BLOCKS AppShell + structure de navigation (deux thèmes).
- **M2** : BLOCKS Réglages universels (architecture commune et slots d'app).
- **M3** : éditeur « Me notifier » (rendez-vous vs stock/échéance) — prototype V0.2.0 livré, recette iPhone attendue.
- **M4** : non implémenté — adaptateur LINK conforme à ses routes existantes, tests isolation, sécurité et notifications.
- **M5** : composants supplémentaires uniquement en fonction des vrais besoins des futures apps.

## Invariants budgétaires et opérationnels

Stack GitHub + Cloudflare ; objectif coût 0 €. Pas de nouveau stockage D1 sans besoin constaté. Séparer code PWA, bibliothèque réutilisable et noyau LINK. Tester sans toucher aux enregistrements, secrets, données ou abonnements Push de production de LINK. Documenter les décisions dans FORGE après chaque étape.
