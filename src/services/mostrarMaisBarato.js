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
export const mostrarMaisBarato = (sort = false) => {
  if (sort) return

  // Seleciona todas as linhas da tabela
  const trs = document.querySelectorAll('tr')

  // Se não houver linhas, encerra a função
  if (itens.length === 0) return

  // Remove qualquer destaque das linhas
  trs.forEach((tr) => tr.classList.remove('destaque'))

  // Encontra o item mais barato na lista de itens
  const itemMaisBarato = itens.sort(
    (a, b) =>
      calculatePricePerMeterAdjusted(a) - calculatePricePerMeterAdjusted(b)
  )[0]

  // Seleciona a linha correspondente ao item mais barato
  const linhaMaisBarata = document.querySelector(
    `[data-id="${itemMaisBarato.id}"]`
  )

  // Adiciona uma classe de destaque à linha mais barata
  linhaMaisBarata?.classList.add('destaque')

  // Seleciona o elemento onde será exibida a informação sobre o item mais barato
  let divResult = document.querySelector('#result')

  // Se o elemento não existir, cria um novo e insere antes da tabela
  if (!divResult) {
    const tabela = document.querySelector('form')
    divResult = renderElement(getDiv({ class: 'result', id: 'result' }), true)
    tabela.parentElement.insertAdjacentElement('afterend', divResult)
  }

  // Exibe a informação sobre o item mais barato
  divResult.innerHTML = `O papel higiênico mais barato é: <span class="destaque">${
    itemMaisBarato.nome
  }</span> com preço por metro ajustado de <span class="destaque">R$ ${itemMaisBarato.precoPorMetro
    .toFixed(4)
    .toString()
    .replace('.', ',')}</span><br><br>
	<small>O preço por metro é ajustado como se todos fossem folhas simples, para manter a consistência dos valores</small>`
}
;`
[
    ["Premium Sof", 2, 20, 12, 16.59],
    ["Perfumado", 1, 60, 12, 16.60],
    ["Atualle", 2, 20, 12, 13.16],
    ["Personal", 2, 30, 4, 9.96],
    ["Bianco", 1, 60, 4, 7.74],
    ["Mili Bianco",1, 100, 12, 38.65]
]
`
