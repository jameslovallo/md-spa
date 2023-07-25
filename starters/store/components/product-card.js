import ardi, { html } from '//unpkg.com/ardi'

ardi({
	tag: 'product-card',
	shadow: false,
	props: {
		name: [String],
		description: [String],
		image: [String],
		price: [Number],
	},
	template() {
		return html`
			${this.image ? html`<img src=${this.image} />` : ''}
			<div class="details">
				<h3>${this.name}</h3>
				<p>${this.description}</p>
				<button
					class="snipcart-add-item"
					data-item-id=${this.name}
					data-item-name=${this.name}
					data-item-description=${this.description}
					data-item-image=${this.image}
					data-item-price=${this.price}
				>
					$${this.price}
				</button>
			</div>
		`
	},
})
