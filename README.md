# Xpollens API docs

Repo Git du site comprenant le framework Docusaurus dans son ensemble et tous les fichiers pour la contribution de contenu.

## Accès

- [Prod (Netlify alias)](https://s-money-documentation-site.netlify.app/)
- [Staging (Netlify alias)](https://develop--s-money-documentation-site.netlify.app/)
- Prod (xpollens.com/docs ?)

## Configuration générale

Les options générales de configuration se gèrent depuis [docusaurus.config.js](docusaurus.config.js). Voici une liste d'options pouvant concerner directement les contributeurs :

- Titre du site (balise title SEO) : `title`
- Items de header : `themeConfig.navbar.items`
- Domaine de récupération des APIs : `themeConfig.baseAPIUrl`
- Footer : liste de liens (par colonne) : `themeConfig.footer.links`
- Footer : réseaux sociaux : `themeConfig.footerCustom.socialIcons`
- Footer : branding sociaux : `themeConfig.footerCustom.tagline`

## Sidebars

Les accès aux documents depuis les sidebars des sections /docs et /api se gèrent depuis [sidebars.js](sidebars.js).

Les items sont référencés de 2 façons :

- Directement en niveau 1 (string simple)
- En niveau 2 en référencant un array de strings au sein d'un objet

## Homepage

Les contenus se gèrent depuis [home.md](docs/docs/home.md).

## Process d'édition

Le repo est calé par défaut sur la branche de staging `develop` le temps du développement. Les documents doivent être édités sous cette branche durant cette phase.

### Règles d'édition

Chaque élément (paragraphe, composant, titre..) doit obligatoirement être espacé d'une ligne vierge, auquel cas le bon formattage pourra être compromis.

### Doc d'example

Différents exemples d'utilisation des composants custom et syntaxes peuvent être consulté sur le [document d'exemple](docs/docs/examples/doc.md) (non référencé en sidebar).

### Images

Les images (ex: use-cases) se gèrent en utilisant un plugin d'optimisation Docusaurus ([idealImage](https://docusaurus.io/docs/2.0.0-beta.3/api/plugins/@docusaurus/plugin-ideal-image)).

Pour l'utiliser

1. Importer la dépendance en début de fichier `import Image from '@theme/Image';`
2. Utiliser le composant en renseignant les props `<Image src="docs/<nom de l'image>" alt="usecase 1"/>`
3. La props source est déjà basée sur le répértoire dédié à l'ajout des images de contenu [static/img/content/](static/img/content).

## Documentation fonctionnelle

## Documentation technique
