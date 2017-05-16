'use strict';

class PreviewImageForComments {
	constructor() {
		this.photoText = document.querySelector('.productCard__commentConstructor-photoText');
		this.imageContainer = document.querySelector('.productCard__commentConstructor-photoPrewiev');
		this.input = document.getElementById("productCard__commentConstructor-photoInput");
		this.setImage();
	}

	setImage() {

		this.input = document.getElementById("productCard__commentConstructor-photoInput");
	
		this.input.addEventListener("change", () => {
	
	        
	        var fileReader = new FileReader();

	        fileReader.addEventListener("load", (event) => {
	            console.log("loaded");
	            var src = event.target.result;
	            

	        	this.imageContainer.style.backgroundImage = 'url('+src+')';
	        	this.imageContainer.style.backgroundSize = 'cover';
	        	this.imageContainer.style.backgroundPosition= 'center center';
	            
	        }, false);
	
	        fileReader.readAsDataURL(this.input.files[0]);

	        this.photoText.innerHTML = 'Удалить<br>фото';

		}, false);

		this.input.addEventListener('click',(event) => {
			if (!this.input.value) {return;}

			event.preventDefault()

			this.input.value = '';

	    	this.photoText.innerHTML = 'Загрузить<br>фото';

		    this.imageContainer.style.backgroundImage = '';
		});

	    
	    function PreviewImages() {
	    }
	
    }

}
document.addEventListener('DOMContentLoaded',() => {
	new PreviewImageForComments();
});








class loadComments {
	constructor() {
		this.title = document.title;
		this.page = 1;
		if(window.location.search) {

			var query = window.location.search.substring(1);
			var queryParsed = {};
			query.split('&').forEach((item)=>{
				var a = item.split('=');
				queryParsed[a[0]] = a[1];
			});

			if (!queryParsed['comment_page']) {
				return;
			}
			this.page = +queryParsed['comment_page'];
		}

		this.path = window.location.pathname + '?link=comments&comment_page=';
		this.histotyPath = window.location.pathname + '?comment_page=';
		
		this.comments = new pageDraw({
			position:["afterend",document.querySelector('.productCard__commentConstructor')]
		});
		this.pages = new pageDraw({
			position:['afterbegin',document.querySelector('.productCard__comments-pages')],
			element:'ul'
		});

		this.chengeCommentsPage();


	}

	content(data) {
		var a = '';
		for (var i = 0; i < data.length; i++) {
			a += `<article class="productCard__comment clearFix">
				<div class="productCard__comment-photo" style="backgroundImage: url(`+ data[i].image +`);"></div>
				<div class="productCard__comment-texts">
					<h5 class="productCard__comment-name">` + data[i].name + `</h5>
					<div class="productCard__comment-stars  stars--` + data[i].stars + `">
					<span class="productCard__comment-star">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
							<use xlink:href="#icon-star">
						</svg>
					</span>
					<span class="productCard__comment-star">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
							<use xlink:href="#icon-star">
						</svg>
					</span>
					<span class="productCard__comment-star">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
							<use xlink:href="#icon-star">
						</svg>
					</span>
					<span class="productCard__comment-star">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
							<use xlink:href="#icon-star">
						</svg>
					</span>
					<span class="productCard__comment-star">
						<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.867 53.867" style="enable-background:new 0 0 53.867 53.867;" xml:space="preserve">
							<use xlink:href="#icon-star">
						</svg>
					</span>
					</div>
					<div class="productCard__comment-date">` + data[i].date + `</div>
					<p class="productCard__comment-text">
						` + data[i].text + `
					</p>
				</div>
			</article>`
		}
		return a;
	}

	pagesContent(data) {

		var a = '';
		var buttons = 5;
		var count = -(buttons + 1)/2;


		var whileCount;
		if (data.pagesLength > buttons) {
			whileCount = buttons;
			if ((this.page + count) <= 0) {
				count = -this.page + 1;
			}

			if ((this.page >= data.pagesLength - 3)) {
				count =  -(5 - (+data.pagesLength - this.page)) + 1;
			}
		} else {
			whileCount = data.pagesLength;
		}
		for (var i = 0; i < whileCount; i++) {
			if ((this.page + count) > data.pagesLength) {
				break;
			}

			a += `<li class="` + (!count && 'active'|| '') + `" data-commentsPageNumber>`+ (this.page + count++) +`</li>`;
		}

		return a;
	}

	chengeCommentsPage(event) {
		this.page = event && +event.currentTarget.innerHTML || this.page;

		if (!window.location.search) {
			history.pushState(null,this.title,this.histotyPath + this.page);
		} else {
			history.replaceState(null,this.title,this.histotyPath + this.page);
		}

		this.comments.data = this.path + this.page;
		this.comments.data
		.then((data)=>{
		
			this.comments.content = this.content(data.items);
			return data;

		}).then((data)=>{

			this.pages.content = this.pagesContent(data);
			
			var buttons = this.pages.content.querySelectorAll('[data-commentsPageNumber]');
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].addEventListener('click',(event)=>{this.chengeCommentsPage(event)});
			}
		});

		this.comments.draw;
		this.pages.draw;
	}


}


