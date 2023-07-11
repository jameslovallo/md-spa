import grayMatter from 'https://cdn.skypack.dev/gray-matter@4.0.3'
import parse from 'https://unpkg.com/snarkdown@2.0.0/dist/snarkdown.modern.js'
import meta from '../meta.js'
import ardi, { css, html } from '//unpkg.com/ardi'
import '//unpkg.com/ardi/components/dialog.js'

ardi({
  tag: 'app-layout',
  props: { breakpoint: [Number, 768] },
  state: () => ({ mobile: null }),
  created() {
    const mq = matchMedia(`(min-width: ${this.breakpoint}px)`)
    this.mobile = !mq.matches
    mq.addEventListener('change', () => (this.mobile = !mq.matches))
    this.contentRoot = this.querySelector('[slot=content]')
  },
  setHead(data) {
    const { title, description, image } = { ...meta, ...data }
    const createMeta = (property, content) => {
      const metaTag = document.querySelector(`meta[property='${property}']`)
      if (metaTag) {
        metaTag.content = content
      } else {
        const newTag = document.createElement('meta')
        newTag.setAttribute('property', property)
        newTag.setAttribute('content', content)
        document.head.appendChild(newTag)
      }
    }
    if (title) {
      document.title = title
      createMeta('og:title', title)
    }
    if (description) {
      createMeta('description', description)
      createMeta('og:description', description)
    }
    if (image) createMeta('og:image', image)
  },
  getMD(path) {
    path = path === '/' ? '/home' : `${path}`
    const getFile = (path, callback) => {
      fetch(path)
        .then((res) => res.text())
        .then((page) => {
          if (page.startsWith('#') || page.startsWith('---')) {
            const { content, data } = grayMatter(page)
            if (data) this.setHead(data)
            this.contentRoot.innerHTML = parse(content)
            this.style.opacity = 1
          } else if (callback) callback()
        })
    }
    getFile('/pages' + path + '.md', () => {
      getFile('/pages' + path + '/index.md', () => {
        getFile('/pages/404.md')
      })
    })
  },
  ready() {
    this.getMD(location.pathname, true)
  },
  template() {
    return html`
      <nav>
        ${this.mobile
          ? html`
              <ardi-dialog drawer>
                <button slot="opener" part="menu-button">
                  <svg viewBox="0 0 24 24" part="menu-button-icon">
                    <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                  </svg>
                </button>
                <slot name="nav"></slot>
              </ardi-dialog>
              <slot name="mobile-nav"></slot>
            `
          : html`<slot name="nav"></slot>`}
      </nav>
      <main>
        <slot name="content"></slot>
      </main>
      <footer>
        <slot name=${this.mobile ? 'mobile-footer' : 'footer'}></slot>
      </footer>
    `
  },
  styles: css`
    :host {
      display: block;
      height: 100%;
    }
    * {
      box-sizing: border-box;
    }
    nav {
      align-items: center;
      background: black;
      color: white;
      display: flex;
      gap: 1rem;
      padding: 1rem;
    }
    ardi-dialog {
      margin: -1rem 0 -1rem -0.5rem;
    }
    ardi-dialog::part(dialog) {
      display: flex;
      gap: 1rem;
      flex-direction: column;
      justify-content: center;
    }
    [part='menu-button'] {
      background: transparent;
      border: none;
      color: currentColor;
      display: block;
      padding: 0.5rem;
    }
    [part='menu-button-icon'] {
      display: block;
      fill: currentColor;
      width: 24px;
    }
    nav slot::slotted(*) {
      color: inherit;
      text-decoration: none;
    }
    main {
      margin: 0 auto;
      max-width: 70ch;
      padding: 1rem;
    }
    footer {
      background: #ddd;
      position: sticky;
      top: 100vh;
    }
    footer slot {
      display: block;
      overflow: auto;
      margin: 0 auto;
      max-width: 70ch;
      padding: 0 1rem;
    }
  `,
})
