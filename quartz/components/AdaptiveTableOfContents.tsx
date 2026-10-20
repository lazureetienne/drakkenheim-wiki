import { TableOfContents as TableOfContentsConstructor } from "@quartz-community/table-of-contents"
import type { QuartzComponent, QuartzComponentConstructor } from "./types"

const adaptiveTocScript = `
const syncTocPlacement = () => {
  const toc = document.querySelector(".toc")
  const sidebar = document.querySelector(".sidebar.right")
  const center = document.querySelector(".center")
  const article = center?.querySelector("article")
  if (!toc || !sidebar || !center || !article) return

  if (window.matchMedia("(max-width: 1199px)").matches) {
    if (toc.parentElement !== center) center.insertBefore(toc, article)
  } else if (toc.parentElement !== sidebar) {
    sidebar.insertBefore(toc, sidebar.querySelector(".backlinks"))
  }
}

const updateTocDefaultState = () => {
  syncTocPlacement()
  const toc = document.querySelector(".toc")
  const header = toc?.querySelector(".toc-header")
  const content = toc?.querySelector(".toc-content")
  const center = document.querySelector(".center")
  if (!header || !content || !center || header.dataset.userToggled === "true") return

  const tocHeight = toc.parentElement === center ? toc.getBoundingClientRect().height : 0
  const contentBottom = center.getBoundingClientRect().bottom + window.scrollY - tocHeight
  const shouldCollapse = contentBottom <= window.innerHeight
  header.classList.toggle("collapsed", shouldCollapse)
  header.setAttribute("aria-expanded", String(!shouldCollapse))
  content.classList.toggle("collapsed", shouldCollapse)
}

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return
  const header = event.target.closest(".toc-header")
  if (header) header.dataset.userToggled = "true"
}, true)

document.addEventListener("nav", updateTocDefaultState)
document.addEventListener("render", updateTocDefaultState)
window.addEventListener("resize", updateTocDefaultState)
requestAnimationFrame(updateTocDefaultState)
document.fonts?.ready.then(updateTocDefaultState)
`

export default ((options?: { layout?: "modern" | "legacy" }) => {
  const TableOfContents = TableOfContentsConstructor(options)
  const AdaptiveTableOfContents: QuartzComponent = (props) => TableOfContents(props)

  AdaptiveTableOfContents.css = TableOfContents.css
  const existingScripts = TableOfContents.afterDOMLoaded ?? []
  AdaptiveTableOfContents.afterDOMLoaded = [
    ...(typeof existingScripts === "string" ? [existingScripts] : existingScripts),
    adaptiveTocScript,
  ]

  return AdaptiveTableOfContents
}) satisfies QuartzComponentConstructor<{ layout?: "modern" | "legacy" }>
