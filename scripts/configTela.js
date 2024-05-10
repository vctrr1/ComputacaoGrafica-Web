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
    const divElipse = document.querySelector('.configPanel2D_opcoes_elipse');
    
    //checkBoxes das transformações/Composição
    const checkTranslacao = document.getElementById('checkTranslacao');
    const checkEscala = document.getElementById('checkEscala');
    const checkRotacao = document.getElementById('checkRotacao');
    const checkCisalhamento = document.getElementById('checkCisalhamento');
    const checkReflexao = document.getElementById('checkReflexao');

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

    //variavel para controle dos checkboxes das transformações/composição
    let verificaTipoDeFuncionamentoCheckBoxes = "";

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

    //Desativa todas as divs referentes a div 2D
    function desativaDivs2D(){
        divPixel.style.display = 'none';
        divRetas.style.display = 'none';
        divCircunferencias.style.display = 'none';
        divTransformacoes.style.display = 'none';
        divCohenSutherland.style.display = 'none';
        divElipse.style.display = 'none';
    }

    //Chama a função que desativa as entradas assim que a página é carregada
    desativaEntradasDeValoresDasTransformacoes();

    // Ativa/mostra as divs que correspondem a marcação do input do value
    checkbox2D.addEventListener('change', function() {        
        
        desativaDivs2D();

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
                    divElipse.style.display = 'block';
                    break;
                    
                case 'opcao8':
                    divTransformacoes.style.display = 'block';
                    break;

                case 'opcao9':
                    break;
                    
                case 'opcao10':
                    divCohenSutherland.style.display = 'block';
                    break;

                default:
                    break;
            }
        } 
        else {
            div2D.style.display = 'none';
            // Esconde todas as outras divs relacionadas à opção 2D
            desativaDivs2D();
        }
    });

    /* ****** PARA O 3D
    checkbox3D.addEventListener('change', function() {
        if (this.checked) {
            checkbox2D.checked = false;
            div3D.style.display = 'block';
            div2D.style.display = 'none';
        } else {
            div3D.style.display = 'none';
        }
    });
    */

     // Evento de alteração do select
    selectOpcoes.addEventListener('change', function() {
        // Esconde todas as divs relacionadas à opção 2D
        desativaDivs2D();

        // Exibe a div correspondente à opção selecionada no select
        switch (selectOpcoes.value) {
            case 'opcao1':
                divPixel.style.display = 'block';
                verificaTipoDeFuncionamentoCheckBoxes = "";
                break;

            case 'opcao2':
            case 'opcao3':
                divRetas.style.display = 'block';
                verificaTipoDeFuncionamentoCheckBoxes = "";
                break;

            case 'opcao4':
            case 'opcao5':
            case 'opcao6':
                divCircunferencias.style.display = 'block';
                verificaTipoDeFuncionamentoCheckBoxes = "";
                break;

            case 'opcao7':
                divElipse.style.display = 'block';
                verificaTipoDeFuncionamentoCheckBoxes = "";
                break;
                
            case 'opcao8':
                divTransformacoes.style.display = 'block';
                verificaTipoDeFuncionamentoCheckBoxes = 'opcao8';
                break;
                    
            case 'opcao9':
                divTransformacoes.style.display = 'block';
                verificaTipoDeFuncionamentoCheckBoxes = "opcao9";
                break;
                
            case 'opcao10':
                divCohenSutherland.style.display = 'block';
                verificaTipoDeFuncionamentoCheckBoxes = "";
                break;

            default:
                break;
        }
    });    

    // função para desmarcar todos os checkboxes
    function desmarcaCheckBoxesTransComp(){
        checkTranslacao.checked = false;
        checkEscala.checked = false;
        checkRotacao.checked = false;
        checkCisalhamento.checked = false;
        checkReflexao.checked = false;
    }

    // Adiciona um ouvinte de evento de mudança para cada checkbox
    checkboxes.forEach(function(checkbox) {        
        checkbox.addEventListener('click', function() {

            //Informações para transformações dos checkboxes
            if(verificaTipoDeFuncionamentoCheckBoxes === 'opcao8'){
                if(this.id === "checkTranslacao"){                
                    if(checkbox.checked){
                        desmarcaCheckBoxesTransComp();
                        checkTranslacao.checked = true;
                        limpaCampoDasEntradas();
                        desativaEntradasDeValoresDasTransformacoes();                        
                        xTranslacao.disabled = false;
                        yTranslacao.disabled = false;
                    }
                    else{
                        desmarcaCheckBoxesTransComp();
                        limpaCampoDasEntradas();
                        desativaEntradasDeValoresDasTransformacoes();
                    }                
                }
                else if(this.id === "checkEscala"){                
                    if(checkbox.checked){
                        desmarcaCheckBoxesTransComp();
                        checkEscala.checked = true;
                        limpaCampoDasEntradas();
                        desativaEntradasDeValoresDasTransformacoes();
                        xEscala.disabled = false;
                        yEscala.disabled = false;
                    }
                    else{
                        desmarcaCheckBoxesTransComp();
                        limpaCampoDasEntradas();
                        desativaEntradasDeValoresDasTransformacoes();
                    }                
                }
                else if(this.id === "checkRotacao"){                
                    if(checkbox.checked){
                        desmarcaCheckBoxesTransComp();
                        checkRotacao.checked = true;
                        limpaCampoDasEntradas();
                        desativaEntradasDeValoresDasTransformacoes();
                        AnguloRotacao.disabled = false;
                    }
                    else{
                        desmarcaCheckBoxesTransComp();
                        limpaCampoDasEntradas();
                        desativaEntradasDeValoresDasTransformacoes();
                    }                
                }
                else if(this.id === "checkCisalhamento"){                
                    if(checkbox.checked){
                        desmarcaCheckBoxesTransComp();
                        checkCisalhamento.checked = true;
                        limpaCampoDasEntradas();
                        desativaEntradasDeValoresDasTransformacoes();
                        xCisalhamento.disabled = false;
                        yCisalhamento.disabled = false;
                    }
                    else{
                        desmarcaCheckBoxesTransComp();
                        limpaCampoDasEntradas();
                        desativaEntradasDeValoresDasTransformacoes();
                    }                
                }
                else if(this.id === "checkReflexao"){                
                    if(checkbox.checked){
                        desmarcaCheckBoxesTransComp();
                        checkReflexao.checked = true;
                        desativaEntradasDeValoresDasTransformacoes();
                        xReflexao.disabled = false;
                        yReflexao.disabled = false;
                    }
                    else{
                        desmarcaCheckBoxesTransComp();
                        desativaEntradasDeValoresDasTransformacoes();
                    }                
                }
            }

            //Informações para composição dos checkboxes
            else if(verificaTipoDeFuncionamentoCheckBoxes === 'opcao9'){
                if(this.id === "checkTranslacao"){                
                    if(checkbox.checked){
                        xTranslacao.disabled = false;
                        yTranslacao.disabled = false;
                    }
                    else{
                        checkTranslacao.checked = false;
                        xTranslacao.value = "";
                        yTranslacao.value = "";
                        xTranslacao.disabled = true;
                        yTranslacao.disabled = true;
                    }
                }
                else if(this.id === "checkEscala"){                
                    if(checkbox.checked){                        
                        xEscala.disabled = false;
                        yEscala.disabled = false;
                    }
                    else{
                        checkEscala.checked = false;
                        xEscala.value = "";
                        yEscala.value = "";
                        xEscala.disabled = true;
                        yEscala.disabled = true;
                    }                
                }
                else if(this.id === "checkRotacao"){                
                    if(checkbox.checked){
                        AnguloRotacao.disabled = false;
                    }
                    else{
                        checkRotacao.checked = false;
                        AnguloRotacao.value = "";
                        AnguloRotacao.disabled = true;
                    }                
                }

                else if(this.id === "checkCisalhamento"){                
                    if(checkbox.checked){
                        xCisalhamento.disabled = false;
                        yCisalhamento.disabled = false;
                    }
                    else{
                        checkCisalhamento.checked = false;
                        xCisalhamento.value = "";
                        yCisalhamento.value = "";
                        xCisalhamento.disabled = true;
                        yCisalhamento.disabled = true;
                    }                
                }
                else if(this.id === "checkReflexao"){                
                    if(checkbox.checked){
                        xReflexao.disabled = false;
                        yReflexao.disabled = false;
                    }
                    else{
                        checkReflexao.checked = false;
                        xReflexao.checked = false;
                        yReflexao.checked = false;
                        xReflexao.disabled = true;
                        yReflexao.disabled = true;

                    }                
                }
            }
            
        });
        
    });

};