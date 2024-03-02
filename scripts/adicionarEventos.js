// Adicionar um ouvinte de evento para o clique do mouse no canvas
canvas.addEventListener("click", function(event) {
    var coordenadas = obterPosicaoDoMouse(event);
    var ctx = canvas.getContext('2d');
    
    // Desenhar um pequeno ponto vermelho na posição do clique
    ctx.fillStyle = "red";
    ctx.fillRect(coordenadas.x - 1, coordenadas.y - 1, 2, 2); // Um pixel de tamanho (2x2)
});