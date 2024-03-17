document.addEventListener("DOMContentLoaded", () => {
	const typeaheadElement = document.getElementById("typeahead");
	new Dropdown(typeaheadElement, suggestionsArray, relatedTermObject);
	new Typeahead(typeaheadElement, suggestionsArray);
  });