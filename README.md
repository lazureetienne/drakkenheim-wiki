# 🐉 Wiki de la campagne de Drakkenheim

**[Consulter le wiki en ligne](https://lazureetienne.github.io/drakkenheim-wiki/)**

Ce dépôt contient le wiki d'une campagne de Donjons & Dragons à laquelle je participe comme joueur. Elle est basée sur le livre _Dungeons of Drakkenheim_, de Monty Martin et Kelly McLaughlin (Dungeon Dudes), publié par Ghostfire Gaming. Le wiki rassemble les notes de notre aventure pour que les autres joueurs puissent retrouver les personnages, les lieux, les événements et les informations utiles entre les séances.

Le site est construit à partir de notes Obsidian avec [Quartz](https://quartz.jzhao.xyz/), puis publié sur GitHub Pages. L'objectif est de partager facilement une version consultable du wiki sans devoir payer un abonnement Obsidian Sync ou un autre service d'hébergement. GitHub Pages héberge ici le site gratuitement à partir d'un dépôt public. Ce site est destiné à la consultation : il ne remplace pas la synchronisation bidirectionnelle d'un coffre Obsidian entre appareils.

## 🎙️ Des parties au wiki

Le contenu passe par plusieurs étapes :

1. **Enregistrement et transcription.** Un projet distinct, DnD-Transcription, importe les enregistrements multipistes du bot [Craig](https://craig.chat/). Des scripts Python préparent les pistes avec FFmpeg et les transcrivent avec [whisper.cpp](https://github.com/ggml-org/whisper.cpp), en utilisant le modèle Whisper `small`, le français, l'accélération Vulkan et Silero VAD pour repérer les passages parlés. Les transcriptions individuelles sont ensuite fusionnées chronologiquement avec les étiquettes des participants. Une transcription automatique peut contenir des erreurs et doit être vérifiée par rapport à l'audio.
2. **Organisation dans Obsidian.** À partir des transcriptions multipistes, j'utilise un modèle de langage plus large, généralement un modèle GLM, pour produire des résumés de chaque séance ainsi que des articles pour le wiki. Le modèle s'appuie sur un lexique des personnages et sur le contexte déjà présent dans ma voûte Obsidian pour mieux interpréter les noms, les événements et les liens avec les notes existantes. Ces résumés et articles enrichissent ensuite les notes de campagne dans Obsidian.
3. **Préparation pour la publication.** Un script PowerShell local copie les notes de campagne et une sélection de notes partagées dans `content/`. Il adapte certains éléments propres au coffre pour que le site puisse les afficher et produit un rapport de publication.
4. **Construction et déploiement.** Une fois les changements vérifiés, commités et poussés sur `v5` ou `main`, GitHub Actions installe les dépendances Node.js, construit le site avec Quartz et déploie le résultat sur GitHub Pages. Le workflow peut aussi être lancé manuellement depuis GitHub.

Le projet de transcription et le coffre Obsidian sont distincts de ce dépôt; ils ne sont pas exécutés par le workflow GitHub Actions. Celui-ci construit le site à partir du contenu déjà présent dans le dépôt.

## 📝 D'Obsidian à Quartz

Quartz prend en charge plusieurs conventions des notes Obsidian grâce à son extension _Obsidian Flavored Markdown_, notamment les liens `[[wiki]]`, les callouts, les surlignages et les étiquettes. Elles n'ont donc pas toutes besoin d'être converties manuellement.

La principale adaptation concerne l'extension communautaire **Dataview**. Dans Obsidian, elle exécute des requêtes dynamiques sur les propriétés des notes; Quartz n'exécute pas Dataview. Le script de publication remplace donc les blocs Dataview pris en charge par des tableaux Markdown statiques, calculés à partir des notes publiées et de leurs propriétés YAML. Il prend en charge un sous-ensemble de requêtes DQL (`TABLE`, `FROM`, `WHERE`, `SORT` et `LIMIT`) : les requêtes non prises en charge, y compris les blocs `dataviewjs`, sont laissées telles quelles et signalées dans le rapport. Les tableaux doivent être régénérés lors d'une nouvelle publication pour refléter les changements du coffre.

Le script effectue aussi des adaptations liées à l'organisation du coffre :

- Il sélectionne les notes partagées selon leur propriété `campagnes`, prépare une page d'index pour les joueurs et réécrit les liens `[[Joueurs]]` vers son emplacement publié.
- Il copie les images référencées par les notes et signale les images introuvables.
- Il vérifie les liens internes vers des notes non publiées ou introuvables et les répertorie dans un rapport.

Ces transformations sont effectuées dans la copie destinée au site, pas dans les notes du coffre. Les autres extensions utilisées pour travailler dans Obsidian ne sont pas nécessairement exécutées ou reproduites sur le site.

## 🛠️ Personnalisations par rapport à Quartz

Ce projet s'appuie sur Quartz v5, mais ne se limite pas à remplacer le dossier `content/` :

- **Configuration du site** : [quartz.config.yaml](./quartz.config.yaml) définit notamment le titre, la langue française, l'adresse GitHub Pages, les extensions et leur disposition.
- **Navigation et graphe** : [quartz.ts](./quartz.ts) enregistre des composants locaux. L'explorateur impose un ordre adapté à la campagne; le graphe peut masquer des notes par étiquette et des dossiers entiers, notamment les séances, pour rester lisible. L'accueil dispose d'une vue du graphe adaptée.
- **Interface** : des composants locaux rendent les liens retour repliables et adaptent la table des matières. Des styles personnalisés améliorent notamment la navigation sur mobile et tablette; l'icône du site a également été remplacée.
- **Publication** : les workflows génériques de Quartz ont été remplacés ici par un [workflow de déploiement GitHub Pages](./.github/workflows/deploy-drakkenheim-pages.yaml) adapté au dépôt.
- **Import local** : les scripts PowerShell propres au coffre préparent et vérifient les notes avant leur publication. Ils sont locaux et ignorés par Git; ils ne sont pas inclus dans ce dépôt.

## 🚀 Mise à jour du site

Sur l'installation locale utilisée pour ce wiki, le script `drakkenheim-publish.ps1` prépare `content/` à partir du coffre. Ses chemins sont propres à cette machine et doivent correspondre à l'emplacement réel du coffre et du dépôt avant son utilisation. La copie du dossier de campagne est un miroir : des fichiers supprimés ou renommés dans la source peuvent aussi être supprimés de `content/`.

Après l'import, consulter le rapport et les changements Git, puis construire le site au besoin avec `npx quartz build`. Le commit et le push restent des étapes séparées lorsqu'on exécute directement le script d'import. Un push sur une branche configurée déclenche ensuite la construction et le déploiement; leur état est visible dans l'onglet **Actions** du dépôt et dans **Settings → Pages**.

Le dépôt et le site étant publics, seules les notes destinées à être partagées doivent être publiées. Pour découvrir le fonctionnement général de Quartz, consulter sa [documentation](https://quartz.jzhao.xyz/).
