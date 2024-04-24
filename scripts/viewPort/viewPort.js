import { multiplicarMatrizes } from '../utils/produtoDeMatrizes.js'
import { DDA } from '../algoritimos/reta.js'
import { circunferenciaPontoMedio } from '../algoritimos/circunferencia.js'
import { Quadrado } from '../algoritimos/desenho.js';

// Função para processar a lista de dados e aplicar a transformação de viewport
export function processarListaViewport(lista, Xmin, Xmax, Ymin, Ymax, Umin, Umax, Vmin, Vmax, tipoCanvas) {
    
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
            const MR = calcularRetaViewport(Xmin, Xmax, Ymin, Ymax, Umin, Umax, Vmin, Vmax);
            const pontosTransformados = entrada.pontos.map(ponto => aplicarTransformacaoViewport(ponto, MR));
            DDA(pontosTransformados[0].x, pontosTransformados[0].y, pontosTransformados[1].x, pontosTransformados[1].y, tipoCanvas);        
        }
    } 
    else if (tipoEntrada === 'circunferencia') {
        for (let entrada of lista) {            
            const raioTransformado = transformarRaio(entrada.raio, M);
            circunferenciaPontoMedio(raioTransformado, tipoCanvas);           
        }
    } 
    else {            
        const matrizViewport = multiplicarMatrizes(M, lista);
        Quadrado(matrizViewport, tipoCanvas);            
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