# ARCHITECTURE BLOCKS — référence inter-threads

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
- Évolution vers une distribution versionnée Git (tag ou paquet) lorsque le dépôt dédié est disponible. Éviter le copier-coller entre apps.
- Contrat type : `mount(element, options)` avec `destroy()`, options facultatives, callbacks et documentation.
- Ne créer des abstractions communes qu'après **deux scénarios réellement testés**.
- Responsiveness iPhone, navigation clavier, textes dynamiques, contrastes, zones tactiles >= 44 px, préférences de mouvement.
- Aucune D1 ni Cron/polling pour la bibliothèque. Démonstrations en mémoire ou localStorage avec données fictives uniquement.

## Conditions pour promouvoir un bloc

`Brouillon → Test LABORATOIRE → Recette iPhone → Validé → Version réutilisable`.

Pour chaque bloc : API et tokens documentés ; aperçu avec au moins deux thèmes et deux contextes ; tests syntaxe/états ; critères d'accessibilité ; changelog ; exemple d'intégration ; décision de validation utilisateur. Une simple capture ou une CI verte ne vaut pas recette réelle sur iPhone.

## Ordre de fabrication

- **M0** : créer la PWA LABORATOIRE, manifest/service worker, feuilles, design tokens et environnement de test.
- **M1** : BLOCKS AppShell + structure de navigation (deux thèmes).
- **M2** : BLOCKS Réglages universels (architecture commune et slots d'app).
- **M3** : éditeur « Me notifier » (rendez-vous vs stock/échéance).
- **M4** : adaptateur LINK conforme à ses routes existantes, tests isolation, sécurité et notifications.
- **M5** : composants supplémentaires uniquement en fonction des vrais besoins des futures apps.

## Invariants budgétaires et opérationnels

Stack GitHub + Cloudflare ; objectif coût 0 €. Pas de nouveau stockage D1 sans besoin constaté. Séparer code PWA, bibliothèque réutilisable et noyau LINK. Tester sans toucher aux enregistrements, secrets, données ou abonnements Push de production de LINK. Documenter les décisions dans FORGE après chaque étape.
