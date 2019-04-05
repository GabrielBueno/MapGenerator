class Graphics {
	constructor(canvas_id = "canvas") {
		this.canvas = document.getElementById(canvas_id);

		this.canvas.width  = 1024;
		this.canvas.height = 666;

		this.ctx = canvas.getContext("2d");
	}

	/**
	* Draw a matrix in the canvas
	*
	* matrix (Array) is the matrix that will be drawn
	*/
	draw_matrix(matrix) {
		const canvas_width  = this.canvas.width;
		const canvas_height = this.canvas.height;

		const matrix_height = matrix.length;
		const tile_height   = canvas_height / matrix_height;

		this.clear();

		// console.log(matrix);

		for (let y = 0; y < matrix_height; y++) {
			const line_width = matrix[y].length;
			const tile_width = canvas_width / line_width;

			for (let x = 0; x < line_width; x++) {
				const tile = matrix[y][x];

				this.fill_rect(x * tile_width, y * tile_height, tile_width, tile_height, tile ? this.color_scheme.alive : this.color_scheme.dead);
			}
		}
	}

	/**
	* Fill a rect on some position on the canvas
	*
	* x (int) the x coordinate of the rect
	* y (int) the y coordinate of the rect
	* w (int) the width of the rect
	* h (int) the height of the rect
	*/
	fill_rect(x, y, w, h, color) {
		// console.log(`x: ${x} - y: ${y} - w: ${w} - h: ${h}`);

		const prev_color = this.ctx.fillStyle;

		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, w, h);

		this.ctx.fillStyle = prev_color;
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	get color_scheme() { return { alive: "#ffffff", dead: "#000000" }; }
}