// Importando estilos, componentes, serviços e utilitários
import './assets/styles/main.css';
import { renderElement } from './utils/renderElement.js';
import { h1 } from './components/h1.js';
import { details } from './components/form.js';
import { table } from './components/table.js';
import { footer } from './layout/footer.js';
import { showDadosSalvos } from './services/showDadosSalvos.js';
import { showSnackbar } from './utils/showSnackbar.js';

/**
 * Função para inicializar a aplicação quando o DOM estiver totalmente carregado.
 * A função tenta renderizar os componentes h1, details, table e footer no elemento com o ID 'app'.
 * Em seguida, tenta mostrar os dados salvos usando a função 'showDadosSalvos'.
 * Se ocorrer um erro durante a inicialização, a função exibe uma mensagem de erro usando a função 'showSnackbar'.
 */
document.addEventListener('DOMContentLoaded', () => {
    try {
        const app = document.querySelector('#app');

        renderElement(h1, true, app);
        renderElement(details, true, app);
        renderElement(table, true, app);
        renderElement(footer, true);

        showDadosSalvos();
    } catch (error) {
        showSnackbar('Erro ao carregar a aplicação!', 5000);
        console.error(error);
    }
});
