// api
'use strict';
const url = require('url');

exports.get = (req, res, next) => {

	let fileName = url.parse(req.url, true).query.filePath;

	let pdfGenerator = req.app.locals.pdfGenerator;

	pdfGenerator.createPdfFile(fileName, (data) => {

		console.log(data);

		(data.file) ? console.log(`Файл ${data.file} создан...`) : console.log(`Ошибка: ${data.message}`);

		res.end();

	});
	
};