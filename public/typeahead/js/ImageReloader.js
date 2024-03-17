class ImageReloader {
    constructor(imgElement, interval = 3200, width, height) {
      this.imgElement = imgElement;
      this.interval = interval;
      this.width = width;
      this.height = height;
      setInterval(() => this.updateImage(), this.interval);
    }
  
    updateImage() {
      const newImg = new Image();
      newImg.src = this.buildImageUrl(this.getRandomId());
  
      newImg.onload = () => {
        this.imgElement.style.opacity = 0;
        setTimeout(() => {
          this.imgElement.src = newImg.src;
          this.imgElement.style.opacity = 1;
        }, 500);
      };
    }
  
    getRandomId() {
      return Math.floor(Math.random() * 1000);
    }
  
    buildImageUrl(id) {
      return `https://picsum.photos/id/${id}/${this.width}/${this.height}`;
    }
  }
  