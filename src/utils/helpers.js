// src/utils/helpers.js
/**
 * Capitaliza a primeira letra de uma string.
 * @param {string} str - A string a ser capitalizada.
 * @returns {string} - A string com a primeira letra em maiúsculo.
 */
export const capitalizeFirstLetter = (str) => {
	// Verifica se o argumento fornecido é uma string não vazia
	if (typeof str !== 'string' || str.length === 0) {
		return ''
	}
	// Converte a primeira letra para maiúsculo e junta com o restante da string
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Cria um componente genérico com filhos.
 * @param {string} type - O tipo do elemento a ser criado.
 * @param {...Object} children - Os componentes filhos a serem incluídos no elemento.
 * @returns {ComponentConfig} As configurações para criar um componente genérico.
 */
export const getComponent = (type, ...children) => {
	return {
		type: type,
		props: {
			children: [...children],
		},
	}
}

/**
 * Cria um componente de texto.
 * @param {string} text - O texto a ser exibido.
 * @returns {TextComponentConfig} As configurações para criar um componente de texto.
 */
export const getTextComponent = (text) => {
	return {
		type: null,
		props: {
			nodeValue: text,
		},
	}
}

/**
 * Dados necessários para calcular o preço por metro ajustado.
 * @typedef {Object} PriceCalculationData
 * @property {string} tipoFolha - O tipo de folha (simples, dupla ou tripla).
 * @property {number} metrosRolo - O número de metros por rolo.
 * @property {number} quantidadeRolos - A quantidade de rolos.
 * @property {number} precoPacote - O preço do pacote.
 */

/**
 * Calcula o preço por metro ajustado com base nos dados fornecidos.
 * @param {PriceCalculationData} dados - Os dados necessários para o cálculo.
 * @returns {number} O preço por metro ajustado.
 */
export const calculatePricePerMeterAdjusted = (dados) => {
	const { tipoFolha, metrosRolo, quantidadeRolos, precoPacote } = dados

	// Calculando o preço por metro ajustado de acordo com o tipo de folha
	const ajusteFolha = {
		simples: 1,
		dupla: 2,
		tripla: 3,
	}

	return (
		parseFloat(precoPacote) /
		(parseFloat(metrosRolo) * parseInt(quantidadeRolos)) /
		ajusteFolha[tipoFolha]
	)
}
