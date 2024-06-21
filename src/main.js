// Importando estilos, componentes, serviços e utilitários
import './assets/styles/main.css'
import { renderElement } from './utils/renderElement.js'
import { title } from './components/title.js'
import { details } from './components/form.js'
import { table } from './components/table.js'
import { footer } from './layout/footer.js'
import { showDadosSalvos } from './services/showDadosSalvos.js'
import { showSnackbar } from './utils/showSnackbar.js'
import { dropdown } from './components/dropdown'

/**
 * Função principal para inicializar a aplicação quando o DOM estiver totalmente carregado.
 * A função tenta renderizar os componentes h1, details, table e footer no elemento com o ID 'app'.
 * Em seguida, tenta mostrar os dados salvos usando a função 'showDadosSalvos'.
 * Se ocorrer um erro durante a inicialização, a função exibe uma mensagem de erro usando a função 'showSnackbar'.
 */
const main = () => {
  try {
    // Seleciona o elemento com o ID 'app' para renderizar os componentes
    const app = document.querySelector('#app')

    // Renderiza o componente h1 dentro do elemento 'app'
    renderElement(title, true, app)

    // Renderiza o componente details dentro do elemento 'app'
    renderElement(details, true, app)

    // renderElement(dropdown, true, app)
    // Renderiza o componente table dentro do elemento 'app'
    renderElement(table, true, app)

    // Renderiza o componente footer fora do elemento 'app' (provavelmente no final da página)
    renderElement(footer, true)

    // Mostra os dados salvos, se houver algum
    showDadosSalvos()
  } catch (error) {
    // Exibe uma mensagem de erro se ocorrer um problema durante a inicialização
    showSnackbar('Erro ao carregar a aplicação!', 5000)
    console.error(error)
  }
}

// Adiciona um evento ao documento para chamar a função 'main' quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', main)
