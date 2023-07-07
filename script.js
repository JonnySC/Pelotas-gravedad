window.requestAnimationFrame = (function(callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();
class pelota{
	/*
	contructor: 
	r = Radio
	x = Posicion en X
	y = posicion en Y
	vx = Velocidad en X
	vy = Velocidad en Y
	p = Peso
	c = Color
	*/
	constructor(r, x, y, vx, vy, rest, c){
		this.r = (typeof r === 'undefined') ? AleatorioEntre(20,60) : r;
		this.x = (typeof x === 'undefined') ? (Math.floor((Math.random() * (ctx.canvas.width - (this.r * 2))) + 1)) + this.r : x;
		this.y = (typeof y === 'undefined') ? 0 : y;
		this.vx = (typeof vx === 'undefined') ? 0 : vx;
		this.vy = (typeof vy === 'undefined') ? 0 : vy;
		//this.rest = (typeof rest === 'undefined') ? (1 - Math.random()) * -1 : rest;//Restitucion
		this.rest = (typeof rest === 'undefined') ? (AleatorioEntre(0.6,1)) * -1 : rest;//Restitucion
		this.c = (typeof c === 'undefined') ? ColorAleatorio() : c;
	}
	//Dibujar pelota
	dibujar(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
		ctx.fillStyle = this.c;
		ctx.fill();
	}
}
////Variables
var canvas = document.getElementById("canvas");
var ctx =  canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var AnimacionId;
var UltimoTiempo;
var gravedad = 9.8/60;
var fps;
var pausa = false;
var npelotas = 100;
var pelotas = new Array();

for (var i = 0; i < npelotas; i++) {
	pelotas.push(new pelota());
	console.log(pelotas[i]);
}

AnimacionId = requestAnimationFrame(main);
function main() {
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;	
	actualizar();
	dibujar();
	if(!pausa){AnimacionId = requestAnimationFrame(main)};
}
function actualizar (argument) {
	contadorFPS();
	for (var i = 0; i < pelotas.length; i++) {
		pelotas[i].vy += gravedad;
		pelotas[i].x += pelotas[i].vx;
		pelotas[i].y += pelotas[i].vy;
		if (((pelotas[i].y+pelotas[i].vy)+pelotas[i].r) > ctx.canvas.height) {
			//pausa = true;
			pelotas[i].y = ctx.canvas.height - pelotas[i].r;
			pelotas[i].vy *= pelotas[i].rest;
		} else {
			// statement
		}	
	}
}
function dibujar (argument) {
	mostrarFPS();
	for (var i = 0; i < pelotas.length; i++) {
		pelotas[i].dibujar(ctx);
	}
}
/////////////////////
function contadorFPS() {		
	if(!UltimoTiempo) {
		UltimoTiempo = Date.now();
		fps = 0;
		return;
	}
	delta = (Date.now() - UltimoTiempo)/1000;
	UltimoTiempo = Date.now();
	fps = 1/delta;
}
////////////////////
function mostrarFPS(){
	ctx.fillStyle = "Black";
	ctx.font      = "normal 16pt Arial";
	ctx.fillText(Math.floor(fps) + " fps", 10, 26);
}
///////////////////
function ColorAleatorio() {
    var letras = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letras[Math.floor(Math.random() * 16)];
    }
    return color;
}
//////
function AleatorioEntre(min, max) {
    return Math.random() * (max - min) + min;
}