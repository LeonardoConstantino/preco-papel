import sortAscending from '../assets/images/sort-ascending.svg'
import sortDescending from '../assets/images/sort-descending.svg'
import { addDadosTabela } from './addDadosTabela'
import { itens } from './localStorageHandle'

/**
 * Atualiza o conteúdo de um botão dropdown com base no conteúdo de outro botão.
 *
 * @param {HTMLElement} dropdownBtn - O elemento HTML do botão dropdown que será atualizado.
 * @param {HTMLElement} btn - O elemento HTML do botão cujo conteúdo será copiado para o dropdown.
 *
 * @example
 * // Exemplo de uso:
 * // HTML:
 * // <button id="dropdownButton">Dropdown</button>
 * // <button id="sourceButton">Source</button>
 *
 * // JavaScript:
 * const dropdownBtn = document.getElementById('dropdownButton');
 * const btn = document.getElementById('sourceButton');
 * updateDropdownButton(dropdownBtn, btn); // Atualiza o dropdown com o conteúdo do botão "Source"
 */
const updateDropdownButton = (dropdownBtn, btn) => {
  dropdownBtn.innerHTML = btn.innerHTML
}

/**
 * Alterna a ordem de classificação de um botão entre ascendente e descendente.
 *
 * @param {HTMLElement} btn - O elemento HTML do botão que será atualizado com o novo estado de ordenação.
 * @param {boolean} isAscending - Indica se a ordenação deve ser ascendente (true) ou descendente (false).
 *
 * @example
 * // Exemplo de uso:
 * // HTML:
 * // <button id="sortButton" data-sort="sortAscending">Sort</button>
 *
 * // JavaScript:
 * const sortBtn = document.getElementById('sortButton');
 * let ascending = true;
 * toggleSortOrder(sortBtn, ascending); // Alterna o estado de ordenação para descendente
 */
const toggleSortOrder = (btn, isAscending) => {
  btn.dataset.sort = isAscending ? 'sortDescending' : 'sortAscending'
}

/**
 * Atualiza o ícone de ordenação de um botão com base na direção da ordenação.
 *
 * @param {HTMLElement} btnI - O elemento HTML do ícone de ordenação que será atualizado.
 * @param {boolean} isAscending - Indica se a ordenação está em ordem ascendente (true) ou descendente (false).
 *
 * @example
 * // Exemplo de uso:
 * // HTML:
 * // <div id="sortIcon"></div>
 *
 * // JavaScript:
 * const sortIcon = document.getElementById('sortIcon');
 * let ascending = true;
 * updateSortIcon(sortIcon, ascending); // Atualiza o ícone de ordenação para a direção ascendente
 */
const updateSortIcon = (btnI, isAscending) => {
  btnI.style.backgroundImage = `url("${
    isAscending ? sortDescending : sortAscending
  }")`
}

/**
 * Ordena um array de objetos com base em um determinado tipo de propriedade.
 * @param {Array<Object>} items - O array de objetos a ser ordenado.
 * @param {string} type - O tipo de propriedade pela qual os objetos devem ser ordenados.
 *   Pode ser 'nome', 'tipoFolha' ou qualquer outra propriedade numérica existente nos objetos.
 * @param {boolean} isAscending - Se verdadeiro, ordena em ordem ascendente; caso contrário, em ordem descendente.
 * @returns {Array<Object>} Um novo array ordenado com base na propriedade especificada.
 * @example
 * // Exemplo de uso para ordenar objetos por nome em ordem ascendente
 * const sortedItems = sortItems(itemsArray, 'nome', true);
 */
const sortItems = (items, type, isAscending) => {
  return items.slice().sort((a, b) => {
    if (type === 'nome' || type === 'tipoFolha') {
      return isAscending
        ? a[type].localeCompare(b[type])
        : b[type].localeCompare(a[type])
    }
    return isAscending ? a[type] - b[type] : b[type] - a[type]
  })
}

/**
 * Atualiza o conteúdo de uma tabela HTML com uma lista ordenada de itens.
 * Limpa a tabela e adiciona os dados da lista ordenada.
 *
 * @param {HTMLTableElement} tabela - Elemento de tabela HTML a ser atualizado.
 * @param {Array} sortedList - Lista ordenada de itens a serem adicionados à tabela.
 * @returns {void}
 *
 * @example
 * // Exemplo de uso:
 * const tabela = document.getElementById('minhaTabela');
 * const listaOrdenada = [...];
 * updateTable(tabela, listaOrdenada);
 */
const updateTable = (tabela, sortedList) => {
  tabela.innerHTML = ''
  sortedList.forEach((item) => {
    addDadosTabela(item, true)
  })
}

/**
 * Manipula a ordenação e atualização de uma tabela de itens após um evento de clique em botão de ordenação.
 *
 * @param {MouseEvent} e - Objeto de evento de clique que acionou a função.
 * @returns {void}
 *
 * @example
 * // Exemplo de uso:
 * const botao = document.getElementById('botaoOrdenar');
 * botao.addEventListener('click', handleSortList);
 */
export const handleSortList = (e) => {
  const btn = e.currentTarget
  const btnI = btn.children[1]
  const dropdownBtn = btn.closest('.dropdown')?.firstChild
  const type = btn.dataset.type
  const isAscending = btn.dataset.sort === 'sortAscending'
  const tabela = document.querySelector('#papelTable > tbody')

  if (!dropdownBtn || !tabela) return

  updateDropdownButton(dropdownBtn, btn)
  toggleSortOrder(btn, isAscending)
  updateSortIcon(btnI, isAscending)

  const sortedList = sortItems(itens, type, isAscending)

  updateTable(tabela, sortedList)
}
