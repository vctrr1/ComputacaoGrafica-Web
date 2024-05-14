// Area da saída de informações
let textareaSaidaDeDados = document.getElementById("textareaSaidaDeDados");

/* ******************************* Canvas ***********************************/
export function ativaPixel(tipoCanvas, X, Y, cor = 'red'){    
    // Desenhar um pequeno ponto vermelho na posição passada por paramentro
    tipoCanvas.fillStyle = cor;
    tipoCanvas.fillRect( X, -Y, 1, 1); // Ativando 1 pixel de tamanho (1x1)
}

//Função para limpar o canvas
export function limpaTela(ctx){
    // Limpa o conteúdo do canvas
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
}

/* ***************************** text area *********************************/
export function limparSaidaDeDadosTextarea(){
    textareaSaidaDeDados.value = "";
}

export function setarDadosParaSaidaDeDados(informacoes){
    textareaSaidaDeDados.value += informacoes;
}

export function setarDadosParaSaidaDeDadosMatrizes(matriz){
    let aux = "";
    for (let i = 0; i < matriz.length; i++) {
        aux += "\t[ ";
        for (let j = 0; j < matriz[i].length; j++) {
            aux += matriz[i][j].toFixed(0) + " ";
        }
        aux += "]\n";
    }
    return aux;
}