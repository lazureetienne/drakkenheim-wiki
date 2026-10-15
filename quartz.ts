import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { registerCondition } from "./quartz/plugins/loader/conditions"
import { componentRegistry } from "./quartz/components/registry"
import FilteredGraph from "./quartz/components/FilteredGraph"

// Condition personnalisée, utilisable via `condition: is-index` dans quartz.config.yaml.
// `not-index` (fournie par Quartz) est son exacte inverse : elle cible la racine `content/index.md`.
// Doit être enregistrée AVANT loadQuartzLayout(), qui résout les conditions.
registerCondition("is-index", (props) => props.fileData.slug === "index")

// ---------------------------------------------------------------------------
// Graphe filtré par tag
//
// Le composant `graph` de @quartz-community/graph ne sait exclure que des
// NŒUDS DE TAG (`removeTags`) : aucune option ne permet de retirer une NOTE du
// graphe. Le vault utilise le tag `excludeInGraph` pour masquer certaines notes
// du graphe d'Obsidian ; `FilteredGraph` (option `excludeTags`) reproduit ce
// filtre sur le site.
//
// Pourquoi deux phases : `loadQuartzConfig()` appelle loadQuartzLayout() en
// interne et construit AINSI les composants de toutes les pages
// (PageTypeDispatcher). Un remplacement effectué après coup n'aurait donc aucun
// effet sur les pages rendues. Il faut donc occuper les clés du registre AVANT
// le chargement.
//
// Les clés enregistrées par le chargeur pour un plugin à composant unique sont :
//   "<plugin>/<Export>"  (toujours), "<Export>" et "<plugin>" (si libres).
// Les deux dernières ne sont écrites que si la clé est libre : en les
// pré-enregistrant ici, on garantit que `buildLayoutForEntries` — donc toutes
// les pages — résout le composant local.
// ---------------------------------------------------------------------------
const LOCAL_SOURCE = "local:quartz/components/FilteredGraph"

componentRegistry.register("Graph", FilteredGraph, LOCAL_SOURCE)
componentRegistry.register("@quartz-community/graph", FilteredGraph, LOCAL_SOURCE)

const config = await loadQuartzConfig()
export default config

// Seconde phase : "<plugin>/Graph" a été enregistrée inconditionnellement par le
// chargeur et pointe encore sur le composant du plugin. Sans ce nettoyage,
// getAllComponents() verrait DEUX constructeurs distincts et le script client du
// graphe serait embarqué deux fois (graphe initialisé en double).
let replacedGraphKeys = 0

componentRegistry.getAll().forEach((registered, key) => {
  // `source` vaut le nom du plugin pour toutes ses clés.
  if (!registered.source.includes("graph")) return
  // Clés déjà remplacées en phase 1 (source locale).
  if (registered.component === FilteredGraph) return

  componentRegistry.register(key, FilteredGraph, LOCAL_SOURCE, registered.manifest)
  replacedGraphKeys++
})

if (replacedGraphKeys === 0) {
  console.warn(
    "FilteredGraph: aucune clé de plugin graphe trouvée après le chargement de la configuration. " +
      "Vérifier que `@quartz-community/graph` est toujours déclaré dans quartz.config.yaml.",
  )
} else {
  console.log(
    `FilteredGraph: composant local installé (${replacedGraphKeys} clé(s) du plugin redirigée(s), option excludeTags).`,
  )
}

export const layout = await loadQuartzLayout()
