function setupToggleButtons(){
    
    const toggleElements = document.querySelectorAll('.toggle');

    toggleElements.forEach(function(toggleElement) {
        toggleElement.addEventListener('click', function() {
            
            const targetClass = this.getAttribute('data-target');
            const targetElement = document.querySelector(targetClass);

            if (targetElement) {
                targetElement.classList.toggle('hidden');
            }
        });
    });
}