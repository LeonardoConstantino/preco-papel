import { submitHandle } from '../services/submitHandle.js'
import { capitalizeFirstLetter, getTextComponent } from '../utils/helpers.js'
import { getDetails } from './details.js'

const getLabel = (para, content) => {
	return {
		type: 'label',
		props: {
			for: para,
			children: [getTextComponent(content)],
		},
	}
}

const getInput = (type, name, placeholder, required = false) => {
	const input = {
		type: 'input',
		props: {
			type,
			name,
			id: name,
			placeholder,
		},
	}

	if (required) input.props['required'] = ''

	return input
}

const getOption = (value) => {
	return {
		type: 'option',
		props: {
			value: value,
			children: [getTextComponent(capitalizeFirstLetter(value))],
		},
	}
}

const labelNomePapel = getLabel('nome', 'Nome do Papel Higiênico:')
const inputNomePapel = getInput('text', 'nome', 'Coloque o nome do papel', true)

const labelTipoFolha = getLabel('tipoFolha', 'Tipo de Folha:')
const selectTipoFolha = {
	type: 'select',
	props: {
		id: 'tipoFolha',
		name: 'tipoFolha',
		required: '',
		children: [
			getOption('simples'),
			getOption('dupla'),
			getOption('tripla'),
		],
	},
}

const labelMetrosRolo = getLabel('metrosRolo', 'Quantidade de Metros por Rolo:')
const inputMetrosRolo = getInput('number', 'metrosRolo', '', true)

const labelQuantidadeRolos = getLabel('quantidadeRolos', 'Quantidade de Rolos:')
const inputQuantidadeRolos = getInput('number', 'quantidadeRolos', '', true)

const labelPrecoPacote = getLabel(
	'precoPacote',
	'Preço do Pacote de Papel (R$):'
)
const inputPrecoPacote = getInput('number', 'precoPacote', '', true)

const btnSubmit = {
	type: 'button',
	props: {
		type: 'submit',
		children: [getTextComponent('Calcular')],
	},
}

const form = {
	type: 'form',
	props: {
		id: 'papelForm',
		onSubmit: submitHandle,
		children: [
			labelNomePapel,
			inputNomePapel,
			labelTipoFolha,
			selectTipoFolha,
			labelMetrosRolo,
			inputMetrosRolo,
			labelQuantidadeRolos,
			inputQuantidadeRolos,
			labelPrecoPacote,
			inputPrecoPacote,
			btnSubmit,
		],
	},
}

const textOpem = 'Esconder formulário'
const textClose = 'Mostrar formulário'

export const details = getDetails(textOpem, textClose, true, form)
