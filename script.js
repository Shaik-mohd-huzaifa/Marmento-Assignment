async function fetchData() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    
    const data = await response.json();
    displayProduct(data.product);
    // ErrorDisplay(false);
    // ErrorDisplay();
    const ErrorDisplay = document.querySelector('.ErrorDisplay');
    ErrorDisplay.style.visiblity = 'visible';
  } catch (error) {
    console.log("There was a problem with the fetch operation:", error);
  }
}

// Func to Assign the Values to the HTML elements
function displayProduct(product) {
  // Storing Product Description Related Elements
  const productNameElement = document.getElementById("product-name");
  const productImgElement = document.getElementById("img");
  const Description = document.getElementById("Description");

  // This Func Will Create all the Options
  OptionAssignments(product.options);

  // Product Description
  productNameElement.textContent = `${product.title}`;
  document.getElementById("Product-Vendor").textContent = `${product.vendor}`;
  Description.innerHTML = product.description;

  // Price Values Alloted to the HTML elements
  document.getElementById("Price").textContent = "$19999.00";
  document.getElementById("Compare-Price").textContent = `$12999.00`;
  document.getElementById("Percentage-Off").textContent = `35%`;

  // Description Sections
}

const OptionAssignments = (Options = []) => {
  const [colors, sizes] = [...Options];
  const ColorSelector = document.getElementById("ColorSelector");
  const SizeSelector = document.getElementById("SizeSelector");

  for (let i = 0; i < colors.values.length; i++) {
    const color = colors.values[i];
    // Creates a empty Div
    const colorBox = document.createElement("div");

    // Sets the ClassName of the Above Div.
    if (i === 0) {
      colorBox.className = "colorOptions active";
    } else {
      colorBox.className = "colorOptions";
    }
    colorBox.id = `${Object.values(color)[0]}`;

    // Sets the Background Color
    colorBox.style.backgroundColor = `${Object.values(color)[0]}`;

    // Setting the outline Color
    colorBox.style.outlineColor = `${Object.values(color)[0]}`;

    // Appends that Div to the Color Selector Div
    ColorSelector.append(colorBox);
  }

  for (let option of sizes.values) {
    const radioContainer = document.createElement("div");
    const radioButton = document.createElement("input");

    radioContainer.className = "radio-container";
    radioContainer.id = `${option}`;
    // Set type attribute to radio
    radioButton.setAttribute("type", "radio");

    // Set name attribute to group the radio buttons together
    radioButton.setAttribute("name", "sizes");

    // Set value attribute to the option value
    radioButton.setAttribute("value", option);

    // Set id attribute to uniquely identify each radio button
    radioButton.setAttribute("id", option);

    // Create a label element for the radio button
    const label = document.createElement("label");

    // Set label's for attribute to match radio button's id
    label.setAttribute("for", option);

    // Set label's text content to the option text
    label.textContent = option;

    // Append the radio button and label to the radioContainer
    radioContainer.appendChild(radioButton);
    radioContainer.appendChild(label);

    // Appends the RadioContainer to the Size Selector
    SizeSelector.appendChild(radioContainer);
  }

  // Highlighting particular option when selected in sizes
  const radioButtons = document.querySelectorAll(".radio-container");
  for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener("click", () => {
      for (let j = 0; j < radioButtons.length; j++) {
        radioButtons[j].classList.remove("active");
      }
      const radio = radioButtons[i].querySelector('input[type="radio"]');
      radio.click();
      radioButtons[i].classList.add("active");
    });
  }

  // Highlighting particular option when selected in colors
  const colorsContainers = document.querySelectorAll(".colorOptions");
  for (let color of colorsContainers) {
    color.addEventListener("click", () => {
      for (let i = 0; i < colorsContainers.length; i++) {
        colorsContainers[i].classList.remove("active");
      }
      color.classList.add("active");
    });
  }
};

// Increment and Decrement Mechanism
const Increment = document.getElementById("increment");
const Decrement = document.getElementById("decrement");
const Value = document.getElementById("quantity");
let defaultValue = 1;

Value.innerText = defaultValue;

Increment.addEventListener("click", () => {
  defaultValue++;
  Value.innerText = defaultValue;
});

Decrement.addEventListener("click", () => {
  if (defaultValue === 0) {
    Decrement.disabled = True;
  } else {
    defaultValue--;
    Value.innerText = defaultValue;
  }
});


function ErrorDisplay(){

}

fetchData();

