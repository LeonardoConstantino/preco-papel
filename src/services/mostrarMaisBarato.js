import { renderElement } from '../utils/renderElement.js'
import { getDiv } from '../components/div.js'
import { itens } from '../services/localStorageHandle.js'
import { calculatePricePerMeterAdjusted } from '../utils/helpers.js'

/**
 * Função para exibir o papel higiênico mais barato.
 *
 * @example
 * // Exemplo de uso:
 * mostrarMaisBarato();
 * // Isso irá iterar sobre cada linha na tabela e destacar a linha com o menor preço por metro ajustado.
 */
/**
 * Destaca o item mais barato na tabela e exibe informações sobre ele.
 */
export const mostrarMaisBarato = () => {
	// Seleciona todas as linhas da tabela
	const trs = document.querySelectorAll('tr')

	// Se não houver linhas, encerra a função
	if (trs.length === 0) return

	// Remove qualquer destaque das linhas
	trs.forEach((tr) => tr.classList.remove('destaque'))

	// Encontra o item mais barato na lista de itens
	const itemMaisBarato = itens.sort(
		(a, b) =>
			calculatePricePerMeterAdjusted(a) -
			calculatePricePerMeterAdjusted(b)
	)[0]

	// Seleciona a linha correspondente ao item mais barato
	const linhaMaisBarata = document.querySelector(
		`[data-id="${itemMaisBarato.id}"]`
	)

	// Adiciona uma classe de destaque à linha mais barata
	linhaMaisBarata.classList.add('destaque')

	// Seleciona o elemento onde será exibida a informação sobre o item mais barato
	let divResult = document.querySelector('#result')

	// Se o elemento não existir, cria um novo e insere antes da tabela
	if (!divResult) {
		const tabela = document.querySelector('#papelTable > tbody')
		divResult = renderElement(
			getDiv({ class: 'result', id: 'result' }),
			true
		)
		tabela.parentElement.insertAdjacentElement('beforeBegin', divResult)
	}

	// Exibe a informação sobre o item mais barato
	divResult.innerHTML = `O papel higiênico mais barato é: <span class="destaque">${
		itemMaisBarato.nome
	}</span> com preço por metro ajustado de <span class="destaque">R$ ${itemMaisBarato.precoPorMetro.toFixed(
		4
	)}</span>`
}

