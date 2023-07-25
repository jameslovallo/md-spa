import ardi, { css, html } from '//unpkg.com/ardi'

ardi({
	tag: 'home-hero',
	props: {
		image: [String],
		heading: [String, 'Heading'],
		subheading: [String, 'Subheading'],
		link: [String, '#'],
		linktext: [String, 'Shop Now'],
	},
	template() {
		return html`
			<img src=${this.image} />
			<div class="details">
				<h1>${this.heading}</h1>
				<p>${this.subheading}</p>
				<a href=${this.link}>${this.linktext}</a>
			</div>
		`
	},
	styles: css`
		:host {
			align-items: center;
			display: grid;
			gap: 1rem;
			margin-bottom: 2rem;
		}
		@media (min-width: 600px) {
			:host {
				grid-template-columns: 200px 1fr;
			}
		}
		* {
			margin: 0;
		}
		img {
			border-radius: 0.5rem;
			display: block;
			width: 200px;
		}
		.details {
			display: grid;
			gap: 1rem;
		}
		a {
			background: var(--accent);
			border-radius: 3rem;
			color: white;
			padding: 0.5rem 1.5rem;
			text-decoration: none;
			width: max-content;
		}
	`,
})
