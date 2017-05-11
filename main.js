const elements = ['.n-products-page__gender','.n-products-page__categories'];

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