export function cohenSutherland(x1, y1, x2, y2, xmin, ymin, xmax, ymax) {

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

        
        if (codigo1 == 0 && codigo2 == 0) {// reta dentro da area de recorte
            aceito = true;
            feito = true;
        } else if ((codigo1 & codigo2) != 0) {// Totalmente fora da area de recorte
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
        //retorna os pontos da reja recortada para ser redenhada no canvas
        return {x1, y1, x2, y2};
    } else {
        return null;
    }
}