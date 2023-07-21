import posts from '../pages/posts.js'
import ardi, { css, html } from '//unpkg.com/ardi'

const postArray = []
Object.keys(posts).forEach((category) => {
	Object.keys(posts[category]).forEach((post) => {
		postArray.push({ category, ...posts[category][post] })
	})
})

ardi({
	tag: 'blog-list',
	ready() {
		const spa = this.context('spa')
		spa.handleLinks(this.root)
	},
	template() {
		return html`
			<ul>
				${postArray
					.sort((a, b) => new Date(b.date) - new Date(a.date))
					.map((post) => {
						const {
							title,
							description,
							category,
							fileInfo: { name },
							date,
						} = post
						return html`
							<li>
								<h3>${title}</h3>
								<p>${description}</p>
								<div part="meta">
									<a href=${`/posts/${category}/${name}`}> Read More </a>
									<small
										>Published: ${new Date(date).toLocaleDateString()}</small
									>
								</div>
							</li>
						`
					})}
			</ul>
		`
	},
	styles: css`
		ul {
			display: grid;
			list-style: none;
			padding: 0;
		}
		li {
			border-bottom: 1px solid rgba(125, 125, 125, 0.5);
			display: grid;
			gap: 1rem;
			margin-bottom: 1.5rem;
			padding-bottom: 1.5rem;
		}
		li:first-child {
			border-top: 1px solid rgba(125, 125, 125, 0.5);
			padding-top: 1.5rem;
		}
		h3,
		p {
			margin: 0;
		}
		[part='meta'] {
			align-items: baseline;
			display: flex;
			justify-content: space-between;
		}
		a {
			color: inherit;
			font-family: Arial, Helvetica, sans-serif;
			text-decoration-color: dodgerblue;
		}
	`,
})
