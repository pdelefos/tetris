const canvas = document.getElementById('tetris')
const context = canvas.getContext('2d')

context.scale(20, 20)

const KEYCODE_LEFT = 37
const KEYCODE_RIGHT = 39
const KEYCODE_BOTTOM = 40

const matrix = [
	[0, 0, 0],
	[1, 1, 1],
	[0, 1, 0]
]

const player = {
	position: { x: 5, y: 5 },
	matrix: matrix,
	drop: () => {
		player.position.y++
		dropCounter = 0
	}
}

let lastTime = 0
let dropCounter = 0
let dropInterval = 1000
function update(time = 0) {
	const deltaTime = time - lastTime
	lastTime = time
	dropCounter += deltaTime

	if (dropCounter > dropInterval) {
		player.drop()
	}
	draw()
	requestAnimationFrame(update)
}

function draw() {
	clearCanvas()
	drawMatrix(player.matrix, player.position)
}

function clearCanvas() {
	context.fillStyle = '#000'
	context.fillRect(0, 0, canvas.width, canvas.height)
}

function drawMatrix(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				context.fillStyle = 'red'
				context.fillRect(x + offset.x, y + offset.y, 1, 1)
			}
		})
	})
}

document.addEventListener('keydown', evt => {
	switch (evt.keyCode) {
		case KEYCODE_LEFT:
			player.position.x--
			break;
		case KEYCODE_RIGHT:
			player.position.x++
			break;
		case KEYCODE_BOTTOM:
			player.drop()
			break;
		default:
			break;
	}
})

update()

// https://youtu.be/H2aW5V46khA?t=16m7s