class Map {
	/**
	* Map's constructor
	*
	* width  (int) the number of tiles in the x axis
	* height (int) the number of tiles in the y axis
	*/
	constructor(width, height) {
		this.width  = width;
		this.height = height;

		this.map_array = [];
	}

	/**
	* Gets the number of walls that are neighbors (vertically, horizontally and diagonally) of the tile located at the specified coordinates
	*
	* x (int) the x coordinate to be looked at in the map
	* y (int) the y coordinate to be looked at in the map
	*
	* returns (int) the number of walls that are neighbors of the tile located at the specified coordinates
	*/
	wall_neighbors_of(x, y, matrix=this.map_array) {
		let walls = 0;

		//console.log(this.matrix);

		for (let offset_y = -1; offset_y <= 1; offset_y++) {
			for (let offset_x = -1; offset_x <= 1; offset_x++) {
				if (offset_x == 0 && offset_y == 0)
					continue;

				const target_x = x + offset_x;
				const target_y = y + offset_y;

				if (target_y < 0 || target_y >= matrix.length)
					walls++;

				else if (target_x < 0 || target_x >= matrix[target_y].length)
					walls++;

				else if (matrix[y + offset_y][x + offset_x])
					walls++;
			}
		}

		return walls;
	}

	/**
	* Gets the array that represents the map
	*
	* returns (array) the array that represents the map
	*/
	get matrix() {
		return this.map_array;
	}

	/**
	* Fills randomly the map with the possible tiles
	*
	* wall_probability (int) the probability (in %) of a tile to become a wall
	*
	* returns nothing
	*/
	init_with_random(wall_probability = 45) {
		const prob = wall_probability / 100;

		for (let y = 0; y < this.height; y++) {
			this.map_array[y] = [];

			for (let x = 0; x < this.width; x++) {
				if (y == 0 || y == this.height - 1 || x == 0 || x == this.width - 1) {
					this.map_array[y][x] = true;
					continue;
				}

				this.map_array[y][x] = Math.random() <= prob;
			}
		}
	}

	/**
	* Iterates over all tiles on the map, applying the rules necessary to generate procedurally the cave
	*
	* returns nothing
	*/
	iterate() {
		const prev_map = this.map_array.slice(0);

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				const walls = this.wall_neighbors_of(x, y, prev_map);

				// console.log(`x: ${x} - y: ${y} - walls: ${walls}`);

				if (prev_map[y][x])
					this.map_array[y][x] = walls >= 4;
				else
					this.map_array[y][x] = walls >= 5;
			}
		}
	}

	/**
	* Generates the cave procedurally, initiating from a random map, iterating over it a specified number of times
	*
	* width  (int) the number of tiles in the x axis
	* height (int) the number of tiles in the y axis 
	* steps  (int) the number of times to iterate over the map
	*
	* returns (Promise) a promise that the map will be generated, giving the object generated
	*/
	static generate(width = 100, height = 100, steps = 5) {
		return new Promise((resolve, reject) => {
			const map = new Map(width, height);

			map.init_with_random();

			for (let i = 0; i < steps; i++)
				map.iterate();

			resolve(map);
		});
	}
}