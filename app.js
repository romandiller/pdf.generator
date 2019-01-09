const Pdf = require('./controllers/pdf');

let name = './files/input/1.html'; // путь до html файла

let pdf = new Pdf({

	input: './public/documents/html/', // путь до папки где html лежит
	output: './public/documents/pdf/', // путь куда ложить pdf файлы
	pageBreak: true // перенос/разрыв страниц. НО! Перенос работает только для росррестра, остальные нужно смотреть

});

pdf.create(name);