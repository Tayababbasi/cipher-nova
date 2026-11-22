// 1. Grabbing the elements we need from the page
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll("#topicGrid .card");
const noResults = document.getElementById("noResults");
const resetButton = document.getElementById("resetFiltersBtn");

// 2. which category is selected right now
let selectedCategory = "all";

// 3. Main function: show or hide each card
function filterCards() {
  const searchText = searchInput.value.toLowerCase().trim();
  let visibleCount = 0;

  cards.forEach(function (card) {
    const category = card.dataset.category;
    const cardText = (card.textContent + " " + card.dataset.keywords).toLowerCase();

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;
    const matchesSearch = cardText.includes(searchText);

    if (matchesCategory && matchesSearch) {
      card.hidden = false;
      visibleCount++;
    } else {
      card.hidden = true;
    }
  });

  // "No Matching Topics" 
  noResults.hidden = visibleCount > 0;
}

// 4. highlight one button, un-highlight the rest
function setActiveButton(activeButton) {
  filterButtons.forEach(function (button) {
    button.classList.remove("active");
    button.setAttribute("aria-pressed", "false");
  });
  activeButton.classList.add("active");
  activeButton.setAttribute("aria-pressed", "true");
}

// 5. Typing in the search box filters instantly
searchInput.addEventListener("input", filterCards);

// 6. Clicking a category button
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedCategory = button.dataset.category;
    setActiveButton(button);
    filterCards();
  });
});

// 7. Reset Filters button
resetButton.addEventListener("click", function () {
  searchInput.value = "";
  selectedCategory = "all";
  setActiveButton(filterButtons[0]); // the "All Topics" button
  filterCards();
  searchInput.focus();
});