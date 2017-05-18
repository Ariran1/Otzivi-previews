/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// version 0.0.0
class pageDraw {
	constructor(options) {


		options = options || {};

		this.template = options.content || null;
		this.__cache = (options.data) ? this.ajaxCacheControl(options.data) : (Promise.resolve());
		this.show = options.show || null;
		this.callback = options.callback || null;
		this.pos = options.position || null;
		this.element = (options.element || 'div');
		this.class = options.class;

		this.parent = document.createElement(this.element);

		if (this.class) {
			this.parent.className = this.class;
		}
		this.childrenArray = [];
	}

	set data(url) {
		let a = this.ajaxCacheControl(url) || Promise.resolve();
		if (this.__cache != a){
			this.chengeCache = true;
			this.drawed = false;
			this.loading = false;
			this.__cache = a;
		}

	}

	get data() {
		return this.__cache;
	}

	set content(code) {
		this.parent.innerHTML = code;
	}

	get content() {
		return this.parent;
	}

	set children(object) {
		let a = this.childrenArray.length || 1;

		for (var i = 0; i < a; i++) {
			if (this.childrenArray[i] == object) {
				return;
			}

			if ( i == (a-1) ) {
				this.childrenArray.push(object);
			}
		}
		object.father = this;
	}

	get children() {
		return this.childrenArray;
	}

	set structure(object) {
		
		function __parse(element,children) {
			for (var i = 0; i < children.length; i++) {
				element.children = children[i].element;
				children[i].element.father = element;
				if (children[i].children) {
					__parse(children[i].element,children[i].children);
				}
			}
		
		}
		
		__parse(object.element,object.children);
	}

	isChildren(code) {
		for (var i = 0; i < this.childrenArray.length; i++) {
			if (this.childrenArray[i] == code)
				return true;
			else return false;
		}
	}

	set removeChildren(code) {
		for (var i = 0; i < this.childrenArray.length; i++) {
			if (this.childrenArray[i] === code) {

				delete this.childrenArray[i];

				for (var j = i; j < this.childrenArray.length; j++) {
					if (j == this.childrenArray.length) break;
					this.childrenArray[j] = this.childrenArray[j + 1];
				}

				break;
			}
		}
	}

	get removeChildren() {
		this.childrenArray = [];
		return this.childrenArray;
	}


	set position(code) {
		this.drawed = false;
		if (code instanceof Array) {
			this.pos = code;
		} else {
			this.pos = code.split(' ');
		}
	}

	get position() {
		return this.pos;
	}

	get draw() {

		return this.data.then(()=> {

			if (!this.drawed) {
				
				if (this.chengeCache) {
					this.delete;
					this.chengeCache = false;
				}

				if (this.pos[1] instanceof Object) {
		
					this.pos[1].insertAdjacentElement(this.pos[0] ,this.content);
					this.drawed = true;

				} else {

					var element = document.querySelector(this.pos[1]);

					if (element) {
						element.insertAdjacentElement(this.pos[0] ,this.content);
						this.drawed = true;
					}
				}
				console.log('Отрисовано',this.content);

				if (this.show)
				this.show();
			} else {

				console.log('Не отрисовано',this.content);

			}


			if (!!this.children.length) {

				for (var i = 0; i < this.children.length; i++) {
					this.children[i].draw;
				}

			}
			if (this.callback)
			this.callback();

		})
		.catch((err)=>{
			throw err;
		});

	}

	get delete() {

		if (!!this.children.length) {

			for (var i = this.children.length - 1; i >= 0; i--) {
				this.children[i].delete;
			}

		}

		this.drawed = false;
		return this.parent.remove();
	}





	loadJson(url, options) {
		options = options || {};
		const BASE_URL = location.origin;
		let xhr = new XMLHttpRequest();
		let method = options.method || 'GET';
	
		xhr.open(method, BASE_URL + url, true);
	
		let promise = new Promise((resolve, reject) => {
			xhr.onload = () => {
				if (xhr.status !== 200) {
					reject();

					return;
				}

				this.loading = false;

				try {
					resolve( JSON.parse(xhr.responseText) );
    			} catch (e) {
					resolve( xhr.responseText );
    			}
			};
	
			xhr.onerror = function() {
				reject();
			};
	
			xhr.send();
	    });
	
		return promise
				.catch(function() {
					let error = new Error(xhr.status + ': ' + xhr.statusText);
	
					console.error('Ajax error', error);
	
					throw error;
				});
	}

	ajaxCacheControl(url) {
		//защита от двойного клика
		if (this.loading) return;

		if (!this[url]) {

			this.loading = true;
			this[url] = this.loadJson(url);
			console.log(this[url], url,"скачено");
		}
		return this[url];
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = pageDraw;





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pageDraw_js__ = __webpack_require__(0);


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
		
		this.comments = new __WEBPACK_IMPORTED_MODULE_0__pageDraw_js__["a" /* default */]({
			position:["afterend",document.querySelector('.productCard__commentConstructor')]
		});
		this.pages = new __WEBPACK_IMPORTED_MODULE_0__pageDraw_js__["a" /* default */]({
			position:['afterbegin',document.querySelector('.productCard__comments-pages')],
			element:'ul'
		});

		this.comments.children = this.pages;

		this.chengeCommentsPage();


	}

	content(data) {
		var a = '';
		for (var i = 0; i < data.length; i++) {
			a += `<article class="productCard__comment clearFix">
				<div class="productCard__comment-photo" ` + ((data[i].image && `style="backgroundImage: url(`+ data[i].image +');"') || '')  + `></div>
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





/***/ })
/******/ ]);