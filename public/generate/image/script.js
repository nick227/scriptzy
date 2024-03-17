document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("imageRequestForm");
  const loadingElement = document.querySelector(".loading-img");

  form.addEventListener("submit", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    toggleLoading(true);

    const promptInput = getPromptInput();
    const selectedType = getSelectedType();

    if (!validateInput(promptInput)) {
      toggleLoading(false);
      alert("Please fill in the prompt field.");
      return;
    }

    performImageFetch(promptInput, selectedType)
      .then(appendImageToBody)
      .catch(handleFetchError)
      .finally(() => toggleLoading(false));
  }

  function getPromptInput() {
    return document.getElementById("promptInput").value.trim();
  }

  function getSelectedType() {
    const typeInput = document.querySelector('input[name="type"]:checked');
    return typeInput ? typeInput.value : "";
  }

  function validateInput(promptInput) {
    return !!promptInput; // Ensure promptInput is not empty
  }

  function performImageFetch(promptInput, selectedType) {
    let url = `/api/chatgpt/image?prompt=${encodeURIComponent(promptInput)}`;
    if (selectedType) {
      url += `&type=${encodeURIComponent(selectedType)}`;
    }
    return fetch(url)
      .then(handleResponse)
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        }
        return data;
      });
  }

  function handleResponse(response) {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  }

  function appendImageToBody(data) {
    const img = new Image();
    img.src = `data:image/png;base64,${data.b64JsonString}`;
    document.body.appendChild(img);
  }

  function handleFetchError(error) {
    console.error("Error:", error);
    alert(error.message);
  }

  function toggleLoading(show) {
    loadingElement.classList.toggle("hidden", !show);
  }
});
