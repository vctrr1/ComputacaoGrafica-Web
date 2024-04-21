
document.addEventListener('DOMContentLoaded', () => {
    
    /*Canvas onde o usuário realiza os desenhos*/
    const painel2D = document.querySelector('.main_conteudo-painelDesenho');     
    const canvas = painel2D.querySelector('canvas');    
    let ctx = canvas.getContext('2d');
    const largura = parseFloat(painel2D.offsetWidth).toFixed(5);
    const altura = parseFloat(painel2D.offsetHeight).toFixed(5);
    canvas.width = largura;
    canvas.height = altura;
    //Definindo o a origem no centro do canvas
    ctx.translate(largura/2, altura/2);

    /*Canvas da ViewPort*/
    const painelSaidaCanvasVP = document.querySelector('.delimitacaoViewPort');
    const canvasViewPort = painelSaidaCanvasVP.querySelector('#viewPortDoProjeto');
    let ctxViewPort = canvasViewPort.getContext('2d');
    const larguraVP = parseFloat(painelSaidaCanvasVP.offsetWidth).toFixed(5);
    const alturaVP = parseFloat(painelSaidaCanvasVP.offsetHeight).toFixed(5);
    canvasViewPort.width = larguraVP;
    canvasViewPort.height = alturaVP;
    ctxViewPort.translate(larguraVP/2, alturaVP/2);

    //Botões
    const btnLimparPixel = document.getElementById('btnLimparCanvasPixel');
    const btnDesenharPixel = document.getElementById('btnDesenharPixel');

    const btnLimparReta = document.getElementById('btnLimparReta');
    const btnDesenharReta = document.getElementById('btnDesenharReta');

    const btnLimparCircunferencia = document.getElementById('btnLimparCircunferencia');
    const btnDesenharCircunferencia = document.getElementById('btnDesenharCircunferencia');
    
    const btnAplicaTransformacoes = document.getElementById('btnAplicaTransformacoes');
    const btnLimpaTransformacoes = document.getElementById('btnLimpaTransformacoes');

    const btnDesenharRetaCohen = document.getElementById('btnDesenharRetaCohen');
    const btnLimparRetaCohen = document.getElementById('btnLimparRetaCohen');
    const btnAplicarCohen = document.getElementById('btnAplicarCohen');

    const btnLimparSaidaTextarea = document.getElementById('btnLimparSaidaTextarea');

    const btnTransferirParaViewPort = document.getElementById('btnTransferirParaViewPort');

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

    //Seleciona elementos de input retaCohen
    let inputCohenX1 = document.getElementById('inputCohenX1');
    let inputCohenX2 = document.getElementById('inputCohenX2');
    let inputCohenY1 = document.getElementById('inputCohenY1');
    let inputCohenY2 = document.getElementById('inputCohenY2');

    // Seletor para todos os checkboxes dentro de .configPanel2D_opcoes_transformacoes
    const checkboxes = document.querySelectorAll('.configPanel2D_opcoes_transformacoes input[type="checkbox"]');
    const inputOpcoes = document.getElementById("opcoes");

    // Area da saída de informações
    let textareaSaidaDeDados = document.getElementById("textareaSaidaDeDados");

    // Função para obter as coordenadas do mouse no canvas
    function obterPosicaoDoMouse(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return { x: x, y: y };
    }

    // Função para atualizar as coordenadas
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
    function ativaPixel(tipoCanvas, X, Y) {    
        
        // Desenhar um pequeno ponto vermelho na posição passada por paramentro
        tipoCanvas.fillStyle = "red";
        tipoCanvas.fillRect( X, -Y, 1, 1); // Ativando 1 pixel de tamanho (1x1)
    }

    //Função para limpar o canvas
    function limpaTela(){
        // Limpa o conteúdo do canvas
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        //Limpa tudo da lista da viewPort
        listaParaAViewPort = [];
    }

    /* *********************************RETAS********************************* */

    //Função DDA para qualquer oitante
    function DDA(X1, Y1, X2, Y2, tipoCanvas) {
        var deltaX = X2 - X1;
        var deltaY = Y2 - Y1;
    
        var length = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    
        var Xinc = deltaX / length;
        var Yinc = deltaY / length;
    
        var X = X1;
        var Y = Y1;
    
        ativaPixel(tipoCanvas, Math.round(X), Math.round(Y));

        setarDadosParaSaidaDeDados("\nFunção de Reta DDA.\n\n" + 
            "P1("+ X1 + ", " + Y1 + ")\tP2("+ X2 + ", " + Y2 + ")\n" +
            "Delta X = " + deltaX + "\tDelta Y = " + deltaY +
            "\nLength = " + length +
            "\nXinc = " + Xinc + "\tYinc = " + Yinc.toFixed(3) +"\n\n"
        );
    
        for (var i = 0; i < length; i++) {
            X += Xinc;
            Y += Yinc;
            ativaPixel(tipoCanvas, Math.round(X), Math.round(Y));
            setarDadosParaSaidaDeDados((i+1)+"º " + "NP("+ X.toFixed(2) + ", " + Y.toFixed(2) + ")\n");
        }
    }

    // Reta Ponto Médio
    function retaPontoMedio(X1, Y1, X2, Y2, tipoCanvas) {

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

        ativaPixel(tipoCanvas, x, y);
        setarDadosParaSaidaDeDados("\nFunção de Reta Ponto Médio.\n\n" + 
            "P1("+ X1.toFixed(0) + ", " + Y1.toFixed(0) + ")\tP2("+ X2.toFixed(0) + ", " + Y2.toFixed(0) + ")\n" + 
            "Dx = " + dx.toFixed(0) + "\nDy = " + dy.toFixed(0) +
            "\nIncE = " + incE.toFixed(0) + "\nIncNE = " + incNE.toFixed(0) +
            "\nx = " + x + "\ty = " + y +"\n\n"
        );

        while (x < X2) {
            if (d <= 0) {
                d = d + incE;
                x = x + 1;
            } else {
                d = d + incNE;
                x = x + 1;
                y = y + 1;
            }
            ativaPixel(tipoCanvas, x, y);
            setarDadosParaSaidaDeDados("X("+ x +")"+ "\tY(" + y + ")\n");
        }
    }

    /* *****************************CIRCUNFERÊNCIA***************************** */

    // Função para desenhar uma circunferencia com o método Polinomial
    function circunferenciaPolinomial(raio, tipoCanvas) {
        // Inicialização das variáveis
        let x = 0;
        let i = 1;
        let xend = raio;

        setarDadosParaSaidaDeDados("\nCircunferência Polinomial.\n\n" + 
            "Raio : "+ raio +"\n\n"
        );

        // Loop para desenhar o círculo
        while (x <= xend) {
            // Cálculo da coordenada y usando a equação do círculo
            let y = Math.round(Math.sqrt(raio * raio - x * x));
            
            // Plotar os pontos determinados pela simetria
            ponto_Circulo(tipoCanvas, x, y);

            // Incrementar x
            x += i;
        }
    }

    // Função para desenhar uma circunferencia com o método trigonometrico
    function circunferenciaTrigonometrica(raio, tipoCanvas) {
        
        // Variável para armazenar o ângulo atual
        let theta = 0;
        
        // Variável para determinar se o círculo foi convertido
        let converted = false;
        
        // Passo para incrementar o ângulo
        const passo = 1;

        setarDadosParaSaidaDeDados("\nCircunferência Trigonemétrica.\n\n" + 
            "Raio : "+ raio +"\n\n"
        );

        // Loop enquanto o círculo não for completamente desenhado
        while (!converted) {
            // Converter o ângulo de graus para radianos
            let radianos = (theta * Math.PI) / 180;
            
            // Calcular a coordenada x usando a fórmula do círculo
            let x = Math.round(raio * Math.cos(radianos));
           
            // Calcular a coordenada y usando a fórmula do círculo
            let y = Math.round(raio * Math.sin(radianos));

            // Plotar os pontos determinados pela simetria
            ponto_Circulo(tipoCanvas, x, y);

            // Incrementar o ângulo
            theta += passo;

            // Condição de parada: círculo completo quando o ângulo alcança 360 graus
            if (theta >= 360) {
                converted = true;
            }
        }
    }

    //Função da circunferencia PM
    function circunferenciaPontoMedio(raio, tipoCanvas){
        var x = 0;
        var y = raio;
        var d = (1-raio);

        setarDadosParaSaidaDeDados("\nCircunferência Ponto Médio.\n\n" + 
            "Raio : " + raio + "\n" + 
            "X = " + x + "\nY = " + y +
            "\nD = " + d + "\n\n"
        );

        ponto_Circulo(tipoCanvas, x, y);

        while( y > x){
            if(d < 0 ){
                d += 2.0*x + 3.0;
            }
            else{
                d += 2.0*(x-y)+5;
                y--;
            }
            x++;
            ponto_Circulo(tipoCanvas, x, y);
        }
    }

    //Função para realizar espelhamento dos pontos da circunferencia 
    function ponto_Circulo(tipoCanvas, x, y){ 
        ativaPixel(tipoCanvas, x, y);
        setarDadosParaSaidaDeDados("X : " + x + "\tY : " + y+"\n");

        ativaPixel(tipoCanvas, y, x);
        setarDadosParaSaidaDeDados("Y : " + y + "\tX : " + x+"\n");

        ativaPixel(tipoCanvas, y, -x);
        setarDadosParaSaidaDeDados("Y : " + y + "\tX : " + -x+"\n");

        ativaPixel(tipoCanvas, x, -y);
        setarDadosParaSaidaDeDados("X : " + x + "\tY : " + -y+"\n");

        ativaPixel(tipoCanvas, -x, -y);
        setarDadosParaSaidaDeDados("X : " + -x + "\tY : " + -y+"\n");

        ativaPixel(tipoCanvas, -y, -x);
        setarDadosParaSaidaDeDados("Y : " + -y + "\tX : " + -x+"\n");

        ativaPixel(tipoCanvas, -y, x);
        setarDadosParaSaidaDeDados("Y : " + -y + "\tX : " + x+"\n");

        ativaPixel(tipoCanvas, -x, y);
        setarDadosParaSaidaDeDados("X : " + -x + "\tY : " + y+"\n\n\n");
    }

    /* ******************************TRANSFORMAÇÕES***************************** */

    let matrizBaseGeral = [
        [0, 50, 50, 0],
        [0, 0, -50, -50],
        [1, 1, 1, 1]
    ];

    // Função para desenhar os eixos X e Y para visualizar as transformações
    function desenharEixos() {
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

    function desenharQuadrado(vertices, tipoCanvas) {
        tipoCanvas.beginPath();
        tipoCanvas.moveTo(vertices[0][0], vertices[1][0]);
    
        for (var i = 1; i < vertices[0].length; i++) {
            tipoCanvas.lineTo(vertices[0][i], vertices[1][i]);
        }
    
        tipoCanvas.closePath();
        tipoCanvas.strokeStyle = 'red';
        tipoCanvas.stroke();
    }

    // Função de Translação
    function Translacao(matrizBase, tx, ty) {    
        const matrizTranslacao = [
            [1, 0, tx],
            [0, 1, ty],
            [0, 0, 1]
        ];
    
        const matrizResultado = multiplicarMatrizes(matrizTranslacao, matrizBase);  
        
        setarDadosParaSaidaDeDados("\nTranslação.\n\n" + 
            "tx : " + tx + "\n" + 
            "ty : " + ty + "\n\n" +
            "Matriz Base: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizBase) + "\n\n" +
            "Matriz de Translação: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizTranslacao) + "\n\n" +
            "Matriz Resultado: "  + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizResultado)
        );
        
        return matrizResultado;
    }

    // Função de Escala
    function Escala(matrizBase, sx, sy) {
        const matrizEscala = [
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1]
        ];

        const matrizResultado = multiplicarMatrizes(matrizEscala, matrizBase);

        setarDadosParaSaidaDeDados("\Escala.\n\n" + 
            "sx : " + sx + "\n" + 
            "sy : " + sy + "\n\n" +
            "Matriz Base: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizBase) + "\n\n" +
            "Matriz de Escala: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizEscala) + "\n\n" +
            "Matriz Resultado: "  + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizResultado)
        );

        return matrizResultado;
    }

    // Função de Rotação
    function Rotacao(matrizBase, angulo) {
        // Converte o ângulo para radianos
        angulo = angulo * (Math.PI / 180);
    
        // Define o centro do polígono
        const centroX = (matrizBase[0][0] + matrizBase[0][2]) / 2;
        const centroY = (matrizBase[1][0] + matrizBase[1][2]) / 2;
    
        // Calcular seno e cosseno do ângulo
        const cos_theta = Math.cos(angulo);
        const sin_theta = Math.sin(angulo);
    
        // Matriz de transformação de rotação anti-horário
        const matrizRotacao = [
            [cos_theta, sin_theta, centroX * (1 - cos_theta) - centroY * sin_theta],
            [-sin_theta, cos_theta, centroY * (1 - cos_theta) + centroX * sin_theta],
            [0, 0, 1]
        ];
    
        const matrizResultado = multiplicarMatrizes(matrizRotacao, matrizBase);
        
        setarDadosParaSaidaDeDados("\Rotação.\n\n" + 
            "Angulo : " + angulo.toFixed(4) + "\n" +
            "Cos. Theta : " + cos_theta.toFixed(4) + "\n" +  
            "Sin. Theta : " + sin_theta.toFixed(4) + "\n\n" +
            "Matriz Base: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizBase) + "\n\n" +
            "Matriz de Rotação: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizRotacao) + "\n\n" +
            "Matriz Resultado: "  + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizResultado)
        );
        
        return matrizResultado;
    }

    // Função para aplicar a reflexão em X
    function ReflexaoX(matrizBase) {
        const matrizReflexaoX = [
            [1, 0, 0],
            [0, -1, 0],
            [0, 0, 1]
        ];

        // Aplicar a reflexão em X multiplicando a matriz do polígono pela matriz de reflexão
        const matrizResultado = multiplicarMatrizes(matrizReflexaoX, matrizBase);
        
        setarDadosParaSaidaDeDados("\nReflexão X.\n\n" + 
            "Matriz Base: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizBase) + "\n\n" +
            "Matriz de Reflexão X: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizReflexaoX) + "\n\n" +
            "Matriz Resultado: "  + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizResultado)
        );
        
        return matrizResultado;
    }

    // Função para aplicar a reflexão em Y
    function ReflexaoY(matrizBase) {
        const matrizReflexaoY = [
            [-1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];

        // Aplicar a reflexão em X multiplicando a matriz do polígono pela matriz de reflexão
        const matrizResultado = multiplicarMatrizes(matrizReflexaoY, matrizBase);

        setarDadosParaSaidaDeDados("\n\nReflexão Y.\n\n" + 
            "Matriz Base: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizBase) + "\n\n" +
            "Matriz de Reflexão Y: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizReflexaoY) + "\n\n" +
            "Matriz Resultado: "  + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizResultado)
        );

        return matrizResultado
    }

    // Função para aplicar cisalhamento em X
    function cisalhamentoX(matrizBase, shx){
        const matrizCisalhamentoX = [
            [1, shx, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];

        const matrizResultado = multiplicarMatrizes(matrizCisalhamentoX, matrizBase);

        setarDadosParaSaidaDeDados("\nCisalhamento X.\n\n" + 
            "shx : " + shx.toFixed(1) + "\n" +
            "Matriz Base: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizBase) + "\n\n" +
            "Matriz de Cisalhamento X: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizCisalhamentoX) + "\n\n" +
            "Matriz Resultado: "  + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizResultado)
        );

        return matrizResultado;
    }

    // Função para aplicar cisalhamento em Y
    function cisalhamentoY(matrizBase, shy){
        const matrizCisalhamentoY = [
            [1, 0, 0],
            [shy, 1, 0],
            [0, 0, 1]
        ];

        const matrizResultado = multiplicarMatrizes(matrizCisalhamentoY, matrizBase);

        setarDadosParaSaidaDeDados("\n\nCisalhamento Y.\n\n" + 
            "shy : " + shy.toFixed(1) + "\n" +
            "Matriz Base: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizBase) + "\n\n" +
            "Matriz de Cisalhamento Y: " + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizCisalhamentoY) + "\n\n" +
            "Matriz Resultado: "  + "\n" + setarDadosParaSaidaDeDadosMatrizes(matrizResultado)
        );

        return matrizResultado;
    }

    // Função para multiplicar duas matrizes
    function multiplicarMatrizes(matrizA, matrizB) {
        const linhasA = matrizA.length;
        const colunasA = matrizA[0].length;
        const colunasB = matrizB[0].length;
        const matrizResultado = [];

        for (let i = 0; i < linhasA; i++) {
            matrizResultado[i] = [];
            for (let j = 0; j < colunasB; j++) {
                let soma = 0;
                for (let k = 0; k < colunasA; k++) {
                    soma += matrizA[i][k] * matrizB[k][j];
                }
                matrizResultado[i][j] = soma;
            }
        }

        return matrizResultado;
    }

    /* *****************************COHEN-SUTHERLAND**************************** */

    const matrizAreaDeRecorte = [
        [-250, 250, 250, -250],
        [-200, -200, 200, 200],
        [1, 1, 1, 1]
    ];
   
    function desenharEixosCohenSutherland(){
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

    function cohenSutherland(x1, y1, x2, y2, xmin, ymin, xmax, ymax) {

        function bit(codigo, pos) {
            var bit = codigo << (31 - pos);
            bit = bit >>> 31;
            return bit;
        }

        function obterCodigo(x, y, xmin, ymin, xmax, ymax) {
            var codigo = 0;

            if (x < xmin) {
                codigo += 1;
            }
            if (x > xmax) {
                codigo += 2;
            }

            if (y < ymin) {
                codigo += 4;
            }
            if (y > ymax) {
                codigo += 8;
            }
            return codigo;
        }

        var aceito = false;
        var feito = false;

        var codigoFora;

        var x = 0, y = 0;

        while (!feito) {
            var codigo1 = obterCodigo(x1, y1, xmin, ymin, xmax, ymax);
            var codigo2 = obterCodigo(x2, y2, xmin, ymin, xmax, ymax);

            
            if (codigo1 == 0 && codigo2 == 0) {// Dentro da janela
                aceito = true;
                feito = true;
            } else if ((codigo1 & codigo2) != 0) {// Fora da janela
                limpaTela();
                desenharEixosCohenSutherland();
                desenharQuadrado(matrizAreaDeRecorte, ctx);
                limparSaidaDeDadosTextarea();
                setarDadosParaSaidaDeDados("\nLinha fora da area de recorte");
                feito = true;
            } else {
                // Parcialmente dentro
                codigoFora = codigo1 != 0 ? codigo1 : codigo2;

                
                if (bit(codigoFora, 0) == 1) {// Esquerda
                    x = xmin;
                    y = y1 + ((y2 - y1) * (xmin - x1)) / (x2 - x1);
                } 
                else if (bit(codigoFora, 1) == 1) {//Direita
                    x = xmax;
                    y = y1 + ((y2 - y1) * (xmax - x1)) / (x2 - x1);
                } 
                else if (bit(codigoFora, 2) == 1) {// Baixo
                    y = ymin;
                    x = x1 + ((x2 - x1) * (ymin - y1)) / (y2 - y1);
                } 
                else if (bit(codigoFora, 3) == 1) {// Topo
                    y = ymax;
                    x = x1 + ((x2 - x1) * (ymax - y1)) / (y2 - y1);
                }

                if (codigoFora == codigo1) {
                    x1 = x;
                    y1 = y;
                } else {
                    x2 = x;
                    y2 = y;
                }
            }
        } // fim while

        if (aceito) {
            limpaTela();
            desenharEixosCohenSutherland();
            desenharQuadrado(matrizAreaDeRecorte, ctx);
            limparSaidaDeDadosTextarea();
            setarDadosParaSaidaDeDados("\nNOVAS COORDENADAS DA RETA.\n\n");
            retaPontoMedio(x1, y1, x2, y2);
        } else {
            console.log("Line rejected");
        }
    }

    /*
    function cohenSutherland(x1, y1, x2, y2, xmin, ymin, xmax, ymax) {
        const INSIDE = 0; // 0000
        const LEFT = 1; // 0001
        const RIGHT = 2; // 0010
        const BOTTOM = 4; // 0100
        const TOP = 8; // 1000

        function computeCode(x, y) {
            // initialized as being inside
            let code = INSIDE;
        
            if (x < x_min) // to the left of rectangle
                code |= LEFT;
            else if (x > x_max) // to the right of rectangle
                code |= RIGHT;
            if (y < y_min) // below the rectangle
                code |= BOTTOM;
            else if (y > y_max) // above the rectangle
                code |= TOP;
        
            return code;
        }

        // Compute region codes for P1, P2
        let code1 = computeCode(x1, y1);
        let code2 = computeCode(x2, y2);
    
        // Initialize line as outside the rectangular window
        let accept = false;
    
        while (true) {
            if ((code1 === 0) && (code2 === 0)) {
                // If both endpoints lie within rectangle
                accept = true;
                break;
            } else if (code1 & code2 !== 0) {
                limpaTela();
                desenharEixosCohenSutherland();
                desenharQuadrado(matrizAreaDeRecorte);
                limparSaidaDeDadosTextarea();
                setarDadosParaSaidaDeDados("\nLinha fora da area de recorte");
                break;
            } else {
                // Some segment of line lies within the
                // rectangle
                let code_out;
                let x, y;
    
                // At least one endpoint is outside the
                // rectangle, pick it.
                if (code1 !== 0){
                    code_out = code1;
                } else{
                    code_out = code2;
                }
    
                // Find intersection point;
                // using formulas y = y1 + slope * (x - x1),
                // x = x1 + (1 / slope) * (y - y1)
                if (code_out & TOP) {
                    // point is above the clip rectangle
                    x = x1 + (x2 - x1) * (y_max - y1) / (y2 - y1);
                    y = y_max;
                } else if (code_out & BOTTOM) {
                    // point is below the rectangle
                    x = x1 + (x2 - x1) * (y_min - y1) / (y2 - y1);
                    y = y_min;
                } else if (code_out & RIGHT) {
                    // point is to the right of rectangle
                    y = y1 + (y2 - y1) * (x_max - x1) / (x2 - x1);
                    x = x_max;
                } else if (code_out & LEFT) {
                    // point is to the left of rectangle
                    y = y1 + (y2 - y1) * (x_min - x1) / (x2 - x1);
                    x = x_min;
                }

                if (code_out === code1) {
                    x1 = x;
                    y1 = y;
                    code1 = computeCode(x1, y1);
                } else {
                    x2 = x;
                    y2 = y;
                    code2 = computeCode(x2, y2);
                }
            }
        }
        if (accept) {
            limpaTela();
            desenharEixosCohenSutherland();
            desenharQuadrado(matrizAreaDeRecorte);
            limparSaidaDeDadosTextarea();
            setarDadosParaSaidaDeDados("\nNOVAS COORDENADAS DA RETA.\n\n");
            retaPontoMedio(x1, y1, x2, y2);
        } else
            console.log("Line rejected");
    }
    */

    /* ****************************** Saida de dados ***************************** */
    function limparSaidaDeDadosTextarea(){
        textareaSaidaDeDados.value = "";
    }

    function setarDadosParaSaidaDeDados(informacoes){
        textareaSaidaDeDados.value += informacoes;
    }
    
    function setarDadosParaSaidaDeDadosMatrizes(matriz){
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

    /* ****************************** Funções para saida da viewPort ****************************** */

    var listaParaAViewPort = [];

    // Função para processar a lista de dados e aplicar a transformação de viewport
    function processarListaViewport(lista, Xmin, Xmax, Ymin, Ymax, Umin, Umax, Vmin, Vmax, tipoCanvas) {
        
        // Calculando a matriz de transformação de viewport `M`
        const M = calcularMatrizViewport(Xmin, Xmax, Ymin, Ymax, Umin, Umax, Vmin, Vmax);        

        // Verifica o tipo de entrada na lista
        let tipoEntrada = '';
        if (lista.some(item => item.tipo === 'reta')) {
            tipoEntrada = 'reta';
        } 
        else if (lista.some(item => item.tipo === 'circunferencia')) {
            tipoEntrada = 'circunferencia';
        } 
        else {
            tipoEntrada = 'matriz';
        }

        // Processa as entradas com base no tipo detectado
        if (tipoEntrada === 'reta') {
            for (let entrada of lista) {
                if (entrada.tipo === 'reta') {
                    const MR = calcularRetaViewport(Xmin, Xmax, Ymin, Ymax, Umin, Umax, Vmin, Vmax);
                    const pontosTransformados = entrada.pontos.map(ponto => aplicarTransformacaoViewport(ponto, MR));
                    DDA(pontosTransformados[0].x, pontosTransformados[0].y, pontosTransformados[1].x, pontosTransformados[1].y, tipoCanvas);
                }
            }
        } 
        else if (tipoEntrada === 'circunferencia') {
            for (let entrada of lista) {
                if (entrada.tipo === 'circunferencia') {
                    const raioTransformado = transformarRaio(entrada.raio, M);
                    circunferenciaPontoMedio(raioTransformado, tipoCanvas);
                }
            }
        } 
        else {            
            const matrizViewport = multiplicarMatrizes(M, lista);
            desenharQuadrado(matrizViewport, tipoCanvas);            
        }
    }

    function calcularRetaViewport(Xmin, Xmax, Ymin, Ymax, Umin, Umax, Vmin, Vmax){
        // Calcula a escala
        const scaleX = (Umax - Umin) / (Xmax - Xmin);
        const scaleY = (Vmax - Vmin) / (Ymax - Ymin);

        // Matriz de escala S(Umax - Umin / Xmax - Xmin, Vmax - Vmin / Ymax - Ymin)
        const matrizEscala = [
            [scaleX, 0, 0],
            [0, scaleY, 0],
            [0, 0, 1]
        ];

        return matrizEscala;
    }

    // Função para transformar o raio da circunferência
    function transformarRaio(raio, M) {
        // Calcule as escalas de transformação
        const scaleX = M[0][0];
        const scaleY = M[1][1];
        
        // Calcule a média geométrica das escalas x e y para obter uma transformação proporcional
        const escalaMedia = Math.sqrt(scaleX * scaleY);
        
        // Transforme o raio com base na média geométrica das escalas
        const raioTransformado = raio * escalaMedia;
        
        return raioTransformado;
    }

    function calcularMatrizViewport(Xmin, Xmax, Ymin, Ymax, Umin, Umax, Vmin, Vmax) {
        // Calcula a escala
        const scaleX = (Umax - Umin) / (Xmax - Xmin);
        const scaleY = (Vmax - Vmin) / (Ymax - Ymin);
    
        // Matriz de translação T(Um, Vm)
        const matrizTranslacao = [
            [1, 0, Umin],
            [0, 1, Vmin],
            [0, 0, 1]
        ];
        
        // Matriz de escala S(Umax - Umin / Xmax - Xmin, Vmax - Vmin / Ymax - Ymin)
        const matrizEscala = [
            [scaleX, 0, 0],
            [0, scaleY, 0],
            [0, 0, 1]
        ];
        
        // Matriz de translação reversa T(-Xmin, -Ymin)
        const matrizTranslacaoReversa = [
            [1, 0, -Xmin],
            [0, 1, -Ymin],
            [0, 0, 1]
        ];
        
        // Multiplica as matrizes na ordem correta
        const M1 = multiplicarMatrizes(matrizTranslacao, matrizEscala);
        const M = multiplicarMatrizes(M1, matrizTranslacaoReversa);
        
        return M;
    }

    function aplicarTransformacaoViewport(ponto, M) {
        // Multiplique o ponto pela matriz `M`
        const x = ponto.x;
        const y = ponto.y;
        
        const novoX = M[0][0] * x + M[0][1] * y + M[0][2];
        const novoY = M[1][0] * x + M[1][1] * y + M[1][2];
        
        return { x: novoX, y: novoY };
    }   

    /* ******************************BOTOES***************************** */

    // Adiciona um ouvinte de evento para o movimento do mouse no canvas para atualização das coordenadas
    canvas.addEventListener("mousemove", atualizarCoordenadas);

    // Ouvinte de evento para o botão "LimparPixel"
    btnLimparPixel.addEventListener('click', () => {
        // Limpa o conteúdo do canvas
        limpaTela();
    });

    // Ouvinte de evento para o botão "LimparRetas"
    btnLimparReta.addEventListener('click', () => {
        // Limpa o conteúdo do canvas
        limpaTela();
    });

    // Ouvinte de evento para o botão "LimparCircunferencias"
    btnLimparCircunferencia.addEventListener('click', () =>{
        // Limpa o conteúdo do canvas
        limpaTela();
    })

    // Ouvinte de evento para o botão "LimparTransformações"
    btnLimpaTransformacoes.addEventListener('click', () => {
        
        matrizBaseGeral = [
            [0, 50, 50, 0],
            [0, 0, -50, -50],
            [1, 1, 1, 1]
        ];

        limpaTela();
        desenharEixos();
        desenharQuadrado(matrizBaseGeral, ctx);
    })

    // Ouvinte de evento para o botão "LimparRetaCohen"
    btnLimparRetaCohen.addEventListener('click', () => {
        limpaTela();
        desenharEixosCohenSutherland();
        desenharQuadrado(matrizAreaDeRecorte, ctx);
    })

    //Ouvinte de evento para o botão limpar saida do textarea
    btnLimparSaidaTextarea.addEventListener('click', () => {
        limparSaidaDeDadosTextarea();
    });

    // Ouvinte de evento para o botão "DesenharPixel"
    btnDesenharPixel.addEventListener('click', () => {

        // Obtém os valores dos inputs
        var valorX = parseInt(inputXPixel.value);
        var valorY = parseInt(inputYPixel.value);

        if(isNaN(valorX) || isNaN(valorY)){
            alert("Digite os valores do ponto.");
        }
        else{
            ativaPixel(canvas.getContext('2d'), valorX, valorY);
        }        
        
    });

    // Ouvinte de evento para o botão "DesenharRetas"
    btnDesenharReta.addEventListener('click', () => {
        limparSaidaDeDadosTextarea();
        // Obtém os valores dos inputs
        var valorXP1 = parseInt(inputXP1.value);
        var valorYP1 = parseInt(inputYP1.value);
        var valorXP2 = parseInt(inputXP2.value);
        var valorYP2 = parseInt(inputYP2.value);

        if(isNaN(valorXP1) || isNaN(valorYP1) || isNaN(valorXP2) || isNaN(valorYP2) ){
            alert("Digite os valores dos pontos.");
        }
        else{

            listaParaAViewPort = [];
            listaParaAViewPort.push({
                tipo: "reta",
                pontos:[
                    {x: valorXP1, y: valorYP1},
                    {x: valorXP2, y: valorYP2}
                ]
            });

            // Obtém a opção selecionada
            var opcaoSelecionada = document.getElementById('opcoes').value;

            switch(opcaoSelecionada){
                
                case "opcao2":
                    DDA(valorXP1, valorYP1, valorXP2, valorYP2, ctx);                    
                break;

                case "opcao3":
                    retaPontoMedio(valorXP1, valorYP1, valorXP2, valorYP2, ctx);
                break;

                default:
                    alert("Falha no sistema.");
                break;

            }
        }
        
        console.log(listaParaAViewPort);
        
    });

    //Ouvinte de evento para o botão "Desenhar Circunferencia"
    btnDesenharCircunferencia.addEventListener('click', () => {
        limparSaidaDeDadosTextarea();
        //Obtem o raio
        var raio = parseInt(inputRaio.value);

        if(isNaN(raio)){
            alert('Digite o Raio.');
        }
        else{

            listaParaAViewPort = [];
            listaParaAViewPort.push({
                tipo: "circunferencia",
                raio: raio
            });

            // Obtém a opção selecionada
            var opcaoSelecionada = document.getElementById('opcoes').value;

            switch(opcaoSelecionada){

                case "opcao4":
                    circunferenciaPolinomial(raio, ctx);
                break;

                case "opcao5":
                    circunferenciaTrigonometrica(raio, ctx);
                break;

                case "opcao6":
                    circunferenciaPontoMedio(raio, ctx);
                break;

            }

        }
    });

    // Aplica a transformação desejada quando o botão é clicado
    btnAplicaTransformacoes.addEventListener('click', function() {
        limparSaidaDeDadosTextarea();
        listaParaAViewPort = [];
        
        aplicarTransformacao();
    });

    btnDesenharRetaCohen.addEventListener('click', () => {

        let X1 = parseInt(inputCohenX1.value);
        let X2 = parseInt(inputCohenX2.value);
        let Y1 = parseInt(inputCohenY1.value);
        let Y2 = parseInt(inputCohenY2.value);

        if(isNaN(X1) || isNaN(X2) || isNaN(Y1) || isNaN(Y2)){
            alert("Digite os valores validos para os pontos.");
        }else {
            retaPontoMedio(X1, Y1, X2, Y2);
        }

    });

    btnAplicarCohen.addEventListener('click', () => {

        let X1 = parseInt(inputCohenX1.value);
        let X2 = parseInt(inputCohenX2.value);
        let Y1 = parseInt(inputCohenY1.value);
        let Y2 = parseInt(inputCohenY2.value);

        const xmin = matrizAreaDeRecorte[0][3];
        const ymin = matrizAreaDeRecorte[1][0];
        const xmax = matrizAreaDeRecorte[0][1];
        const ymax = matrizAreaDeRecorte[1][2];

        if(isNaN(X1) || isNaN(X2) || isNaN(Y1) || isNaN(Y2)){
            alert("Digite os valores validos para os pontos.");
        }else {
            cohenSutherland(X1, Y1, X2, Y2, xmin, ymin, xmax, ymax);
        }
    });

    // Ouvinte para o botão transferir para ViewPort
    btnTransferirParaViewPort.addEventListener('click', () => {
        // Define valores iniciais de Xmin, Xmax, Ymin e Ymax
        let Xmin = 0;
        let Xmax = canvas.width;
        let Ymin = 0;
        let Ymax = canvas.height;

        console.log("listaParaAViewPort", listaParaAViewPort);

        // Processa a lista de dados para ViewPort
        listaParaAViewPort.forEach(entrada => {
            if (entrada.tipo === 'reta') {
                // Processa reta
                entrada.pontos.forEach(ponto => {
                    Xmin = Math.min(Xmin, ponto.x);
                    Xmax = Math.max(Xmax, ponto.x);
                    Ymin = Math.min(Ymin, ponto.y);
                    Ymax = Math.max(Ymax, ponto.y);
                });
            } 
            else if (entrada.tipo === 'circunferencia') {
                // Processa circunferência
                const raio = entrada.raio;
                Xmin = Math.min(Xmin, -raio);
                Xmax = Math.max(Xmax, raio);
                Ymin = Math.min(Ymin, -raio);
                Ymax = Math.max(Ymax, raio);
            } 
            else {
                const [xArray, yArray, wArray] = entrada;
                // Percorra os arrays xArray e yArray para calcular os valores mínimos e máximos
                for (let i = 0; i < xArray.length; i++) {
                    const x = xArray[i];
                    const y = yArray[i];

                    // Atualize Xmin e Xmax com base nos valores de x
                    Xmin = Math.min(Xmin, x);
                    Xmax = Math.max(Xmax, x);

                    // Atualize Ymin e Ymax com base nos valores de y
                    Ymin = Math.min(Ymin, y);
                    Ymax = Math.max(Ymax, y);
                }
            }
        });

        // Define valores de Umin, Umax, Vmin e Vmax
        let Umin = 0;
        let Umax = larguraVP;
        let Vmin = 0;
        let Vmax = alturaVP;
        console.log(`Xmin: ${Xmin}, Xmax: ${Xmax}, Ymin: ${Ymin}, Ymax: ${Ymax}`);
        console.log("listaParaAViewPort", listaParaAViewPort);
        // Chama a função processarListaViewport com os valores calculados
        processarListaViewport(listaParaAViewPort, Xmin, Xmax, Ymin, Ymax, Umin, Umax, Vmin, Vmax, ctxViewPort);
    });

    //Ouvinte para verificar se a opção selecionada foi a de transformações ou Cohen e desenhar no canvas
    inputOpcoes.addEventListener('change', () => {
        var opcaoSelecionada = inputOpcoes.value;

        if(opcaoSelecionada === "opcao7"){
            limpaTela();
            limparSaidaDeDadosTextarea();
            desenharEixos();
            desenharQuadrado(matrizBaseGeral, ctx);
        }else if(opcaoSelecionada === "opcao8"){
            limpaTela();
            limparSaidaDeDadosTextarea();
            desenharEixosCohenSutherland();
            desenharQuadrado(matrizAreaDeRecorte, ctx);
        }
        else{
            limpaTela();
            limparSaidaDeDadosTextarea();
        }
        
    });
    
    // Função para adicionar ouvintes de eventos aos checkboxes
    function adicionarOuvintesCheckbox() {
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
            });
        });
    }

    // Função para aplicar a transformação desejada
    function aplicarTransformacao() {
        
        if (document.getElementById('checkTranslacao').checked) {
            
            const xTranslacao = parseFloat(document.getElementById('xTranslacao').value);
            const yTranslacao = parseFloat(document.getElementById('yTranslacao').value);

            if (!isNaN(xTranslacao) && !isNaN(yTranslacao)) {

                matrizBaseGeral = Translacao(matrizBaseGeral, xTranslacao, -yTranslacao);    
                limpaTela();
                desenharEixos();
                desenharQuadrado(matrizBaseGeral, ctx); 
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;             

            } 
            else {
                alert('Por favor, insira valores numéricos válidos para a translação.');
            }
        }

        else if(document.getElementById('checkEscala').checked){

            const xEscala = parseFloat(document.getElementById('xEscala').value);
            const yEscala = parseFloat(document.getElementById('yEscala').value);

            if(!isNaN(xEscala) && !isNaN(yEscala)){

                matrizBaseGeral = Escala(matrizBaseGeral, xEscala, yEscala);                
                limpaTela();                
                desenharEixos();                
                desenharQuadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;
                
            }
            else {
                alert('Por favor, insira valores numéricos válidos para a Escala.');
            }
        }

        else if(document.getElementById('checkRotacao').checked){
            
            const AnguloRotacao = parseFloat(document.getElementById('AnguloRotacao').value);

            if(!isNaN(AnguloRotacao)){

                matrizBaseGeral = Rotacao(matrizBaseGeral, AnguloRotacao);                
                limpaTela();                
                desenharEixos();
                desenharQuadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;

            }
            else {
                alert('Por favor, insira valores numéricos válidos para a Rotação.');
            }
        }

        else if(document.getElementById('checkCisalhamento').checked){

            const valorCisalhamentoX = parseFloat(document.getElementById('xCisalhamento').value);
            const valorCisalhamentoY = parseFloat(document.getElementById('yCisalhamento').value);
            
            if(valorCisalhamentoX === 0){

                matrizBaseGeral = cisalhamentoY(matrizBaseGeral, -valorCisalhamentoY);
                limpaTela();
                desenharEixos();
                desenharQuadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;

            }
            else if(valorCisalhamentoY === 0){

                matrizBaseGeral = cisalhamentoX(matrizBaseGeral, -valorCisalhamentoX);
                limpaTela();
                desenharEixos();
                desenharQuadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;

            }
            else if(!isNaN(valorCisalhamentoX) && !isNaN(valorCisalhamentoY)){

                matrizBaseGeral = cisalhamentoX(matrizBaseGeral, -valorCisalhamentoX);
                matrizBaseGeral = cisalhamentoY(matrizBaseGeral, -valorCisalhamentoY);
                limpaTela();
                desenharEixos();
                desenharQuadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;

            } 
            else{
                alert("Digite os valores de cisalhamento.\nCaso NÃO deseje cisalhar em algum eixo, digite o valor 0.");
            }
        }
        
        else if (document.getElementById('checkReflexao').checked) {
            
            if (document.getElementById('xReflexao').checked && !document.getElementById('yReflexao').checked) {
                
                matrizBaseGeral = ReflexaoX(matrizBaseGeral);                
                limpaTela();                
                desenharEixos();                
                desenharQuadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;

            }
            else if (document.getElementById('yReflexao').checked && !document.getElementById('xReflexao').checked) {
                
                matrizBaseGeral = ReflexaoY(matrizBaseGeral);                
                limpaTela();                
                desenharEixos();                
                desenharQuadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;

            }
            else if(document.getElementById('xReflexao').checked && document.getElementById('yReflexao').checked){
                
                matrizBaseGeral = ReflexaoX(matrizBaseGeral);
                matrizBaseGeral = ReflexaoY(matrizBaseGeral);
                limpaTela();                
                desenharEixos();                
                desenharQuadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;

            } 
            else{
                alert("Marque alguma opção de REFLEXÃO!!");
            }
        }

    }           

    // Adiciona ouvintes de eventos aos checkboxes
    adicionarOuvintesCheckbox();

});