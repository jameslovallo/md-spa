import ardi, { css, html } from '//unpkg.com/ardi'

ardi({
	tag: 'product-page',
	template() {
		const params = new URLSearchParams(location.search)
		return html`<h1>Product Card</h1>`
	},
	styles: css`
		:host {
			display: grid;
		}
	`,
})
