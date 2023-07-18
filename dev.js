import chokidar from 'chokidar'
import fs from 'fs'
import matter from 'gray-matter'
import posts from './pages/posts/index.js'

const getFile = (path) => {
	return fs.readFileSync(path, { encoding: 'utf8' }, (err, data) =>
		err ? console.log(err) : data
	)
}

const writeIndex = () => {
	fs.writeFileSync(
		'./pages/posts/index.js',
		'export default ' + JSON.stringify(posts)
	)
}

const checkEntry = (path) => {
	const filtered = posts.filter((entry) => entry.path === path)
	const exists = filtered.length > 0
	const pathArray = path.split('/')
	const category = !pathArray[1].endsWith('.md') ? pathArray[1] : undefined
	return {
		exists,
		category,
		index: exists ? posts.indexOf(filtered[0]) : null,
		formattedPath: path.replace('pages', '').replace('.md', ''),
	}
}

const createEntry = (path) => {
	const { exists, category, formattedPath } = checkEntry(path)
	if (!exists) {
		const file = getFile(path)
		const { data } = matter(file)
		posts.push({ path: formattedPath, category, ...data })
		writeIndex()
	}
}

const updateEntry = (path) => {
	const { exists, index, category, formattedPath } = checkEntry(path)
	if (exists) {
		const file = getFile(path)
		const { data } = matter(file)
		posts[index] = { path: formattedPath, category, ...data }
		writeIndex()
	}
}

const deleteEntry = (path) => {
	const { exists, index } = checkEntry(path)
	if (exists) {
		posts.splice(index, 1)
		writeIndex()
	}
}

const handleFile = (event, path) => {
	switch (event) {
		case 'add':
			createEntry(path)
			break
		case 'change':
			updateEntry(path)
			break
		case 'unlink':
			deleteEntry(path)
			break
	}
}

chokidar.watch('./pages/posts/**/*.md').on('all', (event, path) => {
	if (path.startsWith('pages/posts') && path.endsWith('.md')) {
		handleFile(event, path)
	}
})
