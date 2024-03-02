// Obtendo a referência para a div painel2D
var painel2D = document.getElementById('painel2D');

// Obtendo as dimensões da div pai
var width = painel2D.offsetWidth;
var height = painel2D.offsetHeight;

// Obtendo o canvas e definindo seu tamanho
var canvas = document.getElementById('canvas');
canvas.width = width;
canvas.height = height;

// Agora você pode desenhar no canvas com as dimensões corretas