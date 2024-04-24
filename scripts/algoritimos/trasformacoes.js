import { setarDadosParaSaidaDeDados, setarDadosParaSaidaDeDadosMatrizes } from '../utils/utils.js'
import { multiplicarMatrizes } from '../utils/produtoDeMatrizes.js'

// Função de Translação
export function Translacao(matrizBase, tx, ty) {    
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
export function Escala(matrizBase, sx, sy) {
    
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
export function Rotacao(matrizBase, angulo) {
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
export function ReflexaoX(matrizBase) {
    
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
export function ReflexaoY(matrizBase) {
    
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
export function cisalhamentoX(matrizBase, shx){
    
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
export function cisalhamentoY(matrizBase, shy){
    
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