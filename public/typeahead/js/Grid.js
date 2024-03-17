class Grid {
    constructor(squareSize = 100) {
      this.squareSize = squareSize;
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.calculateDimensions();
      this.drawGrid();
      this.prependCanvasToBody();
      this.addResizeListener();
    }
  
    calculateDimensions() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.rows = Math.ceil(this.canvas.height / this.squareSize);
      this.cols = Math.ceil(this.canvas.width / this.squareSize);
    }
  
    drawGrid() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); 
      for(let x = 0; x <= this.canvas.width; x += this.squareSize) {
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvas.height);
      }
      for(let y = 0; y <= this.canvas.height; y += this.squareSize) {
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.canvas.width, y);
      }
      this.ctx.strokeStyle = "#ccc";
      this.ctx.stroke();
    }
  
    prependCanvasToBody() {
      this.canvas.style.position = 'fixed';
      this.canvas.style.zIndex = '-1';
      document.body.prepend(this.canvas);
    }
  
    addResizeListener() {
      window.addEventListener('resize', () => {
        this.calculateDimensions();
        this.drawGrid();
      });
    }
  }