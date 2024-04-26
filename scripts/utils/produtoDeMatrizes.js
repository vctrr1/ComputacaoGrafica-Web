//aqui vai ficar os produtos de matrizes para composicoes de transformações


// Função para multiplicar duas matrizes
export function multiplicarMatrizes(matrizA, matrizB) {
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