import { DDA, retaPontoMedio } from './algoritimos/reta.js';
import { circunferenciaPolinomial, circunferenciaTrigonometrica, circunferenciaPontoMedio } from './algoritimos/circunferencia.js';
import { elipsePontoMedio } from './algoritimos/elipse.js';
import { Translacao, Escala, Rotacao, ReflexaoX, ReflexaoY, cisalhamentoX, cisalhamentoY } from './algoritimos/trasformacoes.js';
import { ativaPixel, limpaTela, limparSaidaDeDadosTextarea, setarDadosParaSaidaDeDados } from './utils/utils.js';
import { cohenSutherland } from './algoritimos/cohenShutherland.js';
import { processarListaViewport } from './viewPort/viewPort.js';
import * as desenhar from './algoritimos/desenho.js';

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

    const btnLimparElipse = document.getElementById('btnLimparElipse');
    const btnDesenharElipse = document.getElementById('btnDesenharElipse');
    
    const btnAplicaTransformacoes = document.getElementById('btnAplicaTransformacoes');
    const btnLimpaTransformacoes = document.getElementById('btnLimpaTransformacoes');

    const btnDesenharRetaCohen = document.getElementById('btnDesenharRetaCohen');
    const btnLimparRetaCohen = document.getElementById('btnLimparRetaCohen');
    const btnAplicarCohen = document.getElementById('btnAplicarCohen');
    const inputRetas = document.getElementById('inputRetas');

    const btnLimparSaidaTextarea = document.getElementById('btnLimparSaidaTextarea');

    const btnTransferirParaViewPort = document.getElementById('btnTransferirParaViewPort');
    const btnLimparViewPort = document.getElementById('btnLimparViewPort');
    btnTransferirParaViewPort.disabled = true;
    btnLimparViewPort.disabled = true;

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

    //seleciona os elementos de input da Elipse
    const inputOrigemX = document.getElementById("inputElipseX");
    const inputOrigemY = document.getElementById("inputElipseY");
    const inputElipseRaioX = document.getElementById("inputElipseRaioX");
    const inputElipseRaioY = document.getElementById("inputElipseRaioY");

    // Seletor para todos os checkboxes dentro de .configPanel2D_opcoes_transformacoes
    const checkboxes = document.querySelectorAll('.configPanel2D_opcoes_transformacoes input[type="checkbox"]');
    const inputOpcoes = document.getElementById("opcoes");

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

    /* **************************** Matriz de Transformação ***************************************** */
    let matrizBaseGeral = [
        [0, 50, 50, 0],
        [0, 0, -50, -50],
        [1, 1, 1, 1]
    ];
    
    /* *************************** Area de Recorte COHEN-SUTHERLAND ********************************** */
    let matrizCoordRetas = [];
    const matrizAreaDeRecorte = desenhar.areaDeRecorteCohen(altura, largura); //a funcao areaDeRecorteCohen retorna uma matriz com as coordenadas exatas do quadrado central desenhado no canvas para ser desenhado como area de recorte
    //const matrizAreaDeRecorte = [
    //    [-250, 250, 250, -250],
    //    [-200, -200, 200, 200],
    //    [1, 1, 1, 1]
    //];
    
    /* ****************************** Lista para saida da viewPort *********************************** */
    var listaParaAViewPort = [];

    /* ***************************************** BOTOES ********************************************* */

    // Adiciona um ouvinte de evento para o movimento do mouse no canvas para atualização das coordenadas
    canvas.addEventListener("mousemove", atualizarCoordenadas);

    // Ouvinte de evento para o botão "LimparPixel"
    btnLimparPixel.addEventListener('click', () => {
        //desativa os botoes da viewPort apos limpar desenho
        btnTransferirParaViewPort.disabled = true;

        // Limpa o conteúdo do canvas
        limpaTela(ctx);
        limparSaidaDeDadosTextarea();
    });

    // Ouvinte de evento para o botão "LimparRetas"
    btnLimparReta.addEventListener('click', () => {
        //desativa os botoes da viewPort apos limpar desenho
        btnTransferirParaViewPort.disabled = true;

        // Limpa o conteúdo do canvas
        limpaTela(ctx);
        limparSaidaDeDadosTextarea();
    });

    // Ouvinte de evento para o botão "LimparCircunferencias"
    btnLimparCircunferencia.addEventListener('click', () =>{
        //desativa os botoes da viewPort apos limpar desenho
        btnTransferirParaViewPort.disabled = true;

        // Limpa o conteúdo do canvas
        limpaTela(ctx);
        limparSaidaDeDadosTextarea();
    });

    btnLimparElipse.addEventListener('click', () => {
        //desativa os botoes da viewPort apos limpar desenho
        btnTransferirParaViewPort.disabled = true;

        // Limpa o conteúdo do canvas
        limpaTela(ctx);
        limparSaidaDeDadosTextarea();
    });

    // Ouvinte de evento para o botão "LimparTransformações"
    btnLimpaTransformacoes.addEventListener('click', () => {
        //desativa os botoes da viewPort apos limpar desenho
        btnTransferirParaViewPort.disabled = true;

        matrizBaseGeral = [
            [0, 50, 50, 0],
            [0, 0, -50, -50],
            [1, 1, 1, 1]
        ];

        limpaTela(ctx);
        desenhar.Eixos2D(ctx, canvas);
        desenhar.Quadrado(matrizBaseGeral, ctx);
        limparSaidaDeDadosTextarea();
    });

    // Ouvinte de evento para o botão "LimparRetaCohen"
    btnLimparRetaCohen.addEventListener('click', () => {
        limpaTela(ctx);
        desenhar.CohenSutherland(ctx, altura,largura);
        desenhar.Quadrado(matrizAreaDeRecorte, ctx);
        limparSaidaDeDadosTextarea();
    });

    btnLimparViewPort.addEventListener('click', () => {
        //desativa botão de limpar apos click
        btnLimparViewPort.disabled = true;

        limpaTela(ctxViewPort);
    });

    //Ouvinte de evento para o botão limpar saida do textarea
    btnLimparSaidaTextarea.addEventListener('click', () => {
        limparSaidaDeDadosTextarea();
    });

    // Ouvinte de evento para o botão "DesenharPixel"
    btnDesenharPixel.addEventListener('click', () => {

        // Obtém os valores dos inputs
        let valorX = parseInt(inputXPixel.value);
        let valorY = parseInt(inputYPixel.value);

        if(isNaN(valorX) || isNaN(valorY)){
            alert("Digite os valores do ponto.");
        }
        else{
            ativaPixel(canvas.getContext('2d'), valorX, valorY);            
            setarDadosParaSaidaDeDados("\nFunção de Ativação de PIXEL.\n\n" + 
                "P( X: " + valorX.toFixed(0) + " , Y: " + valorY.toFixed(0) + " )\n"
            );
        }        
        
    });

    // Ouvinte de evento para o botão "DesenharRetas"
    btnDesenharReta.addEventListener('click', () => {
        //ativa o botão de transferir para viewPort
        btnTransferirParaViewPort.disabled = false;

        limparSaidaDeDadosTextarea();
        // Obtém os valores dos inputs
        let valorXP1 = parseInt(inputXP1.value);
        let valorYP1 = parseInt(inputYP1.value);
        let valorXP2 = parseInt(inputXP2.value);
        let valorYP2 = parseInt(inputYP2.value);

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
            let opcaoSelecionada = document.getElementById('opcoes').value;

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
        //console.log(listaParaAViewPort);
        
    });

    //Ouvinte de evento para o botão "Desenhar Circunferencia"
    btnDesenharCircunferencia.addEventListener('click', () => {
        //ativa o botão de transferir para viewPort
        btnTransferirParaViewPort.disabled = false;
        limparSaidaDeDadosTextarea();
        //Obtem o raio
        let raio = parseInt(inputRaio.value);

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
            let opcaoSelecionada = document.getElementById('opcoes').value;

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

    //Ouvinte de evento para o botão "Desenhar Elipse"
    btnDesenharElipse.addEventListener('click', () => {
        
        let OrigemX = parseInt(inputOrigemX.value);
        let OrigemY = parseInt(inputOrigemY.value);
        let inputRaioX = parseInt(inputElipseRaioX.value);
        let inputRaioY = parseInt(inputElipseRaioY.value);

        if(isNaN(inputRaioX) || isNaN(inputRaioY)){
            alert("Digite valores validos.");
        }else {
            //se deixar o input em branco abribui 0 as variaveis para ser desenhado com o centro na origem
            if(!OrigemX && !OrigemY){OrigemX = 0; OrigemY = 0;}
            //chama o algoritmo de desenho da elipse
            elipsePontoMedio(OrigemX, OrigemY, inputRaioX, inputRaioY, ctx);
        }

    });

    // Aplica a transformação desejada quando o botão é clicado
    btnAplicaTransformacoes.addEventListener('click', function() {
        //ativa o botão de transferir para viewPort
        btnTransferirParaViewPort.disabled = false;
        limparSaidaDeDadosTextarea();
        listaParaAViewPort = [];
        aplicarTransformacao();
    });

    btnDesenharRetaCohen.addEventListener('click', () => {
        let quantRetas = parseInt(inputRetas.value);

        if(isNaN(quantRetas) || quantRetas <= 0){
            alert("Digite os valores validos para os pontos.");
        }
        //limpa as coordenadas anteriores
        matrizCoordRetas = []

        //preenche a matriz com coordenadas aleatorias no intervalo de -700 e 700
        for(let i = 0; i < quantRetas; i++){
            const min = -700;
            const max = 700;
            
            let X1 = Math.random() * (max - min) + min;
            let Y1 = Math.random() * (max - min) + min;
            let X2 = Math.random() * (max - min) + min;
            let Y2 = Math.random() * (max - min) + min;

            matrizCoordRetas.push({ X1, Y1, X2, Y2 }); // Armazena as coordenadas no array
            DDA(X1, Y1, X2, Y2, ctx); //deseha a reta
        }

    });

    btnAplicarCohen.addEventListener('click', () => {
        //armazenando xmin ymin xmax ymax da area de recort
        const xmin = matrizAreaDeRecorte[0][3];
        const ymin = matrizAreaDeRecorte[1][0];
        const xmax = matrizAreaDeRecorte[0][1];
        const ymax = matrizAreaDeRecorte[1][2];

        //limpa a tela antes de redesenhar as retas
        limpaTela(ctx);
        desenhar.CohenSutherland(ctx, altura, largura);
        desenhar.Quadrado(matrizAreaDeRecorte, ctx);
        limparSaidaDeDadosTextarea();
        setarDadosParaSaidaDeDados("\nNovas Coordenadas das Retas: \n\n");
        
        //percorre a matriz de coordenadas e redesenha as retas que foram retornadas do alg de cohen
        for(const coord of matrizCoordRetas){
            let newCoords = cohenSutherland(coord.X1, coord.Y1, coord.X2, coord.Y2, xmin, ymin, xmax, ymax);

            if (newCoords) { //se o retorno de cohenSutherland n for null redesenha as retas recortadas
                const { x1, y1, x2, y2 } = newCoords;
                DDA(x1, y1, x2, y2, ctx); 
            }

        }

    });

    // Ouvinte para o botão transferir para ViewPort
    btnTransferirParaViewPort.addEventListener('click', () => {
        //ativa o botão de limpar viewPort
        btnLimparViewPort.disabled = false;

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
        //console.log(`Xmin: ${Xmin}, Xmax: ${Xmax}, Ymin: ${Ymin}, Ymax: ${Ymax}`);
        //console.log("listaParaAViewPort", listaParaAViewPort);
        // Chama a função processarListaViewport com os valores calculados
        processarListaViewport(listaParaAViewPort, Xmin, Xmax, Ymin, Ymax, Umin, Umax, Vmin, Vmax, ctxViewPort);
    });

    //Ouvinte para verificar se a opção selecionada foi a de transformações ou Cohen e desenhar no canvas
    inputOpcoes.addEventListener('change', () => {
        var opcaoSelecionada = inputOpcoes.value;
        if(opcaoSelecionada === "opcao7"){
            limpaTela(ctx);
            limparSaidaDeDadosTextarea();
            desenhar.Eixos2D(ctx, canvas);
        }
        else if(opcaoSelecionada === "opcao8"){
            limpaTela(ctx);
            limparSaidaDeDadosTextarea();
            desenhar.Eixos2D(ctx, canvas);
            desenhar.Quadrado(matrizBaseGeral, ctx);
        }
        else if(opcaoSelecionada === "opcao9"){
            limpaTela(ctx);
            limparSaidaDeDadosTextarea();
            desenhar.Eixos2D(ctx, canvas);
            desenhar.Quadrado(matrizBaseGeral, ctx);
        }
        else if(opcaoSelecionada === "opcao10"){
            limpaTela(ctx);
            limparSaidaDeDadosTextarea();
            desenhar.CohenSutherland(ctx, altura,largura);
            desenhar.Quadrado(matrizAreaDeRecorte, ctx);
        }
        else{
            limpaTela(ctx);
            limparSaidaDeDadosTextarea();
        }        
    });
    
    /* Função para adicionar ouvintes de eventos aos checkboxes
    function adicionarOuvintesCheckbox() {
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', function() {
            });
        });
    }*/

    // Função para aplicar a transformação desejada
    function aplicarTransformacao() {
        
        if (document.getElementById('checkTranslacao').checked) {            
            const xTranslacao = parseFloat(document.getElementById('xTranslacao').value);
            const yTranslacao = parseFloat(document.getElementById('yTranslacao').value);

            if (!isNaN(xTranslacao) && !isNaN(yTranslacao)) {
                matrizBaseGeral = Translacao(matrizBaseGeral, xTranslacao, -yTranslacao);    
                limpaTela(ctx);
                desenhar.Eixos2D(ctx, canvas);
                desenhar.Quadrado(matrizBaseGeral, ctx); 
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral; 
            } 
            else {
                alert('Por favor, insira valores numéricos válidos para a translação.');
            }
        }

        if(document.getElementById('checkEscala').checked){
            const xEscala = parseFloat(document.getElementById('xEscala').value);
            const yEscala = parseFloat(document.getElementById('yEscala').value);

            if(!isNaN(xEscala) && !isNaN(yEscala)){
                matrizBaseGeral = Escala(matrizBaseGeral, xEscala, yEscala);                
                limpaTela(ctx);                
                desenhar.Eixos2D(ctx, canvas);             
                desenhar.Quadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;                
            }
            else {
                alert('Por favor, insira valores numéricos válidos para a Escala.');
            }
        }

        if(document.getElementById('checkRotacao').checked){            
            const AnguloRotacao = parseFloat(document.getElementById('AnguloRotacao').value);

            if(!isNaN(AnguloRotacao)){
                matrizBaseGeral = Rotacao(matrizBaseGeral, AnguloRotacao);                
                limpaTela(ctx);                
                desenhar.Eixos2D(ctx, canvas);
                desenhar.Quadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;
            }
            else {
                alert('Por favor, insira valores numéricos válidos para a Rotação.');
            }
        }

        if(document.getElementById('checkCisalhamento').checked){
            const valorCisalhamentoX = parseFloat(document.getElementById('xCisalhamento').value);
            const valorCisalhamentoY = parseFloat(document.getElementById('yCisalhamento').value);
            
            if(valorCisalhamentoX === 0){
                matrizBaseGeral = cisalhamentoY(matrizBaseGeral, -valorCisalhamentoY);
                limpaTela(ctx);
                desenhar.Eixos2D(ctx, canvas);
                desenhar.Quadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;
            }
            else if(valorCisalhamentoY === 0){
                matrizBaseGeral = cisalhamentoX(matrizBaseGeral, -valorCisalhamentoX);
                limpaTela(ctx);
                desenhar.Eixos2D(ctx, canvas);
                desenhar.Quadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;
            }
            else if(!isNaN(valorCisalhamentoX) && !isNaN(valorCisalhamentoY)){
                matrizBaseGeral = cisalhamentoX(matrizBaseGeral, -valorCisalhamentoX);
                matrizBaseGeral = cisalhamentoY(matrizBaseGeral, -valorCisalhamentoY);
                limpaTela(ctx);
                desenhar.Eixos2D(ctx, canvas);
                desenhar.Quadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;
            } 
            else{
                alert("Digite os valores de cisalhamento.\nCaso NÃO deseje cisalhar em algum eixo, digite o valor 0.");
            }
        }
        
        if (document.getElementById('checkReflexao').checked) {            
            if (document.getElementById('xReflexao').checked && !document.getElementById('yReflexao').checked) {                
                matrizBaseGeral = ReflexaoX(matrizBaseGeral);                
                limpaTela(ctx);                
                desenhar.Eixos2D(ctx, canvas);               
                desenhar.Quadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;
            }
            else if (document.getElementById('yReflexao').checked && !document.getElementById('xReflexao').checked) {                
                matrizBaseGeral = ReflexaoY(matrizBaseGeral);                
                limpaTela(ctx);                
                desenhar.Eixos2D(ctx, canvas);             
                desenhar.Quadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;
            }
            else if(document.getElementById('xReflexao').checked && document.getElementById('yReflexao').checked){                
                matrizBaseGeral = ReflexaoX(matrizBaseGeral);
                matrizBaseGeral = ReflexaoY(matrizBaseGeral);
                limpaTela(ctx);                
                desenhar.Eixos2D(ctx, canvas);               
                desenhar.Quadrado(matrizBaseGeral, ctx);
                listaParaAViewPort = [];
                listaParaAViewPort = matrizBaseGeral;
            } 
            else{
                alert("Marque alguma opção de REFLEXÃO!!");
            }
        }
    }

});