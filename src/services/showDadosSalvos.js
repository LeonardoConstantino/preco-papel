import { itens } from './localStorageHandle.js'
import { addDadosTabela } from './addDadosTabela.js'

/**
 * Função para exibir os dados salvos.
 *
 * @example
 * // Exemplo de uso:
 * showDadosSalvos();
 * // Isso irá iterar sobre cada item em 'itens' e adicionar os dados à tabela.
 */
export const showDadosSalvos = () => {
  itens.forEach((item) => {
    addDadosTabela(item)
  })
}
