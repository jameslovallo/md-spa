import degit from 'degit'

const starter = process?.argv[2]?.split('=')[1]

const emitter = degit(`jameslovallo/md-spa/${starter || 'basic'}`, {
	cache: false,
	force: true,
	verbose: false,
})

emitter.on('info', (info) => {
	console.log(info.message)
})

emitter.clone(starter ? `md-${starter}` : 'md-spa').then(() => {
	console.log('done')
})
