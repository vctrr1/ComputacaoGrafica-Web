import { ativaPixel, setarDadosParaSaidaDeDados } from '../utils/utils.js'

export function DDA(X1, Y1, X2, Y2, tipoCanvas) {
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

export function retaPontoMedio(X1, Y1, X2, Y2, tipoCanvas) {
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