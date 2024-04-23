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