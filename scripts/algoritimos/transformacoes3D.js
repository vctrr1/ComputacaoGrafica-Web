import * as THREE from "../tree/three.module.js";




// Função para aplicar uma transformação ao cubo
function test(cube, tipo, valores) {
    let matrix = new THREE.Matrix4();

    switch (tipo) {
        case 'translacao':
            const [tx, ty, tz] = valores;
            matrix.makeTranslation(tx, ty, tz);
            break;
        case 'rotacao':
            const [angle, axis] = valores;
            switch (axis) {
                case 'x':
                    matrix.makeRotationX(angle);
                    break;
                case 'y':
                    matrix.makeRotationY(angle);
                    break;
                case 'z':
                    matrix.makeRotationZ(angle);
                    break;
                default:
                    console.error('Eixo de rotação inválido');
            }
            break;
        case 'escala':
            const [sx, sy, sz] = valores;
            matrix.makeScale(sx, sy, sz);
            break;
        case 'cisalhamento':
            // Valores devem ser passados como array de 9 elementos
            if (valores.length === 9) {
                matrix.set(
                    valores[0], valores[1], valores[2], 0,
                    valores[3], valores[4], valores[5], 0,
                    valores[6], valores[7], valores[8], 0,
                    0, 0, 0, 1
                );
            } else {
                console.error('Valores de cisalhamento inválidos');
            }
            break;
        default:
            console.error('Tipo de transformação inválido');
    }

    cube.applyMatrix4(matrix);
}