import sortAscending from '../assets/images/sort-ascending.svg'
import sortDescending from '../assets/images/sort-descending.svg'
import { getComponent } from '../utils/helpers'
import { createButton } from './button'
import { handleSortList } from '../services/handleSortList.js'

const dropbtn = createButton(
  'Preço por Metro ajustado',
  null,
  sortAscending,
  'dropbtn',
  'Ordene a lista'
)

/**
 * Retorna um elemento de lista (li) contendo um botão de ordenação, configurado com nome, tipo e direção opcional.
 *
 * @param {string} name - Nome a ser exibido no botão de ordenação.
 * @param {string} type - Tipo de ordenação associado ao botão.
 * @param {boolean} [down=false] - Indica se a ordenação é descendente (true) ou ascendente (false, padrão).
 * @returns {object} - Elemento de lista (li) configurado com botão de ordenação.
 *
 * @example
 * // Exemplo de uso:
 * const listaElemento = getLi('Nome da Coluna', 'nome', true);
 * // Retorna um elemento de lista com um botão de ordenação descendente para a coluna 'Nome da Coluna' do tipo 'nome'.
 */
const getLi = (name, type, down = false) => {
  const iconVariant = down ? sortDescending : sortAscending

  const li = getComponent(
    'li',
    createButton(
      name,
      (e) => {
        handleSortList(e)
      },
      iconVariant
    )
  )

  li.props.children[0].props['data-type'] = type

  li.props.children[0].props['data-sort'] = 'sortAscending'

  if (down) {
    li.props.children[0].props['data-sort'] = 'sortDescending'
  }

  return li
}

/**
 * Objeto representando uma lista não ordenada (<ul>) com itens de lista.
 * @type {Object}
 * @property {string} type - O tipo de elemento HTML.
 * @property {Object} props - As propriedades do elemento.
 * @property {string} props.class - A classe CSS do elemento.
 * @property {Array<Object>} props.children - Os elementos filhos da lista.
 */
const ul = {
  type: 'ul',
  props: {
    class: 'dropdown-content', // A classe CSS da lista
    children: [
      getLi('Nome', 'nome'),
      getLi('Tipo de Folha', 'tipoFolha'),
      getLi('Metros por Rolo', 'metrosRolo'),
      getLi('Quantidade de Rolos', 'quantidadeRolos'),
      getLi('Preço do Pacote', 'precoPacote'),
      getLi('Preço por Metro ajustado', 'precoPorMetro', true),
    ],
  },
}

/**
 * Cria e renderiza um dropdown no elemento fornecido.
 * @param {HTMLElement} ele - O elemento onde o dropdown será renderizado.
 * @returns {HTMLElement} O elemento raiz do dropdown renderizado.
 */
export const dropdown = {
  type: 'div',
  props: {
    class: 'dropdown', // A classe CSS do dropdown
    children: [dropbtn, ul], // O botão e a lista do dropdown como filhos
  },
}
