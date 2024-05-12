
// Função para desenhar os eixos X e Y para visualizar as transformações
export function Eixos2D(ctx, canvas) {
    ctx.strokeStyle = 'gray'; // 'black' representa a cor preta
    // Desenhar eixo X
    ctx.beginPath();
    ctx.moveTo(-canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, 0);
    ctx.stroke();
    // Desenhar eixo Y
    ctx.beginPath();
    ctx.moveTo(0, -canvas.height / 2);
    ctx.lineTo(0, canvas.height / 2);
    ctx.stroke();
}

export function Eixos3D(ctx, canvas) {
    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define as configurações de estilo para os eixos
    ctx.strokeStyle = 'gray'; // cor cinza
    ctx.lineWidth = 2; // largura da linha
    ctx.fillStyle = 'black'; // cor preta
    ctx.font = '12px Arial'; // tamanho e fonte do texto

    // Define as coordenadas dos eixos
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2;
    const labelOffset = 20; // Offset para os textos de etiqueta

    // Desenha o eixo X
    ctx.beginPath();
    ctx.moveTo(-halfWidth, -halfHeight);
    ctx.lineTo(halfWidth, halfHeight);
    ctx.stroke();
    ctx.fillText('-Z', halfWidth - labelOffset - 20, -halfHeight + labelOffset);
    ctx.fillText('+Z', -halfWidth + labelOffset, halfHeight - labelOffset);

    // Desenha o eixo Y
    ctx.beginPath();
    ctx.moveTo(halfWidth, -halfHeight);
    ctx.lineTo(-halfWidth, halfHeight);
    ctx.stroke();
    ctx.fillText('-X', -halfWidth + labelOffset, -halfHeight + labelOffset + 20);
    ctx.fillText('+X', halfWidth - labelOffset, halfHeight - labelOffset);

    // Desenha o eixo Z
    ctx.beginPath();
    ctx.moveTo(0, -halfHeight);
    ctx.lineTo(0, halfHeight);
    ctx.stroke();
    ctx.fillText('+Y', 10, -halfHeight + labelOffset + 20);
    ctx.fillText('-Y', 10, halfHeight - labelOffset);
}

//desenha quadrado
export function Quadrado(vertices, tipoCanvas) {
    tipoCanvas.beginPath();
    tipoCanvas.moveTo(vertices[0][0], vertices[1][0]);

    for (var i = 1; i < vertices[0].length; i++) {
        tipoCanvas.lineTo(vertices[0][i], vertices[1][i]);
    }

    tipoCanvas.closePath();
    tipoCanvas.strokeStyle = 'red';
    tipoCanvas.stroke();
}

//desenha a divisão da tela do cohen
export function CohenSutherland(ctx, altura, largura){
    const espacoExtraVertical = altura / 12;
    const espacoExtraHorizontal = largura / 12; 

    ctx.strokeStyle = 'gray';
    // Desenhar as linhas verticais
    ctx.beginPath();
    ctx.moveTo(-largura / 6 - espacoExtraHorizontal, -altura / 2);
    ctx.lineTo(-largura / 6 - espacoExtraHorizontal, altura / 2);
    ctx.moveTo(largura / 6 + espacoExtraHorizontal, -altura / 2);
    ctx.lineTo(largura / 6 + espacoExtraHorizontal, altura / 2);
    // Desenhar as linhas horizontais
    ctx.moveTo(-largura / 2, -altura / 6 - espacoExtraVertical);
    ctx.lineTo(largura / 2, -altura / 6 - espacoExtraVertical);
    ctx.moveTo(-largura / 2, altura / 6 + espacoExtraVertical);
    ctx.lineTo(largura / 2, altura / 6 + espacoExtraVertical);
    ctx.stroke();
}

//calcula o tamanho do quadrado central desenhado pelo desenharEixosCohenSutherland()
//OBS: altera de alum jeito a coordenada da reta
export function areaDeRecorteCohen(altura, largura) {
    const espacoExtraVertical = altura / 12;
    const espacoExtraHorizontal = largura / 12;
    
    const xEsquerda = -largura / 6 - espacoExtraHorizontal;
    const xDireita = largura / 6 + espacoExtraHorizontal;
    const yTopo = -altura / 6 - espacoExtraVertical;
    const yBase = altura / 6 + espacoExtraVertical;


    return [
        [xEsquerda, xDireita, xDireita, xEsquerda], // Coordenadas X
        [yTopo, yTopo, yBase, yBase], // Coordenadas Y
    ];
}
