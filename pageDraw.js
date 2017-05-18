'use strict';
// version 0.0.0
export default class pageDraw {
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


