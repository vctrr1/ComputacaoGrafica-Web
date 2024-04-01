
window.onload = function() {
    
    const checkbox2D = document.getElementById('2D');
    const checkbox3D = document.getElementById('3D');
    const div2D = document.querySelector('.configPanel2D');
    const div3D = document.querySelector('.configPanel3D');
    const selectOpcoes = document.getElementById('opcoes');
    const divPixel = document.querySelector('.configPanel2D_opcoes_pixel');
    const divRetas = document.querySelector('.configPanel2D_opcoes_retas');
    const divCircunferencias = document.querySelector('.configPanel2D_opcoes_circunferencias');
    const divTransformacoes = document.querySelector('.configPanel2D_opcoes_transformacoes');

    checkbox2D.addEventListener('change', function() {
        if (this.checked) {
            checkbox3D.checked = false;
            div2D.style.display = 'block';
            div3D.style.display = 'none';

            // Exibe a div correspondente à opção selecionada no select
            switch (selectOpcoes.value) {
                case 'opcao1':
                    divPixel.style.display = 'block';
                    break;
                case 'opcao2':
                case 'opcao3':
                    divRetas.style.display = 'block';
                    break;
                case 'opcao4':
                case 'opcao5':
                case 'opcao6':
                    divCircunferencias.style.display = 'block';
                    break;
                case 'opcao7':
                    divTransformacoes.style.display = 'block';
                    break;
                default:
                    break;
            }
        } else {
            div2D.style.display = 'none';
            // Esconde todas as outras divs relacionadas à opção 2D
            divPixel.style.display = 'none';
            divRetas.style.display = 'none';
            divCircunferencias.style.display = 'none';
            divTransformacoes.style.display = 'none';
        }
    });

    checkbox3D.addEventListener('change', function() {
        if (this.checked) {
            checkbox2D.checked = false;
            div3D.style.display = 'block';
            div2D.style.display = 'none';
        } else {
            div3D.style.display = 'none';
        }
    });

    // Evento de alteração do select
    selectOpcoes.addEventListener('change', function() {
        // Esconde todas as divs relacionadas à opção 2D
        divPixel.style.display = 'none';
        divRetas.style.display = 'none';
        divCircunferencias.style.display = 'none';
        divTransformacoes.style.display = 'none';

        // Exibe a div correspondente à opção selecionada no select
        switch (selectOpcoes.value) {
            case 'opcao1':
                divPixel.style.display = 'block';
                break;
            case 'opcao2':
            case 'opcao3':
                divRetas.style.display = 'block';
                break;
            case 'opcao4':
            case 'opcao5':
            case 'opcao6':
                divCircunferencias.style.display = 'block';
                break;
            case 'opcao7':
                divTransformacoes.style.display = 'block';
                break;
            default:
                break;
        }
    });

    // Verifica se o checkbox "2D" está marcado inicialmente e exibe a div correspondente
    if (checkbox2D.checked) {
        switch (selectOpcoes.value) {
            case 'opcao1':
                divPixel.style.display = 'block';
                break;
            case 'opcao2':
            case 'opcao3':
                divRetas.style.display = 'block';
                break;
            case 'opcao4':
            case 'opcao5':
            case 'opcao6':
                divCircunferencias.style.display = 'block';
                break;
            case 'opcao7':
                divTransformacoes.style.display = 'block';
                break;
            default:
                break;
        }
    }

};