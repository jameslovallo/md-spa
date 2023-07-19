#! /usr/bin/env node
import degit from 'degit'
import prompts from 'prompts'

const response = await prompts([
	{
		type: 'text',
		name: 'folder',
		message: `What is your project called?`,
	},
	{
		type: 'select',
		name: 'starter',
		message: 'What starter do you want to use?',
		choices: [
			{ title: 'basic', value: 'basic' },
			{ title: 'blog', value: 'blog' },
			{ title: 'ecommerce', value: 'ecommerce' },
		],
	},
])

const { folder, starter } = response

const emitter = degit(`jameslovallo/md-spa/${starter}`, {
	cache: false,
	force: true,
	verbose: false,
})

emitter.on('info', (info) => {
	console.log(info.message)
})

emitter.clone(folder).then(() => {
	console.log('done')
})
