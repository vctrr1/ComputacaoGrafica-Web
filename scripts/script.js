// Função para desenhar as coordenadas
function desenharEixosXY() {
    // Obtendo a referência para o div painel2D
    var painel2D = document.querySelector('.painel2D');

    // Obtendo o canvas dentro do div painel2D e definindo seu contexto de desenho
    var canvas = painel2D.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    // Obtendo as dimensões do div pai
    var largura = painel2D.offsetWidth;
    var altura = painel2D.offsetHeight;

    // Configurando as dimensões do canvas
    canvas.width = largura;
    canvas.height = altura;

    // Configurando a origem do sistema de coordenadas no centro do canvas
    var centroX = largura / 2;
    var centroY = altura / 2;

    // Limpar o canvas antes de redesenhar as coordenadas
    ctx.clearRect(0, 0, largura, altura);

    // Desenhando o eixo x
    ctx.beginPath();
    ctx.moveTo(0, centroY);
    ctx.lineTo(largura, centroY);
    ctx.stroke();

    // Desenhando o eixo y
    ctx.beginPath();
    ctx.moveTo(centroX, 0);
    ctx.lineTo(centroX, altura);
    ctx.stroke();
}

// Chamar a função de desenho inicial
window.addEventListener('load', desenharEixosXY);

// Adicionar um ouvinte de evento para o redimensionamento da janela
window.addEventListener('resize', desenharEixosXY);

// Definir canvas como uma variável global
var canvas = document.getElementById("canvas"); 


// Função para obter as coordenadas do mouse no canvas
function obterPosicaoDoMouse(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return { x: x, y: y };
}


function atualizarCoordenadas(event) {
    var coordenadas = obterPosicaoDoMouse(event);
    var centroX = canvas.width / 2;
    var centroY = canvas.height / 2;
    
    // Verificar se a coordenada X é menor que o centro do canvas
    if (coordenadas.x < centroX) {
        coordenadas.x = -Math.abs(Math.floor(coordenadas.x - centroX)); // Arredondar para baixo
    } else {
        coordenadas.x = Math.abs(Math.floor(coordenadas.x - centroX)); // Arredondar para baixo
    }
    
    // Verificar se a coordenada Y é menor que o centro do canvas
    if (coordenadas.y < centroY) {
        coordenadas.y = Math.abs(Math.floor(coordenadas.y - centroY)); // Arredondar para baixo
    } else {
        coordenadas.y = -Math.abs(Math.floor(coordenadas.y - centroY)); // Arredondar para baixo
    }

    // Atualizar os parágrafos com as coordenadas corrigidas
    document.getElementById("coordMundo").querySelector("p").innerText = "X: " + coordenadas.x + "\nY: " + coordenadas.y ;
    document.getElementById("coordNorm").querySelector("p").innerText = "X: " + (coordenadas.x / canvas.width) + "\nY: " + (coordenadas.y / canvas.height);
    document.getElementById("coordTela").querySelector("p").innerText = "X: " + event.clientX + "\nY: " + event.clientY ;
}


// Adicionar um ouvinte de evento para o movimento do mouse no canvas
canvas.addEventListener("mousemove", atualizarCoordenadas);


// Adicionar um ouvinte de evento para o clique do mouse no canvas
canvas.addEventListener("click", function(event) {
    var coordenadas = obterPosicaoDoMouse(event);
    var ctx = canvas.getContext('2d');
    
    // Desenhar um pequeno ponto vermelho na posição do clique
    ctx.fillStyle = "red";
    ctx.fillRect(coordenadas.x - 1, coordenadas.y - 1, 1, 1); // Um pixel de tamanho (1x1)
});