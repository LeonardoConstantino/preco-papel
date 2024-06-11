/**
 * Função para salvar um item no localStorage.
 *
 * @param {string} nome - O nome da chave sob a qual o item será armazenado.
 * @param {*} item - O item a ser armazenado.
 *
 * @example
 * // Exemplo de uso:
 * salvaLocalStorage('preco-papel', { itens: [] });
 * // Isso irá armazenar um objeto com uma propriedade 'itens' vazia no localStorage sob a chave 'preco-papel'.
 */
export const salvaLocalStorage = (nome, item) => {
	localStorage.setItem(nome, JSON.stringify(item))
}

/**
 * Constante para armazenar os dados recuperados do localStorage.
 * Se não houver dados no localStorage sob a chave 'preco-papel', um objeto com uma propriedade 'itens' vazia será usado como valor padrão.
 *
 * @type {Object}
 */
export const dados = JSON.parse(localStorage.getItem('preco-papel')) || {
	itens: [],
}

/**
 * Constante para armazenar os itens recuperados dos dados.
 *
 * @type {Array}
 */
export const itens = dados.itens
