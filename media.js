// basic streaming media server
// https://medium.com/@daspinola/video-stream-with-node-js-and-html5-320b3191a6b6

const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

const rBytes = /bytes=/;

const media = new Map(
	[
		'desktop-loop',
		'mobile-loop',
	].map(name => {
		return [name, {
			stat: fs.statSync(path.resolve(process.cwd(), `assets/banner/${name}.mp4`)),
			path: path.resolve(process.cwd(), `assets/banner/${name}.mp4`),
		}];
	})
);

router.get('/:name', function(req, res) {
	const { name } = req.params;
	const { path, stat } = media.get(name);
	const fileSize = stat.size;
	const range = req.headers.range;
	if (range) {
		const parts = range.replace(rBytes, '').split('-');
		const start = parseInt(parts[0], 10);
		const end = parts[1] ?
			parseInt(parts[1], 10) :
			fileSize - 1;
		const chunksize = (end - start) + 1;
		const file = fs.createReadStream(path, { start, end });
		res.writeHead(206, {
			'Content-Range': `bytes ${start}-${end}/${fileSize}`,
			'Accept-Ranges': 'bytes',
			'Content-Length': chunksize,
			'Content-Type': 'video/mp4',
		});
		return file.pipe(res);
	}
	
	res.writeHead(200, {
		'Content-Length': fileSize,
		'Content-Type': 'video/mp4',
	});
	fs.createReadStream(path).pipe(res);
});

module.exports = router;