var img = "LACCO-TOWER-.png";
var w = window.innerWidth;
var h = window.innerHeight;
var pumpkins = [];
var mouse = {};
var trails = false;

mouse.x = w / 2;
mouse.y = h / 2;

function random(min, max) {
		return (Math.random() * (max - min)) + min;
}

var stage = new PIXI.Container();



var renderer = PIXI.autoDetectRenderer(w, h, {
		// clearBeforeRender: false,
		preserveDrawingBuffer: true,
});


document.body.appendChild(renderer.view);

function setup() {
		for (var i = 0; i < 1000; i++) {
				(function(j) {
						setTimeout(function() {
								var texture = PIXI.Texture.fromImage(img);
								var pumpkin = new PIXI.Sprite(texture);

								pumpkin.anchor.x = 0.5;
								pumpkin.anchor.y = 0.5;
								pumpkin.vx = random(-3, 3);
								pumpkin.vy = random(-3, 3);
								pumpkin.vr = random(-3, 3) * .1;
								pumpkin.x = mouse.x;
								pumpkin.y = mouse.y
								pumpkin.oa = 1;
								var size = random(1, 100);

								pumpkin.scale.x = size * .01;
								pumpkin.scale.y = size * .01;

								pumpkins.push(pumpkin);

								stage.addChild(pumpkin);
						}, i * 20);
				})(i);
		}
}

function touches(e) {
	mouse.x = e.data.global.x;
	mouse.y = e.data.global.y;
}
function centerMouse(){
	mouse.x = w/2;
	mouse.y = h/2;
}
function toggleTrails(){
	if(trails){
		renderer.clearBeforeRender = true;
		trails = false;
	} else {
		renderer.clearBeforeRender = false;
		trails = true;
	}
}
stage.interactive = true;
stage.click = toggleTrails;
stage.mouseout = centerMouse;

stage.mousemove = stage.touchmove = touches;
window.addEventListener("resize", function() {
		w = window.innerWidth;
		h = window.innerHeight;
		renderer.resize(w, h);
		centerMouse();
});
function animate() {

		for (var i in pumpkins) {
				var p = pumpkins[i];
			
				if (p.x - p.width / 2 > w || 
						p.x + p.width / 2 < 0 || 
						p.y - p.height / 2 > h || 
						p.y + p.height / 2 < 0) {

						var size = random(1, 100);
						p.x = mouse.x;
						p.y = mouse.y;
						p.scale.x = size * .01;
						p.scale.y = size * .01;
						p.oa = 1;
				}
			
				p.x += p.vx;
				p.y += p.vy;
				p.rotation += p.vr;
				p.alpha = p.oa;
				
				p.scale.x = p.scale.x * .99;
				p.scale.y = p.scale.y * .99;
				p.oa -= .003;
				
			
		}

		renderer.render(stage);

		requestAnimationFrame(animate);
}

setup();
animate();