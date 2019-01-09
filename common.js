// common
'use strict';
const async = require('async');
const fs = require('fs');
const PdfGenerator = require('./controllers/pdfGenerator');

class Common {

	constructor(app) {

		this.app = app;

		this.htmlInput = './public/documents/html/';
		this.pdfOutput = './public/documents/pdf/';

		this.init();

	}

	init() {

		async.parallel([ // запускаем модули для приложения

			this.getHtmlFiles.bind(this), // добавляем список файлов в папке, для примера !!!
			this.pdfGeneratorInit.bind(this) // инициализируем pdf генератор при старте приложения

		]);


	}

	getHtmlFiles() {

		fs.readdir(this.htmlInput, (err, files) => {

			this.app.locals.htmlInput = files;

		});

	}

	pdfGeneratorInit() {

		let pdfGenerator = new PdfGenerator({

			input: this.htmlInput, // путь до папки где html лежит
			output: this.pdfOutput, // путь куда ложить pdf файлы
			pageBreak: true // перенос/разрыв страниц. НО! Данный перенос работает только для росррестра, остальные нужно смотреть

		});

		pdfGenerator.launchPdfGenerator(() => { // создаем интстанс генератора

			console.log('pdfGenerator запущен...');

			this.app.locals.pdfGenerator = pdfGenerator; // для вызова в других метсах приложения

		});

	}

}

module.exports = Common;