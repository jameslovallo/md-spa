import posts from '../pages/posts/index.js'
import ardi, { css, html } from '//unpkg.com/ardi'

ardi({
	tag: 'blog-list',
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
			list-style: none;
			padding: 0;
		}
		[part='meta'] {
			align-items: baseline;
			display: flex;
			justify-content: space-between;
		}
	`,
})
