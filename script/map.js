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
	}

	/**
	* Gets the tile in the map located at the specified coordinates
	*
	* x (int) the x coordinate to be looked at in the map
	* y (int) the y coordinate to be looked at in the map
	*
	* returns (int) the tile at the specified coordinates
	*/
	tile_at(x, y) {

	}

	/**
	* Gets the array that represents the map
	*
	* returns (array) the array that represents the map
	*/
	to_array() {

	}

	/**
	* Fills randomly the map with the possible tiles
	*
	* returns nothing
	*/
	init_with_random() {
		return null;
	}

	/**
	* Iterates over all tiles on the map, applying the rules necessary to generate procedurally the cave
	*
	* returns nothing
	*/
	iterate() {
		return null;
	}

	static get tiles() { 
		return { ground: 0, wall: 1 }; 
	}

	/**
	* Generates the cave procedurally, initiating from a random map, iterating over it a specified number of times
	*
	* width  (int) the number of tiles in the x axis
	* height (int) the number of tiles in the y axis 
	* steps  (int) the number of times to iterate over the map
	*
	* returns (Map) the map object generated
	*/
	static generate(width = 100, height = 100, steps = 5) {
		const map = new Map(width, height);

		map.init_with_random();

		for (let i = 0; i < steps; i++)
			map.iterate();
	}
}