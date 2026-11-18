import test from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const styles = readFileSync(new URL("./custom.scss", import.meta.url), "utf8")

function mediaBlock(query: string, containing: string): string {
  const mediaQuery = `@media all and (${query})`
  const source = styles.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "")
  let start = -1
  while ((start = source.indexOf(mediaQuery, start + 1)) !== -1) {
    const open = source.indexOf("{", start)
    let depth = 0
    for (let index = open; index < source.length; index++) {
      if (source[index] === "{") depth++
      if (source[index] === "}" && --depth === 0) {
        const block = source.slice(open + 1, index)
        if (block.includes(containing)) {
          const enclosingDepth = source
            .slice(0, start)
            .split("")
            .reduce(
              (currentDepth, character) =>
                currentDepth + (character === "{" ? 1 : character === "}" ? -1 : 0),
              0,
            )
          assert.equal(enclosingDepth, 0, `${mediaQuery} must not be nested inside another rule`)
          return block
        }
        break
      }
    }
  }

  assert.fail(`Expected responsive media query ${query} containing ${containing}`)
}

test("mobile and tablet navigation exposes a stacked, scrollable table of contents", () => {
  const styles = mediaBlock("max-width: 1199px", ".sidebar.right")

  assert.match(styles, /\.sidebar\.right\s*\{[^}]*flex-direction:\s*column/s)
  assert.match(styles, /\.center\s*>\s*\.toc\s*\{[^}]*display:\s*flex/s)
  assert.match(
    styles,
    /\.center\s*>\s*\.toc\s*\{[\s\S]*?>\s*\.toc-content\s*\{[^}]*overflow-y:\s*auto/s,
  )
  assert.match(styles, />\s*\.toc\s*\{[^}]*display:\s*flex/s)
  assert.match(styles, />\s*\.toc\s*\{[^}]*order:\s*-1/s)
  assert.match(styles, />\s*\.toc\s*>\s*\.toc-content\s*\{[^}]*overflow-y:\s*auto/s)
  assert.match(styles, /\.backlinks\[open\]\s*>\s*ul\.overflow\s*\{[^}]*overflow-y:\s*auto/s)
  assert.match(styles, /\.toc-header\.collapsed\s*\.fold\s*\{[^}]*rotate\(0deg\)/s)
  assert.match(styles, /\.toc-header:not\(\.collapsed\)\s*\.fold[\s\S]*?rotate\(180deg\)/s)
  assert.match(
    styles,
    /\.backlinks\[open\]\s*>\s*\.backlinks-toggle\s*\.fold[\s\S]*?rotate\(180deg\)/s,
  )
})

test("mobile navigation controls and links have touch-friendly hit areas", () => {
  const styles = mediaBlock("max-width: 800px", ".search-button")
  const panels = mediaBlock("max-width: 1199px", ".sidebar.right")

  assert.match(styles, /\.search-button\s*\{[^}]*min-height:\s*44px/s)
  assert.match(
    styles,
    /\.darkmode,[\s\S]*?\.readermode\s*\{[^}]*width:\s*44px;[^}]*height:\s*44px/s,
  )
  assert.match(styles, /\.mobile-explorer\s*\{[^}]*width:\s*44px;[^}]*height:\s*44px/s)
  assert.match(styles, /\.search-space\s*>\s*input\s*\{[^}]*min-height:\s*44px/s)
  assert.match(panels, />\s*\.toc\s*>\s*\.toc-header\s*\{[^}]*min-height:\s*44px/s)
  assert.match(panels, />\s*\.backlinks\s*>\s*\.backlinks-toggle\s*\{[^}]*min-height:\s*44px/s)
  assert.match(panels, /min-height:\s*44px/)
})

test("reader mode hides navigation and graphs while keeping an exit control", () => {
  const reader = styles.slice(
    styles.indexOf(':root[reader-mode="on"]'),
    styles.indexOf("// --- Graphe de la page"),
  )

  assert.match(reader, /div#quartz-root\.page\s*\{\s*max-width:\s*none;/)
  assert.match(reader, /width:\s*min\(100%,\s*max\(60rem,\s*calc\(67vw \+ 2\.5rem\)\)\)/)
  assert.match(reader, /max-width:\s*100%/)
  assert.match(reader, /\.center\s*\{\s*padding:\s*0;/)
  assert.match(
    reader,
    /@media all and \(max-width:\s*68rem\)\s*\{\s*padding-right:\s*calc\(44px \+ 2rem\)/,
  )
  assert.match(reader, /grid-template-columns:\s*minmax\(0,\s*1fr\)/)
  assert.match(reader, /\.sidebar\.left\s*\{[^}]*visibility:\s*hidden/s)
  assert.match(reader, /\.readermode svg\s*\{[^}]*visibility:\s*visible/s)
  assert.match(reader, /\.readermode\s*\{[^}]*position:\s*fixed;[^}]*width:\s*44px/s)
  assert.match(reader, /\.readermode\s*\{[^}]*-webkit-mask:\s*none;[^}]*mask:\s*none/s)
  assert.match(reader, /\.readermode svg\s*\{[^}]*display:\s*block;[^}]*fill:\s*var\(--dark\)/s)
  assert.match(reader, /\.readermode:hover svg\s*\{[^}]*fill:\s*var\(--secondary\)/s)
  assert.match(reader, /\.readermode:focus-visible\s*\{[^}]*outline:/s)
  assert.match(
    reader,
    /\.sidebar\.right,[\s\S]*?\.center\s*>\s*\.toc,[\s\S]*?\.graph\s*\{[^}]*display:\s*none/s,
  )
})

test("reader mode disables the theme's sidebar hover background", () => {
  assert.match(
    styles,
    /:root\[reader-mode="on"\]\[saved-theme\][\s\S]*?\.page\.page:has\(\s*div\.sidebar\.left:hover\s*\)[\s\S]*?\.page\.page:has\(\s*div\.sidebar\.right:hover\s*\)\s*\{[^}]*background-image:\s*none/s,
  )
})

test("reader mode increases prose spacing without changing nested code blocks", () => {
  const reader = styles.slice(
    styles.indexOf(':root[reader-mode="on"] div#quartz-root.page'),
    styles.indexOf("// --- Graphe de la page"),
  )

  assert.match(reader, /\.center article p,\s*\.center article li\s*\{\s*line-height:\s*1\.7;/)
  assert.match(reader, /\.center article li pre\s*\{\s*line-height:\s*1\.6rem;/)
})
