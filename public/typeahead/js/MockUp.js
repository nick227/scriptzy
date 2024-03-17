class MockUp {
  constructor(key) {
    this.configs = {
      basic: [
        { color: "#FFA07A", x: 0, y: 0, width: "100%", height: "10%" },
        { color: "#FAEBD7", x: 0, y: "10%", width: "20%", height: "80%" },
        { color: "#E6E6FA", x: "20%", y: "10%", width: "80%", height: "80%" },
        { color: "#F0E68C", x: "25%", y: "15%", width: "30%", height: "25%" },
        { color: "#F0FFF0", x: "60%", y: "15%", width: "20%", height: "25%" },
        { color: "#98FB98", x: "25%", y: "50%", width: "15%", height: "10%" },
        { color: "#FFDEAD", x: 0, y: "90%", width: "100%", height: "10%" }
      ],
      altRows: [
        { color: "#E6E6FA", x: "20%", y: "0%", width: "60%", height: "50%" },
        { color: "#cccccc", x: "20%", y: "20%", width: "30%", height: "50%" },
        { color: "#cccccc", x: "50%", y: "20%", width: "30%", height: "50%" },
        { color: "#cccccc", x: "20%", y: "50%", width: "60%", height: "25%" },
        { color: "#E6E6FA", x: "20%", y: "75%", width: "60%", height: "25%" }
        /*
        { color: "#E6E6FA", x: "20%", y: "30%", width: "60%", height: "10%" },
        { color: "#F0E68C", x: "20%", y: "40%", width: "30%", height: "10%" },
        { color: "#FFDEAD", x: "50%", y: "40%", width: "30%", height: "10%" }
        */
      ],
      advanced: [
        { type: 'image', url: 'https://placehold.co/600x400', x: "10%", y: "10%", width: "30%", height: "20%" },
        { type: 'text', text: 'Headline', fontSize: 32, color: "#000", x: "50%", y: "15%" },
        { type: 'text', text: 'Paragraph', fontSize: 16, color: "#666", x: "50%", y: "25%" }
      ],
      fullScreen3: [
        { type: 'rectangle', color: "#FFA07A", x: 0, y: 0, width: "100%", height: "10%" },
        { type: 'image', url: 'https://placehold.co/600x400', x: "0%", y: "20%", width: "100%", height: "30%" },
        { type: 'text', text: 'Lorem Ipsum', fontSize: 32, color: "#333", x: "25%", y: "55%", fontFamily: "Helvetica, Arial, sans-serif" },
        { type: 'text', text: 'Dolor sit amet', fontSize: 18, color: "#666", x: "25%", y: "60%", fontFamily: "Georgia, serif" },
        { type: 'rectangle', color: "#F0FFF0", x: "0%", y: "70%", width: "50%", height: "15%" },
        { type: 'rectangle', color: "#F0FFF0", x: "50%", y: "70%", width: "50%", height: "15%" },
        { type: 'rectangle', color: "#F0E68C", x: "0%", y: "85%", width: "100%", height: "15%" }
      ], fullScreen: [
        // Long header at top
        { type: 'rectangle', color: "#FFA07A", x: 0, y: 0, width: "100%", height: "10%" },
        // Padding row
        { type: 'rectangle', color: "#FAEBD7", x: 0, y: "10%", width: "100%", height: "5%" },
        // Hero image with main heading
        { type: 'image', url: 'https://placehold.co/1200x600', x: "0%", y: "15%", width: "100%", height: "25%" },
        // Padding row
        { type: 'rectangle', color: "#E6E6FA", x: 0, y: "40%", width: "100%", height: "5%" },
        // 2/3 column with image on left and text on right
        { type: 'rectangle', x: "0%", y: "45%", width: "40%", height: "20%" },
        // Padding row
        { type: 'rectangle', color: "#E6E6FA", x: 0, y: "65%", width: "100%", height: "5%" },
        // 2/3 column with text on left and image on right
        { type: 'rectangle', x: "60%", y: "70%", width: "40%", height: "20%" },
        // Padding row
        { type: 'rectangle', color: "#FAEBD7", x: 0, y: "90%", width: "100%", height: "10%" },
      ], blackAndWhite: [
        // White background
        { type: 'rectangle', color: "#FFFFFF", x: 0, y: 0, width: "100%", height: "100%" },
        // Black horizontal lines (repeating pattern)
        { type: 'rectangle', color: "#000000", x: 0, y: "10%", width: "60%", height: "1%" },
        { type: 'rectangle', color: "#000000", x: 0, y: "20%", width: "60%", height: "1%" },
        { type: 'rectangle', color: "#000000", x: 0, y: "30%", width: "60%", height: "1%" },
        // Placeholder images (repeating pattern)
        { type: 'image', url: 'https://placehold.co/600x400', x: "0%", y: "12%", width: "60%", height: "8%" },
        { type: 'image', url: 'https://placehold.co/600x400', x: "0%", y: "22%", width: "60%", height: "8%" },
        { type: 'image', url: 'https://placehold.co/600x400', x: "0%", y: "32%", width: "60%", height: "8%" },
      ],
      transparentAndBorders: [
        { type: 'rectangle', color: "transparent", borderColor: "", borderWidth: 2, x: 0, y: 0, width: "100%", height: "10%" },
        { type: 'rectangle', color: "transparent", borderColor: "", borderWidth: 2, x: 0, y: "10%", width: "100%", height: "10%" },
        { type: 'image', url: 'https://placehold.co/600x400', x: "10%", y: "12%", width: "80%", height: "8%" },
        { type: 'rectangle', color: "transparent", borderColor: "", borderWidth: 2, x: 0, y: "20%", width: "100%", height: "20%" },
        { type: 'image', url: 'https://placehold.co/600x400', x: "10%", y: "22%", width: "80%", height: "18%" },
        { type: 'rectangle', color: "transparent", borderColor: "", borderWidth: 2, x: 0, y: "40%", width: "100%", height: "20%" },
        { type: 'image', url: 'https://placehold.co/600x400', x: "10%", y: "42%", width: "80%", height: "18%" },
        { type: 'rectangle', color: "transparent", borderColor: "", borderWidth: 2, x: 0, y: "60%", width: "100%", height: "20%" },
        { type: 'image', url: 'https://placehold.co/600x400', x: "10%", y: "62%", width: "80%", height: "18%" },
        { type: 'rectangle', color: "transparent", borderColor: "", borderWidth: 2, x: 0, y: "80%", width: "100%", height: "20%" },
        { type: 'image', url: 'https://placehold.co/600x400', x: "10%", y: "82%", width: "80%", height: "18%" },
      ],
      polished: [
        { color: "#cccccc", x: 0, y: 0, width: "100%", height: "100px" },
        // Row 1: 33% height
        { color: "transparent", borderColor: "", borderWidth: 2, x: 0, y: 0, width: "100%", height: "33%" },
        // Combined Column 1 & 2 with Image
        // Vertical Line 1 (repositioned)
        { color: "transparent", borderColor: "", borderWidth: 2, x: "50%", y: 0, width: "1%", height: "100%" },

        // Row 2: 33% height
        { color: "transparent", borderColor: "", borderWidth: 2, x: 0, y: "33%", width: "100%", height: "33%" },
        { type: 'image', url: 'https://placehold.co/600x400', x: "28%", y: "35%", width: "21%", height: "29%" },
        // Vertical Line 2 (remains same)
        { color: "transparent", borderColor: "", borderWidth: 2, x: "50%", y: 0, width: "1%", height: "100%" },
        // Image in Column 2
        { type: 'image', url: 'https://placehold.co/600x400', x: "52%", y: "35%", width: "21%", height: "29%" },

        // Row 3: 33% height
        { color: "transparent", borderColor: "", borderWidth: 2, x: 0, y: "66%", width: "100%", height: "33%" },
        // Vertical Line 3 (newly added)
        { color: "transparent", borderColor: "", borderWidth: 2, x: "50%", y: 0, width: "1%", height: "100%" },
        { color: "#cccccc", x: 0, y: "90%", width: "100%", height: "100px" },
      ]
    };

    this.config = this.configs[key];
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'mockup';
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.render();
  }
  async render() {
    if (!this.config) return;
    for (const config of this.config) {  // Loop through the array directly
      if (config.type === 'image') {
        await this.drawImage(config);
      } else if (config.type === 'text') {
        this.drawText(config);
      } else {
        this.drawRect(config);
      }
    }
  }

  drawRect({ color, x, y, width, height, borderColor, borderWidth }) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.calculateDimension(x, 'width'),
      this.calculateDimension(y, 'height'),
      this.calculateDimension(width, 'width'),
      this.calculateDimension(height, 'height')
    );

    if (borderColor && borderWidth) {
      this.ctx.strokeStyle = borderColor;
      this.ctx.lineWidth = borderWidth;
      this.ctx.strokeRect(
        this.calculateDimension(x, 'width'),
        this.calculateDimension(y, 'height'),
        this.calculateDimension(width, 'width'),
        this.calculateDimension(height, 'height')
      );
    }
  }

  calculateDimension(value, type) {
    if (typeof value === 'string' && value.endsWith('%')) {
      const percent = parseFloat(value);
      return (percent / 100) * (type === 'width' ? this.canvas.width : this.canvas.height);
    }
    return value;
  }

  async drawImage({ url, x, y, width, height }) {
    const img = new Image();
    img.src = url;
    await new Promise(resolve => img.onload = resolve);
    this.ctx.drawImage(
      img,
      this.calculateDimension(x, 'width'),
      this.calculateDimension(y, 'height'),
      this.calculateDimension(width, 'width'),
      this.calculateDimension(height, 'height')
    );
  }

  drawText({ text, fontSize, color, x, y }) {
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.fillStyle = color;
    this.ctx.fillText(
      text,
      this.calculateDimension(x, 'width'),
      this.calculateDimension(y, 'height')
    );
  }
}
