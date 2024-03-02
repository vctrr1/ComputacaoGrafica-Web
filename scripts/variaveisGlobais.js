// Obtendo a referência para o div painel2D
var painel2D = document.querySelector('.painel2D');

// Obtendo o canvas dentro do div painel2D e definindo seu contexto de desenho
var canvas = painel2D.querySelector('canvas');
var ctx = canvas.getContext('2d');

// Obtendo as dimensões do div pai
var largura = parseFloat(painel2D.offsetWidth).toFixed(4);
var altura = parseFloat(painel2D.offsetHeight).toFixed(4);

// Configurando as dimensões do canvas
canvas.width = largura;
canvas.height = altura;
