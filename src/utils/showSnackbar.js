import { renderElement } from './renderElement.js'
import { getSnackbar } from '../components/snackbar.js'
import { getDiv } from '../components/div.js'

/**
 * Conjunto para armazenar os IDs dos snackbars atualmente visíveis.
 * @type {Set<string>}
 */
const activeSnackbar = new Set()

/**
 * Função para criar e exibir uma mensagem Snackbar.
 *
 * @param {string} text - O texto da mensagem a ser exibida.
 * @param {number} duration - A duração em milissegundos durante a qual a mensagem será exibida.
 *
 * @example
 * // Exemplo de uso:
 * createSnackbar("Operação realizada com sucesso!", 5000);
 * // Exibirá uma mensagem Snackbar com o texto "Operação realizada com sucesso!" por 5 segundos.
 */
const createSnackbar = (text, duration) => {
  let snackbarContainer = document.querySelector('.snackbar-container')
  if (!snackbarContainer) {
    snackbarContainer = renderElement(
      getDiv({ class: 'snackbar-container' }),
      true
    )
  }
  const snackbar = renderElement(getSnackbar(text), true, snackbarContainer)
  snackbar.className = 'show'

  // Adicionar ID único ao snackbar
  const snackbarId = `snackbar-${Date.now()}`
  snackbar.dataset['id'] = snackbarId
  activeSnackbar.add(snackbarId)

  // Remover o snackbar após a duração especificada
  setTimeout(() => {
    snackbar.remove()
    activeSnackbar.delete(snackbarId)

    // Remover o container se não houver mais snackbars ativos
    if (activeSnackbar.size === 0 && snackbarContainer) {
      snackbarContainer.remove()
    }
  }, duration)
}

/**
 * Função para exibir uma mensagem Snackbar.
 *
 * @param {string} text - O texto da mensagem a ser exibida.
 * @param {number} [duration=3000] - A duração em milissegundos durante a qual a mensagem será exibida. O padrão é 3000 (3 segundos).
 *
 * @example
 * // Exemplo de uso:
 * showSnackbar("Operação realizada com sucesso!", 5000);
 * // Exibirá uma mensagem Snackbar com o texto "Operação realizada com sucesso!" por 5 segundos.
 */
export const showSnackbar = (text, duration = 3000) => {
  createSnackbar(text, duration)
}
