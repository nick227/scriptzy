class IdeaWidget {
  constructor(title, ideas) {
    this.ideas = ideas;
    this.title = title;
    this.containerElm = document.querySelector('div.form-ideas');
    this.ulElement = document.querySelector('div.form-ideas ul');
    this.titleElement = document.querySelector('div.form-ideas h3');

    if (!this.ulElement) {
      throw new Error(`Target ul element not found inside ${targetSelector}`);
    }

    this.init();
  }

  async init() {
    this.titleElement.innerHTML = this.title;
    this.ulElement.innerHTML = '';
    this.ideas.forEach(idea => {
      const liItem = this.generateLiItem(idea);
      this.ulElement.appendChild(liItem);
    });
    const img = this.containerElm.querySelector("img");
    new ImageReloader(img, 5200, 200, 200);
    
    const section2 = document.querySelector('.section-2');
    await setTimeout(() => section2.classList.toggle('hidden'), 1000);
  }

  generateLiItem(idea) {
    const li = document.createElement('li');
    const h3 = document.createElement('h4');
    const p = document.createElement('p');

    h3.textContent = idea.name;
    p.textContent = idea.tips;

    li.appendChild(h3);
    li.appendChild(p);

    return li;
  }

  attachLiItems() {
    this.init();
  }
}