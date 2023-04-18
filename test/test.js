// Import the assert module
const assert = require('assert');

//The navigator object is typically only available in a browser environment, 
//which means that it may not be available when running your script through Mocha in a 
//Node.js environment. 
//This is likely why you are seeing the error TypeError: 
//Cannot read properties of undefined (reading 'userAgent') when running your Mocha tests.

//To fix this error, you can mock the navigator object in your test file using a library like jsdom. 
//jsdom is a library that allows you to simulate a browser environment in Node.js.
//Import the jsdom module
const jsdom = require('jsdom');
const { JSDOM } = jsdom;


// Load your script file using JSDOM
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
	<head>
	  <link rel="stylesheet" href="style.css">
	</head>

	<body>
		<canvas id ="canvas"></canvas>
	</body>
	
	<script src="script.js"></script>
</html>
`);
global.window = dom.window;
global.document = dom.window.document;
global.canvas = dom.window.document.querySelector("canvas");
global.context = canvas.getContext('2d');
//pong.context = context;
global.navigator = dom.window.navigator;

// Import the script.js file
const { Pong } = require('../script.js');

// Describe the test suite
describe('Pong', function () {
    describe('#initialize()', function () {
        it('should set canvas width and height to 1400 and 1000 respectively', function () {
            Pong.initialize();
            assert.equal(Pong.canvas.width, 1400);
            assert.equal(Pong.canvas.height, 1000);
        });

    });
});