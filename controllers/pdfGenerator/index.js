// pdf
'use strict';
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PdfGenerator {

	constructor(options) {

		this.generator = false;
		this.pageBreak = options.pageBreak;
		this.input = options.input;
		this.output = options.output;
		this.transitLink = `file://${__dirname}/transit/`;

	}

	async launchPdfGenerator(callback) {

		this.generator = await puppeteer.launch();

		if (this.generator) callback();

	}

	async createPdfFile(fileName, callback) {

		if (this.generator) {

			let htmlInput = this.input + fileName; // путь до исходного html

			fs.stat(htmlInput, async (err, stats) => {

				if (stats) { // если файл сущесвует

					let filePath = htmlInput.slice(1);

					let fileData = path.parse(filePath); // получаем данные по файлу
					
					this.prepareFile(fileData, async (error) => { // приготавливаем временный входящий файл, это нужно для замены его содержимого

						if (error.error) {

							callback({

								error: true,
								message: error.message

							});

						} else {

							let fileHtml = `${this.transitLink}${fileData.name}.html`; // путь до временного входящего файла
							let outputFile = `${this.output}${fileData.name}.pdf`; // путь выходящего файла

					    	let page = await this.generator.newPage();

					    	await page.goto(fileHtml, {

					    		waitUntil: `load`

					    	});

					    	await page.emulateMedia(`screen`);
					    	
					    	await page.pdf({

					    		path: outputFile,
					    		format: `A4`,
					    		printBackground: true,
					    		landscape:false,
					    		scale: 0.8,
					    		width: `11.7in`,
					    		height: `16.5in`,
					    		margin: {
							        top: `0.5cm`,
							        right: `0.5cm`,
							        bottom: `0.5cm`,
							        left: `0.5cm`,
						      	}

					    	});

					    	this.clearTransit(fileData, async (error) => { // удалем временный входящий файл

					    		await page.close();

					    		if (error) {

									callback({

										error: true,
										message: `Ошибка удаления временного файла.`

									});

					    		} else {
						    		
						    		callback({

						    			file: `${fileData.name}.pdf`

						    		});

					    		}

					    	});

						}

					});

				} else { // если файла нет

					callback({

						error: true,
						message: `Файл ${htmlInput} не существует.`

					});

				}

			});

		} else { // если не заупщен бро

			await page.close();
			callback({

				error: true,
				message: `Браузер не запущен.`

			});

		}

	}

	prepareFile(fileData, callback) {

		// return new Promise((resolve, reject) => {

			fs.readFile(`${this.input}${fileData.name}.html`, (err, file) => {

				if (err) {

					callback({

						error: true,
						message: `Ошибка чтения html файла.`

					});

					return;

				}

				let str = file.toString();
				let input = (this.pageBreak) ? str.replace(/<p class="pagebreak"><\/p>/g, `<div style="page-break-after:always;"></div>`) : str;

				fs.writeFile(`${__dirname }/transit/` + fileData.name + '.html', input, (err) => {

					if (err) {
						
						callback({

							error: true,
							message: `Ошибка записи временного файла.`

						});

						return;

					}

					callback({});

					// resolve(true);

				});

			});

		// });

	}

	clearTransit(fileData, callback) {

		fs.unlink(`${__dirname }/transit/` + fileData.name + '.html', (err) => {
			
			(err) ? callback(true) : callback();

		});

	}

}

module.exports = Pdf;