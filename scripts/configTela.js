window.onload = function() {
    
    //Manipulação de elementos para serem visíveis ou não, de acordo com opções selecionadas
    const checkbox2D = document.getElementById('2D');
    const checkbox3D = document.getElementById('3D');
    const div2D = document.querySelector('.configPanel2D');
    const div3D = document.querySelector('.configPanel3D');
    const selectOpcoes = document.getElementById('opcoes');
    const divPixel = document.querySelector('.configPanel2D_opcoes_pixel');
    const divRetas = document.querySelector('.configPanel2D_opcoes_retas');
    const divCircunferencias = document.querySelector('.configPanel2D_opcoes_circunferencias');
    const divTransformacoes = document.querySelector('.configPanel2D_opcoes_transformacoes');
    const divCohenSutherland = document.querySelector('.configPanel2D_cohen-sutherland');
    
    // Seletor para todos os checkboxes dentro de .configPanel2D_opcoes_transformacoes
    const checkboxes = document.querySelectorAll('.configPanel2D_opcoes_transformacoes input[type="checkbox"]');

    // inputs de entradas das transformações
    const xTranslacao = document.getElementById('xTranslacao');
    const yTranslacao = document.getElementById('yTranslacao');
    const xEscala = document.getElementById('xEscala');
    const yEscala = document.getElementById('yEscala');
    const AnguloRotacao = document.getElementById('AnguloRotacao');
    const xCisalhamento = document.getElementById('xCisalhamento');
    const yCisalhamento = document.getElementById('yCisalhamento');
    const xReflexao =  document.getElementById('xReflexao');
    const yReflexao = document.getElementById('yReflexao');


    //Função para desativar TODAS as entradas de valores
    function desativaEntradasDeValoresDasTransformacoes(){
        xTranslacao.disabled = true;
        yTranslacao.disabled = true;
        xEscala.disabled = true;
        yEscala.disabled = true;
        AnguloRotacao.disabled = true;
        xCisalhamento.disabled = true;
        yCisalhamento.disabled = true;
        xReflexao.disabled = true;
        yReflexao.disabled = true;
        xReflexao.checked = false;
        yReflexao.checked = false;

        limpaCampoDasEntradas();
    }

    //Função para limpar os campos de entradas
    function limpaCampoDasEntradas(){
        xTranslacao.value = "";
        yTranslacao.value = "";
        xEscala.value = "";
        yEscala.value = "";
        AnguloRotacao.value = "";
        xCisalhamento.value = "";
        yCisalhamento.value = "";
    }

    //Chama a função que desativa as entradas assim que a página é carregada
    desativaEntradasDeValoresDasTransformacoes();

    // Ativa/mostra as divs que correspondem a marcação do input do value
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
                case 'opcao8':
                    divCohenSutherland.style.display = 'block';
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
            divCohenSutherland.style.display = 'none';
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
        divCohenSutherland.style.display = 'none';

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
            case 'opcao8':
                divCohenSutherland.style.display = 'block';
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
            case 'opcao8':
                divCohenSutherland.style.display = 'block';
                break;
            default:
                break;
        }
    }
 
    // Adiciona um ouvinte de evento de mudança para cada checkbox
    checkboxes.forEach(function(checkbox) {
        
        checkbox.addEventListener('change', function() {

            switch(this.id){
                case "checkTranslacao":
                    xTranslacao.disabled = !this.checked;
                    yTranslacao.disabled = !this.checked;
                    break;

                case "checkEscala":
                    xEscala.disabled = !this.checked;
                    yEscala.disabled = !this.checked;
                    break;

                case "checkRotacao":
                    AnguloRotacao.disabled = !this.checked;
                    break;

                case "checkCisalhamento":
                    xCisalhamento.disabled = !this.checked;
                    yCisalhamento.disabled = !this.checked;
                    break;

                case "checkReflexao":
                    xReflexao.disabled = !this.checked;
                    yReflexao.disabled = !this.checked;
                break;
                    
            }

        
            // Se o checkbox foi marcado
            if (this.checked) {
                //console.log(this.checked);

                const parent = this.closest('.configPanel2D_opcoes_transformacoes');
                const checkboxesInSub = parent.querySelectorAll('.transformacoes2D_sub input[type="checkbox"]');
                let checkReflexaoMarcado = false;

                // Verifica se algum checkbox diferente de "xReflexao" e "yReflexao" está marcado
                checkboxesInSub.forEach(function(cb) {
                    if (cb.id !== "xReflexao" && cb.id !== "yReflexao" && cb.checked) {
                        checkReflexaoMarcado = true;
                    }
                });

                // Mantem "checkReflexao" marcado se "xReflexao" ou "yReflexao" estiverem marcados
                if ((checkbox.id === "xReflexao" || checkbox.id === "yReflexao") && checkReflexaoMarcado) {
                    document.getElementById("checkReflexao").checked = true;
                }
            }

            
        });
    });


};