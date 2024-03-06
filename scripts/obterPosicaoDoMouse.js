
// Função para obter as coordenadas do mouse no canvas
function obterPosicaoDoMouse(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return { x: x, y: y };
}