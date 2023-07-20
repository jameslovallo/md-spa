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
				${postArray.map((post) => {
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
								<small>Published: ${date}</small>
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
			gap: 1.5rem;
			list-style: none;
			padding: 0;
		}
		li {
			line-height: 1.5;
		}
		h3,
		p {
			margin: 0;
		}
		[part='meta'] {
			align-items: baseline;
			display: flex;
			justify-content: space-between;
			margin-top: 0.5rem;
		}
	`,
})
