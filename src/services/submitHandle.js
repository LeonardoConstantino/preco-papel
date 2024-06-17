import { sanitizaCampos } from '../utils/validators.js'
import { addDadosTabela } from './addDadosTabela.js'
import { showSnackbar } from '../utils/showSnackbar.js'
import { calculatePricePerMeterAdjusted } from '../utils/helpers.js'
import { salvaLocalStorage, dados, itens } from './localStorageHandle.js'

/**
 * Função para lidar com a submissão do formulário.
 *
 * @param {Event} e - O evento de submissão do formulário.
 *
 * @example
 * // Exemplo de uso:
 * document.querySelector('form').addEventListener('submit', submitHandle);
 */
export const submitHandle = (e) => {
	try {
		e.preventDefault()

		// Obtém os valores dos elementos do formulário
		const formElements = document.querySelector('#papelForm').elements

		const objPrecoPapel = {};

		for (let ele of formElements) {
			if (ele.name) {
				objPrecoPapel[ele.name] = ele.value;
			}
		}

		objPrecoPapel['id'] = Date.now();
		
		const dadosSanitizados = sanitizaCampos(objPrecoPapel)

		if (!dadosSanitizados) {
			showSnackbar('Erro na validação dos campos.')
			return
		}

		dadosSanitizados['precoPorMetro'] =
			calculatePricePerMeterAdjusted(dadosSanitizados)

		addDadosTabela(dadosSanitizados)

		itens.push(dadosSanitizados)

		itens.forEach((item) => (item['lowPrice'] = false))

		itens.sort(
			(a, b) =>
				calculatePricePerMeterAdjusted(a) -
				calculatePricePerMeterAdjusted(b)
		)[0]['lowPrice'] = true

		salvaLocalStorage('preco-papel', dados)

		// Limpar o formulário após submissão
		document.querySelector('form').reset()

		showSnackbar(
			`Papel higiênico ${dadosSanitizados.nome || ''} de R$ ${parseFloat(
				dadosSanitizados.precoPacote
			).toFixed(2)} adicionado`
		)
	} catch (error) {
		showSnackbar('Erro ao processar a submissão.')
		console.error(error)
	}
}
