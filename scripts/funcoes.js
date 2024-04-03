class wcPt2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


// Carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

    const painel2D = document.querySelector('.main_conteudo-painelDesenho');
    const canvas = painel2D.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const largura = parseFloat(painel2D.offsetWidth).toFixed(5);
    const altura = parseFloat(painel2D.offsetHeight).toFixed(5);
    canvas.width = largura;
    canvas.height = altura;
    
    //Botões
    const btnLimparPixel = document.getElementById('btnLimparCanvasPixel');
    const btnDesenharPixel = document.getElementById('btnDesenharPixel');

    const btnLimparReta = document.getElementById('btnLimparReta');
    const btnDesenharReta = document.getElementById('btnDesenharReta');

    const btnLimparCircunferencia = document.getElementById('btnLimparCircunferencia');
    const btnDesenharCircunferencia = document.getElementById('btnDesenharCircunferencia');

    // Seleciona os elementos de input do PIXEL
    const inputXPixel = document.getElementById('inputXPixel');
    const inputYPixel = document.getElementById('inputYPixel');

    //Seleciona os elementos do input da Reta
    const inputXP1 = document.getElementById("inputXP1");
    const inputYP1 = document.getElementById("inputYP1");
    const inputXP2 = document.getElementById("inputXP2");
    const inputYP2 = document.getElementById("inputYP2");

    //Seleciona o elemento do input Do Raio
    const inputRaio = document.getElementById('inputRaio');

    //seleciona botoes das transformações
    const btnDesenharQuadrado = document.getElementById('btnDesenharQuadrado');
    const btnAplicarTranslacao = document.getElementById('btnAplicarTranslacao');
    const btnAplicarRotacao = document.getElementById('btnAplicarRotacao');
    const btnAplicarEscala = document.getElementById('btnAplicarEscala');
    const btnLimpar = document.getElementById('btnLimpar');
    let vertices = [];

    const centroX = largura/2;
    const centroY = altura/2;

    /* **********************************************************
        Sobre as coordenadas e posição do mouse no canvas 
    */

    // Função para obter as coordenadas do mouse no canvas
    function obterPosicaoDoMouse(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return { x: x, y: y };
    }

    /* Função para atualizar as coordenadas*/
    function atualizarCoordenadas(event) {
        var coordenadas = obterPosicaoDoMouse(event);
        var Xmax = canvas.width;
        var Ymax = canvas.height;
        var ndh = canvas.width;
        var ndv = canvas.height;
        var ndcx = (2 * coordenadas.x / Xmax) - 1; ;
        var ndcy = 1 - (2 * coordenadas.y / Ymax); ;
        var dcx =  Math.round((ndcx + 1) * (ndh) / 2);
        var dcy =  Math.round((1 - ndcy) * (ndv) / 2);

        document.getElementById("coordMundo").querySelector("p").innerText = "X: " + Math.floor(coordenadas.x) + "\nY: " + Math.floor(coordenadas.y) ;
        document.getElementById("coordNorm").querySelector("p").innerText = "X: " + ndcx.toFixed(10) + "\n Y: " + ndcy.toFixed(10);
        document.getElementById("coordTela").querySelector("p").innerText = "X: " + dcx + "\nY: " + dcy ;
    }

    // Função para ativar um pixel
    function ativaPixel(X, Y) {
        var ctx = canvas.getContext('2d');    
        
        // Desenhar um pequeno ponto vermelho na posição passada por paramentro
        ctx.fillStyle = "red";
        ctx.fillRect((centroX + X) - 1, (centroY - Y) - 1, 1, 1); // Ativando 1 pixel de tamanho (1x1)
    }

    //Função DDA para qualquer oitante
    function DDA(X1, Y1, X2, Y2) {
        var deltaX = X2 - X1;
        var deltaY = Y2 - Y1;
    
        var length = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    
        var Xinc = deltaX / length;
        var Yinc = deltaY / length;
    
        var X = X1;
        var Y = Y1;
    
        ativaPixel(Math.round(X), Math.round(Y));
    
        for (var i = 0; i < length; i++) {
            X += Xinc;
            Y += Yinc;
            ativaPixel(Math.round(X), Math.round(Y));
        }
    }

    // Reta Ponto Médio
    function retaPontoMedio(X1, Y1, X2, Y2) {
        // Verifica se X1 é maior que X2 e, se for, troca os pontos
        if (X1 > X2) {
            [X1, X2] = [X2, X1];
            [Y1, Y2] = [Y2, Y1];
        }

        var dx = Math.abs(X2 - X1);
        var dy = Math.abs(Y2 - Y1);
        var d = 2 * dy - dx;
        var incE = 2 * dy;
        var incNE = 2 * (dy - dx);
        var x = X1;
        var y = Y1;

        ativaPixel(x, y);
        console.log("X: " + x + "\tY: " + y);

        while (x < X2) {
            if (d <= 0) {
                d = d + incE;
                x = x + 1;
            } else {
                d = d + incNE;
                x = x + 1;
                y = y + 1;
            }
            ativaPixel(x, y);
            console.log("X: " + x + "\tY: " + y);
        }
    }

    // Função para desenhar uma circunferencia com o método Polinomial
    function circunferenciaPolinomial(raio) {
        // Inicialização das variáveis
        let x = 0;
        let i = 1;
        let xend = raio;

        // Loop para desenhar o círculo
        while (x <= xend) {
            // Cálculo da coordenada y usando a equação do círculo
            let y = Math.round(Math.sqrt(raio * raio - x * x));
            
            // Plotar os pontos determinados pela simetria
            ponto_Circulo(x, y);

            // Incrementar x
            x += i;
        }
    }

    // Função para desenhar uma circunferencia com o método trigonometrico
    function circunferenciaTrigonometrica(raio) {
        
        // Variável para armazenar o ângulo atual
        let theta = 0;
        
        // Variável para determinar se o círculo foi convertido
        let converted = false;
        
        // Passo para incrementar o ângulo
        const passo = 1;

        // Loop enquanto o círculo não for completamente desenhado
        while (!converted) {
            // Converter o ângulo de graus para radianos
            let radianos = (theta * Math.PI) / 180;
            
            // Calcular a coordenada x usando a fórmula do círculo
            let x = Math.round(raio * Math.cos(radianos));
           
            // Calcular a coordenada y usando a fórmula do círculo
            let y = Math.round(raio * Math.sin(radianos));

            // Plotar os pontos determinados pela simetria
            ponto_Circulo(x, y);

            // Incrementar o ângulo
            theta += passo;

            // Condição de parada: círculo completo quando o ângulo alcança 360 graus
            if (theta >= 360) {
                converted = true;
            }
        }
    }

    //Função da circunferencia PM
    function circunferenciaPontoMedio(raio){
        var x = 0;
        var y = raio;
        var d = (1-raio);

        ponto_Circulo(x, y);

        while( y > x){
            if(d < 0 ){
                d += 2.0*x + 3.0;
            }
            else{
                d += 2.0*(x-y)+5;
                y--;
            }
            x++;
            ponto_Circulo(x, y);
        }
    }

    //Função para realizar 
    function ponto_Circulo(x, y){
        ativaPixel(x, y); 
        ativaPixel(y, x);
        ativaPixel(y, -x);
        ativaPixel(x, -y);
        ativaPixel(-x, -y);
        ativaPixel(-y, -x);
        ativaPixel(-y, x);
        ativaPixel(-x, y);
    }

    function applyTranslation() {
        // Obtém os valores de translação em x e y
        var tx = parseInt(document.getElementById("inputTx").value);
        var ty = parseInt(document.getElementById("inputTy").value);

        let newVert = vertices;

        for (let k = 0; k < vertices.length; k++) {
            newVert[k].x = newVert[k].x + tx;
            newVert[k].y = newVert[k].y + ty;
        }

        console.log(newVert);
        
        desenharQuadrado(newVert);
    }

    function applyRotation() {
        let newVert = [];

        let angulo = parseInt(document.getElementById('inputAnguloRotacao').value);
        let theta = (angulo * Math.PI) / 180;

        let pivPt = calcularPontoPivotal(vertices);

        for (let k = 0; k < vertices.length; k++) {
            let newX = pivPt.x + (vertices[k].x - pivPt.x) * Math.cos(theta) - (vertices[k].y - pivPt.y) * Math.sin(theta);
            let newY = pivPt.y + (vertices[k].x - pivPt.x) * Math.sin(theta) + (vertices[k].y - pivPt.y) * Math.cos(theta);
            newVert.push(new wcPt2D(newX, newY));
        }
        
        desenharQuadrado(newVert);
    }

    function applyScale() {
        
        let sx = parseFloat(document.getElementById('inputSx').value);
        let sy = parseFloat(document.getElementById('inputSy').value);
        
        let newVert = [];

        let fixedPt = calcularPontoPivotal(vertices);
        
        for (let k = 0; k < vertices.length; k++) {
            let newX = vertices[k].x * sx + fixedPt.x * (1 - sx);
            let newY = vertices[k].y * sy + fixedPt.y * (1 - sy);
            newVert.push(new wcPt2D(newX, newY));
        }

        desenharQuadrado(newVert);

    }

    function calcularPontoPivotal(v) {
        let somaX = 0;
        let somaY = 0;
    
        // Somar todas as coordenadas x e y
        for (let i = 0; i < v.length; i++) {
            somaX += v[i].x;
            somaY += v[i].y;
        }
    
        // Calcular as médias das coordenadas x e y
        let mediaX = somaX / v.length;
        let mediaY = somaY / v.length;
    
        // Retornar o ponto pivotal como um objeto wcPt2D
        return new wcPt2D(mediaX, mediaY);
    }
    
    
    // Função para desenhar o polígono
    function desenharQuadrado(vertices) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.closePath();
        ctx.stroke();
    }
    function applyReflectionX() {
        // Define a matriz de reflexão em x
        var reflectionMatrixX = [
            [1, 0, 0],
            [0, -1, 0],
            [0, 0, 1]
        ];
    
        let newVert = [];
    
        // Aplica a reflexão em x a cada ponto do polígono
        for (let i = 0; i < vertices.length; i++) {
            let newCoord = multiplyMatrixVector(reflectionMatrixX, [vertices[i].x, vertices[i].y, 1]);
            newVert.push(new wcPt2D(newCoord[0], newCoord[1]));
        }
    
        // Desenha o polígono após a reflexão em x
        desenharQuadrado(newVert);
    }
    
    function applyReflectionY() {
        // Define a matriz de reflexão em y
        var reflectionMatrixY = [
            [-1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    
        let newVert = [];
    
        // Aplica a reflexão em y a cada ponto do polígono
        for (let i = 0; i < vertices.length; i++) {
            let newCoord = multiplyMatrixVector(reflectionMatrixY, [vertices[i].x, vertices[i].y, 1]);
            newVert.push(new wcPt2D(newCoord[0], newCoord[1]));
        }
    
        // Desenha o polígono após a reflexão em y
        desenharQuadrado(newVert);
    }
    
    // Adiciona o ouvinte de evento para o botão "Aplicar Reflexão em X"
    document.getElementById('btnAplicarReflexaoX').addEventListener('click', () => {
        applyReflectionX();
    });
    
    // Adiciona o ouvinte de evento para o botão "Aplicar Reflexão em Y"
    document.getElementById('btnAplicarReflexaoY').addEventListener('click', () => {
        applyReflectionY();
    });

    function applyShearing() {
        // Obtém os valores de cisalhamento em x e y
        var a = parseFloat(document.getElementById("inputAx").value);
        var b = parseFloat(document.getElementById("inputBy").value);
        
        // Define a matriz de cisalhamento
        var shearMatrix = [
            [1, a, 0],
            [b, 1, 0],
            [0, 0, 1]
        ];
    
        let newVert = [];
    
        // Aplica o cisalhamento a cada ponto do polígono
        for (let i = 0; i < vertices.length; i++) {
            let newCoord = multiplyMatrixVector(shearMatrix, [vertices[i].x, vertices[i].y, 1]);
            newVert.push(new wcPt2D(newCoord[0], newCoord[1]));
        }
    
        // Desenha o polígono após o cisalhamento
        desenharQuadrado(newVert);
    }
    function multiplyMatrixVector(matrix, vector) {
    let result = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < vector.length; j++) {
            sum += matrix[i][j] * vector[j];
        }
        result.push(sum);
    }

    
    return result;
    }
    document.getElementById('btnAplicarCisalhamento').addEventListener('click', () => {
        applyShearing();
    });
    
    
    // Adiciona o ouvinte de evento para o botão "Aplicar Translação"
    btnAplicarTranslacao.addEventListener('click', applyTranslation);

    btnAplicarRotacao.addEventListener('click', applyRotation)

    btnAplicarEscala.addEventListener('click', applyScale)
    
    // Adiciona o ouvinte de evento para o botão "Desenhar Quadrado"
    btnDesenharQuadrado.addEventListener('click', () => {
        // Define as coordenadas do quadrado como desejado
        vertices = [
            new wcPt2D(-50, -50),
            new wcPt2D(50, -50),
            new wcPt2D(50, 50),
            new wcPt2D(-50, 50)
        ];
        
        // Desenha o quadrado no canvas
        desenharQuadrado(vertices);
    });
    
    // Adiciona o ouvinte de evento para o botão "Limpar Quadrado"
    btnLimpar.addEventListener('click', () => {
        // Limpa o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Adiciona um ouvinte de evento para o movimento do mouse no canvas para atualização das coordenadas
    canvas.addEventListener("mousemove", atualizarCoordenadas);

    // Ouvinte de evento para o botão "LimparPixel"
    btnLimparPixel.addEventListener('click', () => {
        // Limpa o conteúdo do canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Ouvinte de evento para o botão "LimparRetas"
    btnLimparReta.addEventListener('click', () => {
        // Limpa o conteúdo do canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    btnLimparCircunferencia.addEventListener('click', () =>{
        // Limpa o conteúdo do canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })

    // Ouvinte de evento para o botão "DesenharPixel"
    btnDesenharPixel.addEventListener('click', () => {

        // Obtém os valores dos inputs
        var valorX = parseInt(inputXPixel.value);
        var valorY = parseInt(inputYPixel.value);

        if(isNaN(valorX) || isNaN(valorY)){
            alert("Digite os valores do ponto.");
        }
        else{
            ativaPixel(valorX, valorY);
        }        
        
    });

    // Ouvinte de evento para o botão "DesenharRetas"
    btnDesenharReta.addEventListener('click', () => {

        // Obtém os valores dos inputs
        var valorXP1 = parseInt(inputXP1.value);
        var valorYP1 = parseInt(inputYP1.value);
        var valorXP2 = parseInt(inputXP2.value);
        var valorYP2 = parseInt(inputYP2.value);

        if(isNaN(valorXP1) || isNaN(valorYP1) || isNaN(valorXP2) || isNaN(valorYP2) ){
            alert("Digite os valores dos pontos.");
        }
        else{

            // Obtém a opção selecionada
            var opcaoSelecionada = document.getElementById('opcoes').value;

            switch(opcaoSelecionada){
                
                case "opcao2":
                    DDA(valorXP1, valorYP1, valorXP2, valorYP2);                    
                break;

                case "opcao3":
                    retaPontoMedio(valorXP1, valorYP1, valorXP2, valorYP2);
                break;

                default:
                    alert("Falha no sistema.");
                break;

            }
        }        
        
    });

    //Ouvinte de evento para o botão "Desenhar Circunferencia"
    btnDesenharCircunferencia.addEventListener('click', () => {
        //Obtem o raio
        var raio = parseInt(inputRaio.value);

        if(isNaN(raio)){
            alert('Digite o Raio.');
        }
        else{

            // Obtém a opção selecionada
            var opcaoSelecionada = document.getElementById('opcoes').value;

            switch(opcaoSelecionada){

                case "opcao4":
                    circunferenciaPolinomial(raio);
                break;

                case "opcao5":
                    circunferenciaTrigonometrica(raio);
                break;

                case "opcao6":
                    circunferenciaPontoMedio(raio);
                break;

            }

        }
    });

});