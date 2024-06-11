import { mostrarMaisBarato } from './mostrarMaisBarato.js'
import {
	capitalizeFirstLetter,
	getComponent,
	getTextComponent,
} from '../utils/helpers.js'
import { renderElement } from '../utils/renderElement.js'
import { RemoveItemHandler } from './clickHandler.js'

/**
 * Função para adicionar dados à tabela.
 *
 * @param {Object} dados - Os dados a serem adicionados à tabela.
 * @param {string} dados.nome - O nome do papel higiênico.
 * @param {string} dados.tipoFolha - O tipo de folha do papel higiênico.
 * @param {string} dados.metrosRolo - A quantidade de metros por rolo do papel higiênico.
 * @param {string} dados.quantidadeRolos - A quantidade de rolos do papel higiênico.
 * @param {string} dados.precoPacote - O preço do pacote do papel higiênico.
 * @param {string} dados.id - O ID do papel higiênico.
 *
 * @example
 * // Exemplo de uso:
 * const dados = {
 *     nome: "Papel Higiênico",
 *     tipoFolha: "Dupla",
 *     metrosRolo: "30",
 *     quantidadeRolos: "4",
 *     precoPacote: "5.99",
 *     id: "123"
 * };
 *
 * addDadosTabela(dados);
 * // Isso irá adicionar uma linha à tabela com os dados fornecidos e destacar o papel higiênico mais barato.
 */
export const addDadosTabela = (dados) => {
	const {
		nome,
		tipoFolha,
		metrosRolo,
		quantidadeRolos,
		precoPacote,
		id,
		precoPorMetro,
		lowPrice,
	} = dados

	// Adicionando os dados na tabela
	const tabela = document
		.getElementById('papelTable')
		.getElementsByTagName('tbody')[0]

	const tr = {
		type: 'tr',
		props: {
			'data-id': id,
			title: 'Dois clicks para remover e mais um para cancelar',
			onclick: RemoveItemHandler,
			class: lowPrice ? 'destaque' : '',
			children: [
				getComponent('td', getTextComponent(nome || 'N/A')),
				getComponent(
					'td',
					getTextComponent(capitalizeFirstLetter(tipoFolha))
				),
				getComponent(
					'td',
					getTextComponent(parseFloat(metrosRolo).toFixed(2))
				),
				getComponent('td', getTextComponent(parseInt(quantidadeRolos))),
				getComponent(
					'td',
					getTextComponent(`R$ ${parseFloat(precoPacote).toFixed(2)}`)
				),
				getComponent(
					'td',
					getTextComponent(`R$ ${precoPorMetro.toFixed(4)}`)
				),
			],
		},
	}

	renderElement(tr, true, tabela)

	// Exibindo o papel higiênico mais barato
	mostrarMaisBarato()
}
