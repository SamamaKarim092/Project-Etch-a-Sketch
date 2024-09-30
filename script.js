// Function to create a grid of boxes
function createGrid(size) {
    const container = document.querySelector('.container'); // Select the container element
    container.innerHTML = ''; // Clear existing boxes in the container

    const boxSize = 700 / size; // Calculate the size of each box based on the grid size

    // Loop to create 'size * size' boxes
    for (let i = 0; i < size * size; i++) {
        const box = document.createElement('div'); // Create a new div element for each box
        box.classList.add('box'); // Add the 'box' class to the new div
        box.style.width = `${boxSize}px`; // Set the width of the box
        box.style.height = `${boxSize}px`; // Set the height of the box
        container.appendChild(box); // Append the box to the container

        // Initialize interaction count for each box
        let interactionCount = 0;

        // Function to generate a random color
        function getRandomColor() {
            // Generate a random number between 0 and 16777215 (the decimal equivalent of #FFFFFF)
            const randomColor = Math.floor(Math.random() * 16777215);
            
            // Convert the number to hexadecimal and pad it with zeros if necessary
            const hexColor = '#' + randomColor.toString(16).padStart(6, '0');
            
            return hexColor; // Return the random color in hexadecimal format
        }

        // Function to darken the color
        function darkenColor(color, amount) {
            // Convert hex to RGB
            let r = parseInt(color.slice(1, 3), 16);
            let g = parseInt(color.slice(3, 5), 16);
            let b = parseInt(color.slice(5, 7), 16);

            // Darken the color by reducing each RGB component
            r = Math.max(0, Math.floor(r * (1 - amount))); // Ensure RGB values do not go below 0
            g = Math.max(0, Math.floor(g * (1 - amount)));
            b = Math.max(0, Math.floor(b * (1 - amount)));

            // Convert back to hex
            return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        }

        // Event listener for mouse entering the box
        box.addEventListener('mouseenter', () => {
            if (interactionCount < 10) { // Limit interactions to 10
                // If the box has no background color, assign a random color
                const currentColor = box.style.backgroundColor || getRandomColor();
                
                // Convert currentColor from rgb or rgba to hex if necessary
                let hexColor;
                if (currentColor.startsWith('rgb')) {
                    // Convert rgb/rgba to hex
                    const rgb = currentColor.match(/\d+/g);
                    hexColor = `#${((1 << 24) + (parseInt(rgb[0]) << 16) + (parseInt(rgb[1]) << 8) + parseInt(rgb[2])).toString(16).slice(1)}`;
                } else {
                    hexColor = currentColor; // Use the hex color directly
                }

                const newColor = darkenColor(hexColor, 0.1); // Darken by 10%
                box.style.backgroundColor = newColor; // Update the box's background color
                interactionCount++; // Increment the interaction count
            }
        });
    }
}

// Event listener for the change-size button
document.querySelector('.change-size').addEventListener('click', () => {
    let input = prompt('Enter the size of the grid (1 - 100):'); // Prompt user for grid size
    let gridSize = parseInt(input); // Convert the input to an integer

    // Validate the input
    if (!isNaN(gridSize) && gridSize > 0 && gridSize <= 100) {
        createGrid(gridSize); // Create a new grid with the specified size
    } else {
        alert('Please enter a valid number between 1 and 100.'); // Alert the user if input is invalid
    }
});

// Create an initial grid of 16x16 when the script loads
createGrid(16);
