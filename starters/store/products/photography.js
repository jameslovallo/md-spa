export default {
	name: 'Photography',
	description: 'Photos for sale from local photographers.',
	items: Array(10)
		.fill(null)
		.map((a, i) => ({
			name: 'Photo ' + (i += 1),
			description: `Photo ${(i += 1)} description`,
			image: `//picsum.photos/seed/${(i += 20)}/400/300/`,
			price: 9.99,
		})),
}
