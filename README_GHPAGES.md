Guide rapide pour héberger sur GitHub Pages

Ce dépôt est une application Vite + React. La configuration est prête pour publier la build dans le dossier `docs/` afin que GitHub Pages puisse servir le site depuis la branche `main` using the `docs/` folder.

Étapes pour publier sur GitHub Pages (option manuelle):

1. Générer la build (cela créera/écrasera le dossier `docs/`):

```bash
npm install
npm run build
```

2. Commit et push des changements (incluant le dossier `docs/`):

```bash
git add docs/
git commit -m "Add production build for GitHub Pages"
git push origin main
```

3. Sur GitHub: ouvrez la page du dépôt -> Settings -> Pages.
   - Source: choisissez `Deploy from a branch` ou `main` branch et `docs/` folder.
   - Enregistrez — GitHub Pages servira ensuite le site à l'URL indiquée.

Option alternative: utiliser une action GitHub pour déployer automatiquement dans `gh-pages` branch. Si vous voulez, je peux ajouter un workflow GitHub Action qui build & push automatiquement la build dans `gh-pages`.

Notes:
- Le `base` est défini à `./` dans `vite.config.ts` pour assurer que les assets fonctionnent correctement depuis `docs/`.
- Le script `build` génère la production dans `docs/` (par la config Vite). Le script `build:docs` est un alias.

Souhaitez-vous que je crée aussi un workflow GitHub Action pour déployer automatiquement sur `gh-pages`? Si oui, je l'ajoute et je peux aussi configurer le commit automatique vers `gh-pages`.

Déploiement manuel et commandes utiles

1) Pour générer la build localement (cela crée/écrase `docs/`):

```bash
npm ci
npm run build
```

2) Pour déployer manuellement sur la branche `gh-pages` (optionnel):

```bash
git checkout -b gh-pages
git rm -r --cached .
cp -r docs/* .
git add .
git commit -m "Deploy site to gh-pages"
git push origin gh-pages --force
```

3) Le workflow GitHub Actions créé (`.github/workflows/deploy.yml`) se déclenche automatiquement sur les pushes vers `main` et peut aussi être lancé manuellement depuis l'onglet Actions → Deploy to GitHub Pages → Run workflow.

Remarque: le workflow publie le contenu du dossier `docs/` vers la branche `gh-pages`. Vous pouvez aussi configurer GitHub Pages pour servir le site depuis le dossier `docs/` sur la branche `main` si vous préférez garder tout sur `main`.
