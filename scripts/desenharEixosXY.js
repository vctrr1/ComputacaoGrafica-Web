// Função para desenhar as coordenadas
function desenharEixosXY() {

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