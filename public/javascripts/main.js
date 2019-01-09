// main
'use strict';

document.addEventListener('DOMContentLoaded', () => {

	let buttons = document.querySelectorAll('button');

	[].forEach.call(buttons, (button) => {

		button.addEventListener('click', (e) => {

			let file = e.target.parentNode.querySelector('span').innerText;

			let xhr = new XMLHttpRequest();

			xhr.open("GET", `api/getPdf?filePath=${file}`);

			xhr.onreadystatechange = () => {
				
				if (xhr.readyState == 4) {
					
					console.log('все готово!');

				}

			}

			xhr.send();

			});

	});

});