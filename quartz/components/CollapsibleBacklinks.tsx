import type { BacklinksOptions } from "@quartz-community/backlinks"
import type { QuartzComponent, QuartzComponentConstructor } from "./types"
import { TRANSLATIONS, type ValidLocale, defaultTranslation } from "../i18n"
import { resolveRelative, simplifySlug } from "../util/path"

const isValidLocale = (locale: string): locale is ValidLocale => locale in TRANSLATIONS

export default ((options?: Partial<BacklinksOptions>) => {
  const Backlinks: QuartzComponent = ({ fileData, allFiles, displayClass, cfg }) => {
    const currentSlug = fileData.slug
    if (!currentSlug) return null

    const slug = simplifySlug(currentSlug)
    const backlinks = allFiles.filter(
      (file) => file.unlisted !== true && file.links?.includes(slug),
    )

    if (options?.hideWhenEmpty !== false && backlinks.length === 0) {
      return null
    }

    const locale = cfg.locale && isValidLocale(cfg.locale) ? cfg.locale : defaultTranslation
    const translation = TRANSLATIONS[locale].components.backlinks

    return (
      <details class={[displayClass, "backlinks"].filter(Boolean).join(" ")}>
        <summary class="backlinks-toggle">
          {translation.title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fold"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </summary>
        <ul class="overflow">
          {backlinks.length > 0 ? (
            backlinks.map((file) => {
              if (!file.slug) return null

              return (
                <li>
                  <a href={resolveRelative(currentSlug, file.slug)} class="internal">
                    {file.frontmatter?.title}
                  </a>
                </li>
              )
            })
          ) : (
            <li>{translation.noBacklinksFound}</li>
          )}
          <li class="overflow-end"></li>
        </ul>
      </details>
    )
  }

  Backlinks.css = `
    .backlinks {
      flex-direction: column;
    }

    .backlinks > .backlinks-toggle {
      cursor: pointer;
      list-style: none;
      font-size: 1rem;
    }

    .backlinks > .backlinks-toggle::-webkit-details-marker {
      display: none;
    }

    .backlinks > ul.overflow {
      list-style: none;
      padding: 0;
      margin: 0.5rem 0;
      max-height: calc(100% - 2rem);
      overscroll-behavior: contain;
    }

    .backlinks > ul.overflow > li > a {
      background-color: transparent;
    }
  `

  return Backlinks
}) satisfies QuartzComponentConstructor<Partial<BacklinksOptions>>
