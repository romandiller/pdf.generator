Первое, что нужно сделать, создать экземпляр PdfGenerator при запуске всего приложения, передав options:

	input: - путь до папки где html лежит
	output: - путь куда ложить pdf файлы
	pageBreak: true - перенос/разрыв страниц. 

	Внимание! Данный перенос работает только для html файлов от росррестра, остальные нужно смотреть. 

После запускаем "бро" - инстанс/браузер. В callback'е сделать локальную переменную приложения (app.locals.pdfGenerator = pdfGenerator), 
для того, что бы можно было использовать в любой точке приложения.

	!!! Все это показано в common.js.

Далее в /controllers/router/api/index.js показан пример использования