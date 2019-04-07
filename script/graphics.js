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

		this.ctx.fillStyle = color;
		this.ctx.fillRect(x, y, w, h);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	begin_progress_animation() {
		this.do_progress_animation();
	}

	end_progress_animation() {
		if (this.currentAnimation)
			clearInterval(this.currentAnimation);
	}

	do_progress_animation() {
		const ellipse = {
			radius: 50,
			start_angle: 0,
			end_angle: 0,
			odd: false,

			centered_x(container_w) { 
				return (container_w / 2) - (this.radius / 2) 
			},

			centered_y(container_y) { 
				return (container_y / 2) - (this.radius / 2) 
			},

			progress(offset=10) {
				this.end_angle += offset;

				if (this.end_angle >= 360)
					this.odd = !this.odd;

				this.end_angle = this.end_angle % 360;

				return (Math.PI/180) * this.end_angle;
			} 
		};

		const draw_frame = () => {
			// this.clear();

			const radius = 50;

			this.ctx.lineWidth = 3;
			// this.ctx.strokeStyle = ellipse.odd ? "#c4154c" : "#f41d61";
			this.ctx.strokeStyle = ellipse.odd ? "#000000" : "#ffffff";
			this.ctx.lineWidth = ellipse.odd ? 5 : 3;

			this.ctx.beginPath();
			this.ctx.ellipse(
				ellipse.centered_x(this.canvas.width), 
				ellipse.centered_y(this.canvas.height), 
				ellipse.radius, 
				ellipse.radius, 
				0, 
				0, 
				ellipse.progress()
			);
			this.ctx.stroke();
		};

		this.currentAnimation = window.setInterval(draw_frame, 1);
	}

	get color_scheme() { return { alive: "#ffffff", dead: "#000000" }; }
}