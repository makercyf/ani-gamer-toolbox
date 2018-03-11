export function hookSetter(obj, prop, cb) {
	Object.defineProperty(obj, prop, {
		set: cb
	})
}
export function cvtM3U8_to_playlist(baseurl) {
	return m3u8 => {
		const parser = new m3u8Parser.Parser()
		parser.push(m3u8)
		parser.end()
		const pls = parser.manifest.playlists.map(pl => ({
			url: 'https:' + baseurl + pl.uri,
			res: pl.attributes.RESOLUTION
		}))
		return pls
	}
}
export function triggerDownload(url, fname) {
	const a = document.createElement('a')
	a.href = url
	a.download = fname
	document.body.appendChild(a)
	a.click()
	a.remove()
}
export function saveTextAsFile(text, fname) {
	const blob = new Blob([text])
	const url = URL.createObjectURL(blob)
	triggerDownload(url, fname)
	URL.revokeObjectURL(url)
}
export const $ = jQuery
