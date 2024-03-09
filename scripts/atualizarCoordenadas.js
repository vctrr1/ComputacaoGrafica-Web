
//Coordenadas Normalizadas
function atualizarCoordenadas(event) {
    var coordenadas = obterPosicaoDoMouse(event);
    var centroX = canvas.width / 2;
    var centroY = canvas.height / 2;

    var ndcx = 2 * (coordenadas.x - centroX) / centroX;    
    var ndcy = (coordenadas.y - centroY) / centroY;

    var dcx = Math.round(ndcx * (canvas.width -1));
    var dcy = Math.round(ndcy * (canvas.height -1));
    
    /*
    
    Informações de converção para quando existir o plano cartesiano
    
    // Verificar se a coordenada X é menor que o centro do canvas
    if (coordenadas.x < centroX) {
        coordenadas.x = - Math.abs(Math.round(coordenadas.x - centroX)); 
    } else {
        coordenadas.x = Math.abs(Math.round(coordenadas.x - centroX));
    }    
    
    // Verificar se a coordenada Y é menor que o centro do canvas
    if (coordenadas.y < centroY) {
        coordenadas.y = Math.abs(Math.round(coordenadas.y - centroY)); 
    } else {
        coordenadas.y = - Math.abs(Math.round(coordenadas.y - centroY)); 
    }
    */

    // Atualizar os parágrafos com as coordenadas corrigidas   
    document.getElementById("coordMundo").querySelector("p").innerText = "X: " + coordenadas.x + "\nY: " + coordenadas.y ;
    document.getElementById("coordNorm").querySelector("p").innerText = "X: " + ndcx.toFixed(10) + "\n Y: " + ndcy.toFixed(10);
    document.getElementById("coordTela").querySelector("p").innerText = "X: " + dcx + "\nY: " + dcy ;
}

// Adicionar um ouvinte de evento para o movimento do mouse no canvas
canvas.addEventListener("mousemove", atualizarCoordenadas);