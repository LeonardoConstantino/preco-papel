import { getComponent, getTextComponent } from '../utils/helpers.js'

/**
 * Função para criar um componente de detalhes.
 *
 * @param {string} textOpen - O texto a ser exibido quando o detalhe estiver aberto.
 * @param {string} textClose - O texto a ser exibido quando o detalhe estiver fechado.
 * @param {boolean} open - Indica se o detalhe deve estar aberto inicialmente.
 * @param {...Object} children - Os filhos do componente de detalhes.
 *
 * @returns {Object} Retorna um objeto representando o componente de detalhes.
 *
 * @example
 * // Exemplo de uso:
 * const details = getDetails("Click para fechar.", "Click para saber mais.", false,...children);
 *
 */
export const getDetails = (textOpen, textClose, open, ...children) => {
	const detailsToggleHandler = (e) => {
		const summary = e.target.firstChild
		const details = e.target

		if (details.open) {
			summary.firstElementChild.textContent = textOpen
			summary.nextSibling.classList.add('open')
			return
		}
		summary.firstElementChild.textContent = textClose
		summary.nextSibling.classList.remove('open')
	}

	const details = {
		type: 'details',
		props: {
			ontoggle: detailsToggleHandler,
			children: [
				getComponent(
					'summary',
					getComponent('p', getTextComponent(textClose))
				),
				...children,
			],
		},
	}

	if (open) details.props['open'] = ''

	return details
}
