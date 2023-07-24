import ardi, { html } from '//unpkg.com/ardi'
import products from '/products/index.js'

ardi({
	tag: 'product-list',
	shadow: false,
	props: {
		heading: [String, 'Our Products'],
		category: [String, 'photography'],
		single: [Boolean, false],
	},
	template() {
		return html`
			<div class="toolbar">
				<h1>${this.heading}</h1>
				${!this.single
					? html`
							<select @change=${(e) => (this.category = e.target.value)}>
								${Object.keys(products).map(
									(category) =>
										html`
											<option
												value=${category}
												selected=${this.category === category ? '' : null}
											>
												${products[category].name}
											</option>
										`
								)}
							</select>
					  `
					: ''}
			</div>
			<p>${products[this.category].description}</p>
			<div class="list">
				${products[this.category].items.map(
					(product) => html`
						<product-card
							name=${product.name}
							description=${product.description}
							image=${product.image}
							price=${product.price}
						></product-card>
					`
				)}
			</div>
		`
	},
})
