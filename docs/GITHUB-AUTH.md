# FORGE V0.4 — Connexion GitHub sans jeton à coller

## Correctif du contrôle Client ID — 11 novembre 2026

Après correction des variables, la réponse `configured:true`, `missing:[]`, `authenticated:false`, `clientIdFormat:check-client-id` a été observée. Le format de Client ID GitHub App moderne `Iv23…` est valide mais n'était pas reconnu par notre expression régulière (`Iv1.` uniquement). Vérification du préfixe côté Cloudflare sans afficher de secret : le Client ID stocké correspond bien à une GitHub App. Correctif poussé dans `edge-worker/index.mjs` et redéployé : reconnaissance `Iv1.`, `Iv23`, `Ov23`, suppression du `scope=offline_access` inutile pour une GitHub App, `trim()` pour éviter espaces de copie. Les variables ont été préservées pendant le redéploiement. **Le vrai parcours OAuth reste à valider par l'utilisateur dans Safari/PWA.**

## Diagnostic confirmé sur le déploiement actif — 11 novembre 2026

Captures utilisateur à 17:47 : `/auth/status` répond `{"configured":false,"authenticated":false,"missing":["GITHUB_CLIENT_ID","GITHUB_CLIENT_SECRET"],"clientIdFormat":"missing","authVersion":"0.4.1"}`.

Inspection Cloudflare de la **version active** `58b7eee6-8085-42f2-9e1a-eb8d666dc71d` (déploiement du 11 novembre) : trois bindings présents `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `SESSION_KEY`, tous de type `plain_text`, avec `text` de longueur **0**. Il ne s'agit donc **ni d'un problème de cache Safari ni d'un échec OAuth côté GitHub** : les variables requises sont vides dans l'environnement en production.

Correctif à faire par le propriétaire dans Cloudflare Workers & Pages → `forge-hub` → Settings → Variables and Secrets :
1. `GITHUB_CLIENT_ID` : saisir le **Client ID** de la GitHub App dans le champ Value. Type `Text` acceptable.
2. `GITHUB_CLIENT_SECRET` : saisir un **Client Secret** généré dans GitHub App Settings. Choisir le type **Secret** (pas Text) et ne jamais partager sa valeur dans un ticket, commit, conversation ou capture.
3. **Deploy** pour déployer la configuration ; vérifier `/auth/status` sur l'origine Cloudflare, attendu `configured:true`, `missing:[]`, `authenticated:false` avant connexion.
4. `SESSION_KEY` n'est pas requis par le code actuel (la clé de cookie provient du Client Secret via HKDF). Ne pas ajouter de troisième donnée inutile.
5. Tester ensuite le clic Se connecter avec GitHub ; un nouveau diagnostic est nécessaire seulement si `configured:true` mais que l'authentification ne revient pas.

**Consigne pour tout redéploiement ultérieur : préserver les bindings configurés et leurs valeurs / secrets.** Ne jamais écraser par des bindings vides, ni demander le Client Secret en conversation.

## Diagnostic de connexion — V0.4.1 (11 novembre 2026)

Le Worker `forge-hub` a été redéployé avec le code actuel. Les noms `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` et `SESSION_KEY` sont visibles dans les bindings Cloudflare, mais tous trois apparaissent comme **plain_text**, et les valeurs n'ont pas été lues ni vérifiées. **Le code actuel n'utilise plus `SESSION_KEY`** : sa clé de cookie est dérivée par HKDF du `GITHUB_CLIENT_SECRET`. La variable `SESSION_KEY` peut être supprimée après vérification qu'aucun ancien déploiement ne l'exploite.

**Sécurité :** migrer `GITHUB_CLIENT_SECRET` vers un secret chiffré dans Cloudflare (Type: Secret, pas Text). `GITHUB_CLIENT_ID` n'est pas un secret et peut rester une variable ordinaire. Ne jamais transmettre les valeurs dans une conversation ou un ticket public.

- Utiliser l'adresse **Cloudflare** `https://forge-hub.q9pfwtztsc.workers.dev/` pour la connexion ; la PWA de `leomgl.github.io/forge-app/` n'a pas la même origine ni les mêmes cookies.
- Ouvrir `/auth/status` sur Cloudflare : `configured: true` signifie seulement que les deux variables nécessaires ne sont pas vides, **pas** que les identifiants sont valides côté GitHub ; `missing` donne les noms absents et `clientIdFormat` un indice non sensible.
- Après un échec, la page présente `auth=state`, `auth=exchange`, `auth=account` ou `auth=oauth`, sans jamais afficher le Client Secret.
- Si la page affiche `configured: false`, vérifier les variables et leur portée de déploiement. Si `exchange`, comparer dans GitHub App le **Client ID**, le nouveau Client Secret et la callback exacte. Si `state`, refaire le parcours dans **le même contexte Safari/PWA**.
- V0.4.1 invalide le cache service worker. Ne pas supprimer l'ancienne icône avant d'avoir récupéré les brouillons locaux.
- Après toute modification de `edge-worker/index.mjs`, pousser le commit GitHub **et redéployer le Worker** en conservant ses bindings.
- Le scénario réel d'autorisation et de cookie sur Safari iPhone n'est pas encore validé automatiquement.

