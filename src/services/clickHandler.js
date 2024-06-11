import { salvaLocalStorage, dados, itens } from './localStorageHandle.js';
import { mostrarMaisBarato } from './mostrarMaisBarato.js';
import { showSnackbar } from '../utils/showSnackbar.js';

/**
 * Função para atualizar o localStorage.
 *
 * @param {string} id - O ID do item a ser removido.
 */
const atualizaLocalStorage = (id) => {
    const index = itens.findIndex((i) => i.id === +id);
    itens.splice(index, 1);
    salvaLocalStorage('preco-papel', dados);
};

const timeoutRemove = 3000;
let clickTimeout = null;
let clickCount = 0;
let cronToRemove = null;

/**
 * Função para remover um elemento.
 *
 * @param {HTMLElement} clickable - O elemento a ser removido.
 */
const removeElement = (clickable) => {
    atualizaLocalStorage(clickable.dataset.id);
    clickable.remove();
    clearTimeout(clickTimeout);
    clickTimeout = null;
    cronToRemove = null;
    clickCount = 0;
    mostrarMaisBarato();
};

/**
 * Função para lidar com cliques em um elemento.
 *
 * @param {Event} e - O evento de clique.
 *
 * @example
 * // Exemplo de uso:
 * elemento.addEventListener('click', clickHandler);
 */
export const RemoveItemHandler = (e) => {
    const ele = e.target.parentElement;

    clickCount++;

    if (clickCount === 1) {
        // Primeira vez clicado, espera pela segunda vez
        clickTimeout = setTimeout(() => {
            // Resetar contador e timeout após 5 segundos se nenhum segundo clique ocorrer
            clickCount = 0;
            clickTimeout = null;
        }, timeoutRemove);
    } else if (clickCount === 2) {
        // Segundo clique dentro de 5 segundos
        if (clickTimeout) {
            ele.classList.toggle('scale-out-horizontal');
            showSnackbar('Removendo item, clique novamente para cancelar!');

            // Se o segundo clique for dentro de 5 segundos, remova o elemento após o tempo restante
            cronToRemove = setTimeout(() => {
                removeElement(ele);
            }, timeoutRemove);
        }
    } else if (clickCount === 3) {
        // Terceiro clique cancela a remoção
        clearTimeout(clickTimeout);
        clearTimeout(cronToRemove);
        clickTimeout = null;
        cronToRemove = null;
        clickCount = 0;
        ele.classList.toggle('scale-out-horizontal');
        ele.classList.toggle('scale-in-hor-center');
        setTimeout(() => {
            ele.classList.remove('scale-in-hor-center');
        }, 500);
        showSnackbar('Ação cancelada!');
    }
};
