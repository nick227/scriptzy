// Create query string from filters object
const createQueryString = (filters) => {
  return Object.entries(filters)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

// Fetch image data from Unsplash
const fetchImageData = async (filters) => {
  const accessKey = '3juxXSYHxrGF1q5frnXYDzAgk2ONZezL8u7c0JSgGSA';
  const queryString = createQueryString(filters);
  const url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&${queryString}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

// Create and return an img element
const createImgElements = (imgUrls, props) => {
  return imgUrls.map(imgUrl => createSingleImgElement(imgUrl, props));
};

function createSingleImgElement(imgUrl, props) {
  const img = document.createElement('img');
  img.src = imgUrl;
  Object.assign(img, props);
  if (props.css) {
    Object.assign(img.style, props.css.default);
  }
  if (props.css.hover) {
    img.addEventListener('mouseover', () => Object.assign(img.style, props.css.hover));
    img.addEventListener('mouseout', () => Object.assign(img.style, props.css.default));
  }
  if (props.css.active) {
    img.addEventListener('mousedown', () => Object.assign(img.style, props.css.active));
    img.addEventListener('mouseup', () => Object.assign(img.style, props.css.default));
  }
  return img;
}

// Main function to request Unsplash image and create img element
async function requestUnsplashImage(filters, props) {
  try {
    const data = await fetchImageData(filters);
    const imgUrls = data.results.map(result => result.urls.small);
    return createImgElements(imgUrls, props);
  } catch (error) {
    console.error('Error fetching Unsplash image:', error);
    return null;
  }
}