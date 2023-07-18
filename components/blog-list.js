import posts from '../pages/posts/index.js'
import ardi, { css, html } from '//unpkg.com/ardi'

ardi({
	tag: 'blog-list',
	ready() {
		const app = this.context('app')
		app.handleLinks(this.root)
	},
	template() {
		return html`
			<ul>
				${posts.map(
					(post) => html`
						<li>
							<h3>${post.title}</h3>
							<p>${post.description}</p>
							<div part="meta">
								<a href=${post.path.replace('pages', '').replace('.md', '')}>
									Read More
								</a>
								<small>Published: ${post.date}</small>
							</div>
						</li>
					`
				)}
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