var sd = new loadComments();


class commentConstructorButtons {
	constructor() {
		this.element = document.querySelector('.productCard__commentConstructor');

		this.closeButton = this.element.querySelector('.productCard__commentConstructor-buttonClose');
		this.setButton = this.element.querySelector('.productCard__commentConstructor-buttonSet');
		
		this.setButton.addEventListener('click',() => this.setButtonLogic());

		this.closeButton.addEventListener('click',() => this.closeButtonLogic());

		this.timingDelay = 200;
		this.timing = 1000;
		
	}


	setButtonLogic() {

		let closedClass = 'productCard__commentConstructor--closed';
		if (this.element.classList.contains(closedClass)) {
			this.element.classList.remove(closedClass);
		} else {

			if (this.setButtonClick) return;
			
			this.setButtonClick = true;

			// отправка сообщения
			let req = new XMLHttpRequest();
			let sendData = '';

			req.open('POST','/reviews/save',true);

			this.inputPhoto = this.element.querySelector('[type="file"]');
			this.photo = new Promise((resolve,reject) => {
				let fileReader = new FileReader();
				if (this.inputPhoto.files[0]) {
					fileReader.readAsDataURL(this.inputPhoto.files[0]);
					fileReader.addEventListener('load',(event) => {
						
						let file = event.target.result;
						
						if (file) {
							sendData += '&image=' + file;
							var resolved = resolve;
							resolve();
						}

					});	
				} else {
					var rejected = reject;
					this.prom2 = this.showNO(this.element.querySelector('.productCard__commentConstructor-photo'),rejected);
					this.element.querySelector('.productCard__commentConstructor-photoPrewiev').classList.add('input--error');
					
					setTimeout(() => this.element.querySelector('.productCard__commentConstructor-photoPrewiev').classList.remove('input--error'),
						1000);

				}

			});

			

			this.name = new Promise((resolve,reject) => {
				this.nameInput = this.element.querySelector('#AgdfasdDGE');
				if (this.nameInput.value) {
					sendData += '&name=' + encodeURIComponent(this.nameInput.value);
					var resolved = resolve;
					resolve();
				}
				else {
					var rejected = reject;
					this.prom4 = this.showNO(this.element.querySelector('.productCard__commentConstructor-name'),rejected);
					this.nameInput.classList.add('input--error');
					
					setTimeout(() => {
						this.nameInput.classList.remove('input--error');
					},1000);
				}
			});


			
			
			this.stars = new Promise((resolve,reject) => {
				let stars = this.element.querySelector('[name="stars__daszcDD"]:checked').value;
				if (stars) {
					sendData += '&stars=' + encodeURIComponent(stars);
					var resolved = resolve;
					resolve();
				}
				else {
					var rejected = reject;
					this.prom6 = this.showNO(this.element.querySelector('.productCard__commentConstructor-starsContainer'),rejected);
				}
			});




			this.text = new Promise((resolve,reject) => {
				this.textarea = this.element.querySelector('.productCard__commentConstructor-text textarea');
				if (this.textarea.value) {
					sendData += '&text=' + encodeURIComponent(this.textarea.value);
					resolve();
				}
				else {
					var rejected = reject;
					this.prom8 = this.showNO(this.element.querySelector('.productCard__commentConstructor-text'),rejected);
					this.textarea.classList.add('input--error');
					
					setTimeout(() => this.textarea.classList.remove('input--error'),
						1000);
					
				}
			});

			var a = [this.name,this.photo,this.text,this.stars];

			Promise.all(a).then((value)=>{

				sendData = sendData.substring(1);


				let progressLine =  document.createElement('span');
					progressLine.classList.add('loader');

				let button = this.element.querySelector('.productCard__commentConstructor-buttonSet');
				button.style.height = getComputedStyle(button).height;
				let text = button.innerHTML;
				button.innerHTML = '';
				button.append(progressLine);

				req.upload.onload = () => {
					this.textarea.disabled = true;
					this.nameInput.disabled = true;
					this.inputPhoto.disabled = true;
					let stars = this.element.querySelectorAll('[name="stars__daszcDD"]');
					for (var i = 0; i < stars.length; i++) {
						stars[i].disabled = true;
					}
					setTimeout(()=>{
						progressLine.remove();
						button.innerHTML = 'Готово!';
					},500)
				}
				req.send(sendData);

			},reason => {
				this.setButtonClick = false;
			});
			
		}
	}
	closeButtonLogic() {
		let closedClass = 'productCard__commentConstructor--closed';
		if (!this.element.classList.contains(closedClass)) {
			this.element.classList.add(closedClass);
		}
	}

	POSTProgress() {

	}
	
	showNO(parent,promStat) {
		// startCoordClass это css с изначальным положением картинки
		return this.__shake(parent).then(()=> promStat(new Error('Не вышло')));

	}

	__shake(parent) {
		return new Promise((resolve,reject)=>{
			let a = Math.random();
			let anims = 'shake';
			parent.classList.add(anims);

			setTimeout(()=>{
				resolve();
				parent.classList.remove(anims);

			},(this.timing + Math.random() * 2 * this.timingDelay));
		});
	}

}


new commentConstructorButtons();



