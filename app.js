const gridWidth = 10;
const gridHeight = 10;
const gameContainer = document.getElementById("game");

const grid = [];

// Initialize grid with empty cells
for (let y = 0; y < gridHeight; y++) {
	grid[y] = [];
	for (let x = 0; x < gridWidth; x++) {
		grid[y][x] = ".";
	}
}

// Place some walls randomly
for (let i = 0; i < 20; i++) {
	const wallX = Math.floor(Math.random() * gridWidth);
	const wallY = Math.floor(Math.random() * gridHeight);
	grid[wallY][wallX] = "#";
}

// Player position and emoji
let playerX = 0;
let playerY = 0;
let playerEmoji = "👻";

// Ensure player starts on an empty cell
while (grid[playerY][playerX] === "#") {
	playerX = Math.floor(Math.random() * gridWidth);
	playerY = Math.floor(Math.random() * gridHeight);
}

// Place pumpkin on a random empty cell
let pumpkinX = 0;
let pumpkinY = 0;

do {
	pumpkinX = Math.floor(Math.random() * gridWidth);
	pumpkinY = Math.floor(Math.random() * gridHeight);
} while (
	grid[pumpkinY][pumpkinX] === "#" ||
	(pumpkinX === playerX && pumpkinY === playerY)
);

function renderGrid() {
	gameContainer.innerHTML = "";
	for (let y = 0; y < gridHeight; y++) {
		const rowDiv = document.createElement("div");
		rowDiv.className = "row";
		for (let x = 0; x < gridWidth; x++) {
			const cellDiv = document.createElement("div");
			cellDiv.className = "cell";
			if (grid[y][x] === "#") {
				cellDiv.classList.add("wall");
			}
			if (x === pumpkinX && y === pumpkinY && !(x === playerX && y === playerY)) {
				cellDiv.innerText = "🎃";
			}
			if (x === playerX && y === playerY) {
				cellDiv.innerText = playerEmoji;
				cellDiv.classList.add("player"); // Added this line
			}
			rowDiv.appendChild(cellDiv);
		}
		gameContainer.appendChild(rowDiv);
	}
}

function movePlayer(dx, dy) {
	const newX = playerX + dx;
	const newY = playerY + dy;

	// Check boundaries
	if (newX < 0 || newX >= gridWidth || newY < 0 || newY >= gridHeight) {
		return;
	}

	// Check for walls
	if (grid[newY][newX] === "#") {
		return;
	}

	playerX = newX;
	playerY = newY;

	// Check if player has collided with the pumpkin
	if (playerX === pumpkinX && playerY === pumpkinY) {
		playerEmoji = "🎃";
		// Remove the pumpkin after collection
		pumpkinX = -1;
		pumpkinY = -1;
	}

	renderGrid();
}

document
	.getElementById("up")
	.addEventListener("click", () => movePlayer(0, -1));
document
	.getElementById("down")
	.addEventListener("click", () => movePlayer(0, 1));
document
	.getElementById("left")
	.addEventListener("click", () => movePlayer(-1, 0));
document
	.getElementById("right")
	.addEventListener("click", () => movePlayer(1, 0));

renderGrid();