## Situation réelle (11 novembre 2026)

- Worker Cloudflare **créé et déployé** : `forge-hub`, URL attendue `https://forge-hub.q9pfwtztsc.workers.dev/`.
- Source serveur : `edge-worker/index.mjs` ; source PWA : racine du dépôt `Leomgl/forge-app`.
- **État vérifié le 11 novembre :** trois variables Cloudflare détectées (sans lecture de leurs valeurs) ; GitHub App présumée créée d'après le retour utilisateur, mais autorisation iPhone et jeton utilisateur pas encore confirmés.
- Authentification de l'utilisateur depuis FORGE : clic « Se connecter avec GitHub », flux OAuth GitHub App avec `state` et PKCE ; aucune saisie de PAT. Jeton utilisateur et refresh chiffrés dans un cookie `Secure`, `HttpOnly`, `SameSite=Lax` de l'origine Cloudflare. Le navigateur ne lit aucun jeton.
- Source de vérité inchangée : GitHub Issues. `À faire` / `En cours` / `Terminé` sont les mêmes que V0.3.
- Mode non connecté : consultation possible, les nouvelles issues peuvent toujours être préremplies puis publiées manuellement sur GitHub.

## Mise en route unique (par le propriétaire du compte GitHub)

### 1. Créer une GitHub App

