// Encoding specification:
// http://www.barcodeisland.com/codabar.phtml

import Barcode from "../Barcode.js";

class codabar extends Barcode{
	constructor(data, options){
		if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
			data = "A" + data + "A";
		}

		super(data.toUpperCase(), options);

		this.text = this.options.text || this.text.replace(/[A-D]/g, '');
	}

	valid(){
		return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
	}

	encode(){
		var result = [];
		var encodings = this.getEncodings();
		for(var i = 0; i < this.data.length; i++){
			result.push(encodings[this.data.charAt(i)]);
			// for all characters except the last, append a narrow-space ("0")
			if (i !== this.data.length - 1) {
				result.push("0");
			}
		}
		return {
			text: this.text,
			data: result.join('')
		};
	}

	getEncodings(){
		return {
			"0": "10101000111",
			"1": "10101110001",
			"2": "10100010111",
			"3": "11100010101",
			"4": "10111010001",
			"5": "11101010001",
			"6": "10001010111",
			"7": "10001011101",
			"8": "10001110101",
			"9": "11101000101",
			"-": "10100011101",
			"$": "10111000101",
			":": "1110101110111",
			"/": "1110111010111",
			".": "1110111011101",
			"+": "1011101110111",
			"A": "1011100010001",
			"B": "1000100010111",
			"C": "1010001000111",
			"D": "1010001110001"
		};
	}
}

export {codabar};
