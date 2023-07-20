import chokidar from 'chokidar'
import debounce from 'debounce'
import fs from 'fs'
import jdown from 'jdown'

const parseMarkdown = () => {
	jdown('pages/posts', { parseMd: false, fileInfo: true }).then((content) => {
		fs.writeFileSync(
			'pages/posts.js',
			'export default ' + JSON.stringify(content)
		)
	})
}

chokidar.watch('./pages/posts/**/*.md').on('all', debounce(parseMarkdown, 200))