Ouvrir [GitHub → Developer settings → GitHub Apps → New GitHub App](https://github.com/settings/apps/new).

Valeurs recommandées :

| Paramètre GitHub | Valeur |
| --- | --- |
| Nom | `Forge Hub Leo` ou autre nom disponible |
| Homepage URL | `https://forge-hub.q9pfwtztsc.workers.dev/` |
| Callback URL | `https://forge-hub.q9pfwtztsc.workers.dev/auth/callback` |
| Expiring user-to-server access tokens | **Activé** |
| Webhook Active | **Désactivé** (aucun webhook utilisé) |
| Permissions → Repository permissions → Issues | **Read & write** |
| Autres permissions | Aucune, hors « Metadata: read » obligatoire |
| Where can this GitHub App be installed | **Only on this account** (si proposé) |

Enregistrer l'application, puis **Install App → choisir uniquement `Leomgl/forge-app`** (pas tous les dépôts).

### 2. Configurer Cloudflare

Dans Cloudflare → Workers & Pages → `forge-hub` → Settings → Variables and Secrets, ajouter les deux variables **de type Secret** suivantes :

- `GITHUB_CLIENT_ID` : l'identifiant Client ID de la GitHub App (ne pas confondre avec App ID).
- `GITHUB_CLIENT_SECRET` : le Client Secret créé dans les paramètres de cette même GitHub App.

**Ne jamais poster le client secret dans un ticket GitHub, un commit, une capture ni dans une conversation.** Ces deux valeurs se renseignent directement dans Cloudflare. Ne pas activer de service payant.

Le serveur dérive sa clé de chiffrement des cookies depuis `GITHUB_CLIENT_SECRET` par **HKDF-SHA256**, avec un sel et un contexte propres à FORGE. Aucun troisième secret à saisir ; toute rotation du Client Secret invalide les anciennes sessions.

### 3. Connecter et tester

1. Ouvrir `https://forge-hub.q9pfwtztsc.workers.dev/auth/status` : attendre `{"configured":true,"authenticated":false}` avant connexion.
2. Ouvrir l'application sur la même adresse, toucher **Se connecter avec GitHub**.
3. Autoriser la GitHub App, puis vérifier le retour dans FORGE ; le bouton affiche le nom du compte connecté.
4. Changer un ticket « À faire » → « En cours » puis actualiser. Vérifier sur GitHub que la métadonnée `FORGE_META.workflow` est devenue `doing`.
5. Passer à « Terminé » : l'issue doit être `closed`. Revenir à « À faire » : elle doit se rouvrir.
6. Créer un ticket test depuis FORGE : le ticket doit recevoir un numéro et être visible dans GitHub Issues. Supprimer ou clore le test volontairement après vérification.
7. Vérifier **Déconnexion** : le cookie disparaît de l'app et l'interface redevient en lecture seule.

Sur iPhone, tester aussi le comportement des redirections OAuth depuis une **PWA installée** : Safari peut ouvrir une fenêtre distincte, et le parcours de retour doit être validé sur le vrai téléphone avant de déclarer la connexion finalisée.

### 4. Installer FORGE comme PWA sur iPhone

Quand le parcours GitHub fonctionne, ouvrir **la nouvelle adresse Cloudflare** depuis Safari → Partager → Sur l'écran d'accueil. Ne pas confondre avec l'ancienne icône GitHub Pages : le stockage local (brouillons) et les sessions sont **distincts entre les deux origines**. Exporter ou recopier les brouillons importants avant de retirer une ancienne icône.

## Architecture et limites de sécurité

- Le Worker Cloudflare héberge une **origine HTTPS dédiée** et sert les fichiers statiques publics du dépôt FORGE `main` en lecture seule. Aucun Worker ne se déploie automatiquement en modifiant le fichier `edge-worker/index.mjs` : un redéploiement Cloudflare est nécessaire après une modification backend.
- Écritures seulement sur les chemins `POST /api/workflow` et `POST /api/issues`, dirigés vers `Leomgl/forge-app`, après vérification de session, de l'identité GitHub propriétaire, de l'origine et de l'en-tête `X-Forge-Action`. Les requêtes d'une autre origine sont refusées.
- Le cookie est chiffré en AES-256-GCM et est illisible en JS ; il contient un access token GitHub App à durée limitée et, si GitHub l'émet, le refresh token. Un refresh renouvelle le cookie ; pas de D1 ni de KV.
- Les droits réels reposent sur **l'installation de la GitHub App uniquement sur forge-app** et la permission Issues lecture/écriture. Une simple connexion à GitHub ne suffit pas si l'app n'est pas installée sur le dépôt.
- Le compte autorisé à écrire depuis le Worker est restreint à l'identifiant GitHub du propriétaire du dépôt (vérifié côté serveur), en plus des droits GitHub.
- Les sessions finissent par expirer. Une déconnexion efface le cookie ; elle ne révoque pas automatiquement le jeton côté GitHub avant son expiration. Révoquer dans GitHub → Applications si nécessaire.
- Les cookies protègent la lecture des jetons par JavaScript ; ils ne sont pas une protection absolue contre un serveur compromis, un XSS effectif ou un vol de cookie. Aucun secret ne doit être stocké dans GitHub.
- Le serveur vérifie `updated_at` avant un changement d'état, sans pouvoir garantir une écriture atomique contre toutes les courses simultanées.
- GitHub Issues et les pièces jointes de ce dépôt sont **publics**.
- Aucune garantie de service 24/7 ni de débit à l'infini : respecter les quotas Workers Free et GitHub.
- Si la configuration échoue, FORGE doit rester consultable et renvoyer vers le site GitHub plutôt que simuler un état enregistré.

## Développement et tests

`edge-worker/index.mjs` est la source versionnée du Worker déployé. La PWA fait ses appels d'écriture sur la **même origine** Cloudflare ; elle n'envoie plus de jeton GitHub depuis le navigateur. Mettre à jour `sw.js` en cas de changement : il **n'intercepte pas** `/auth/*` ni `/api/*` pour ne pas mettre des réponses d'auth en cache.

Tester le module JS, la gestion des statuts, les exports et l'absence de jeton côté navigateur avec `node tests/smoke.mjs`. Valider le parcours OAuth réel sur Safari iPhone et dans l'app installée, après création de la GitHub App.
