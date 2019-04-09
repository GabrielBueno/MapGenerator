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

	is_offbounds(x, y) {
		return y == 0 || y == this.height - 1 || x == 0 || x == this.width - 1;
	}

	/**
	* Gets the number of walls that are neighbors (vertically, horizontally and diagonally) of the tile located at the specified coordinates
	*
	* x (int) the x coordinate to be looked at in the map
	* y (int) the y coordinate to be looked at in the map
	*
	* returns (int) the number of walls that are neighbors of the tile located at the specified coordinates
	*/
	wall_neighbors_of(x, y) {
		let walls = 0;

		for (let offset_y = -1; offset_y <= 1; offset_y++) {
			for (let offset_x = -1; offset_x <= 1; offset_x++) {
				if (offset_x == 0 && offset_y == 0)
					continue;

				const target_x = x + offset_x;
				const target_y = y + offset_y;

				if (target_y < 0 || target_y >= this.map_array.length)
					walls++;

				else if (target_x < 0 || target_x >= this.map_array[target_y].length)
					walls++;

				else if (this.map_array[y + offset_y][x + offset_x])
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
				if (this.is_offbounds(x, y)) {
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
		const next_map = [];

		for (let y = 0; y < this.height; y++) {
			next_map[y] = [];

			for (let x = 0; x < this.width; x++) {
				const walls = this.wall_neighbors_of(x, y);

				if (this.map_array[y][x]) {
					next_map[y][x] = walls >= 4;
				} else {
					next_map[y][x] = walls >= 5;
				}
			}
		}

		this.map_array = next_map;
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
		const map = new Map(width, height);

		map.init_with_random();

		for (let i = 0; i < steps; i++)
			map.iterate();

		return map;
	}
}