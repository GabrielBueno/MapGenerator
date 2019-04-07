class Config {
	constructor(config_id) {
		this.config_elem = document.getElementById(config_id);

		this.bind_inputs();
	}

	bind_inputs() {
		const inputs = this.config_elem.getElementsByTagName("input");

		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].id == "width")
				this.width_input = inputs[i];

			if (inputs[i].id == "height")
				this.height_input = inputs[i];

			if (inputs[i].id == "iterations")
				this.iterations_inputs = inputs[i];
		}

		this.check_errors();
	}

	check_errors() {
		if (!this.width_input)
			console.log("Could not localize the width input");

		if (!this.height_input)
			console.log("Could not localize the height input");

		if (!this.iterations_inputs)
			console.log("Could not localize the iterations input");
	}

	get width() {
		return this.width_input.value;
	}

	get height() {
		return this.height_input.value;
	}

	get iterations() {
		return this.iterations_inputs.value;
	}
}