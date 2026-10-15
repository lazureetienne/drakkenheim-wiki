/**
 * OrderedExplorer — explorateur de fichiers avec un ordre impose.
 *
 * Reprend le composant `Explorer` de `@quartz-community/explorer` v1.0.0
 * (src/components/Explorer.tsx) en ne changeant QU'UNE chose : `sortFn`.
 *
 * Pourquoi : le plugin d'origine trie ses entrées alphabetiquement (dossiers
 * d'abord). Ici, deux entrées doivent sortir de l'ordre alphabétique :
 *   - `Drakkenheim Campagne`, la page d'accueil de la campagne, en PREMIER
 *     (avant le dossier `Factions`) ;
 *   - `Méta`, les quelques notes qui ne viennent pas du dossier de campagne,
 *     en DERNIER (après le dossier `Séances`).
 * Tout le reste de l'arbre reste alphabétique.
 *
 * CONTRAINTE : le plugin sérialise `sortFn` (`fn.toString()`) dans l'attribut
 * `data-data-fns` du bloc HTML, puis l'évalue dans le navigateur
 * (`new Function("a", "b", "return (" + sortFn + ")(a, b)")`). La fonction doit
 * donc être AUTONOME : aucune variable extérieure, aucun import, aucune closure.
 * Elle ne doit pas non plus contenir de FONCTION IMBRIQUÉE : le bundle serveur est
 * compilé par esbuild avec `keepNames`, qui réécrit chaque fonction imbriquée en
 * `__name(fn, "nom")` — un helper absent du navigateur, qui ferait échouer le tri
 * (arbre vide). D'où les rangs calculés en ligne, sans petite fonction `rank(...)`.
 * Le slug "méta/index" est écrit avec une séquence d'échappement pour rester
 * indépendant de l'encodage du fichier et du bundle.
 *
 * Enregistrement : ce composant REMPLACE celui du plugin dans le registre (voir
 * quartz.ts, avant loadQuartzConfig). Le plugin d'origine reste déclaré dans
 * quartz.config.yaml : c'est lui qui fournit la position, le layout et les
 * options `folderDefaultState` / `folderClickBehavior` / `useSavedState`.
 *
 * Mise à jour : si `@quartz-community/explorer` est mis à jour, comparer ce
 * fichier avec les sources du plugin
 * (https://github.com/quartz-community/explorer) et reporter les changements.
 */
import type { QuartzComponentConstructor } from "@quartz-community/types"
import { Explorer, type ExplorerOptions } from "@quartz-community/explorer/components"

/**
 * Tri de l'explorateur : `Drakkenheim Campagne` en tête, `Méta` en queue,
 * alphabétique (dossiers d'abord) partout ailleurs.
 *
 * ATTENTION : cette fonction est sérialisée telle quelle dans le HTML puis
 * réévaluée dans le navigateur — elle ne doit référencer aucun identifiant
 * extérieur ni contenir de fonction imbriquée (voir l'en-tête du fichier).
 */
const orderedSortFn = (a: any, b: any): number => {
  // 0 = page d'accueil de la campagne ; 2 = dossier Méta (le slug d'un dossier se
  // termine par /index) ; 1 = tout le reste. Calculé en ligne : voir la contrainte
  // « pas de fonction imbriquée » dans l'en-tête du fichier.
  const rankA = a.slug === "drakkenheim-campagne" ? 0 : a.slug === "m\u00e9ta/index" ? 2 : 1
  const rankB = b.slug === "drakkenheim-campagne" ? 0 : b.slug === "m\u00e9ta/index" ? 2 : 1
  if (rankA !== rankB) return rankA - rankB

  // même rang : tri par défaut de Quartz (dossiers d'abord, puis alphabétique)
  if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
    return (a.displayName || "").localeCompare(b.displayName || "", undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }
  return !a.isFolder && b.isFolder ? 1 : -1
}

export default ((userOpts?: Partial<ExplorerOptions>) => {
  return Explorer({ ...userOpts, sortFn: orderedSortFn })
}) satisfies QuartzComponentConstructor
