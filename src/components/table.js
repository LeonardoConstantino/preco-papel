import { getComponent, getTextComponent } from '../utils/helpers.js'
import { dropdown } from './dropdown.js'

export const table = getComponent('div', dropdown, {
  type: 'table',
  props: {
    id: 'papelTable',
    children: [
      getComponent(
        'thead',
        getComponent(
          'tr',
          getComponent('th', getTextComponent('Nome')),
          getComponent('th', getTextComponent('Tipo de Folha')),
          getComponent('th', getTextComponent('Metros por Rolo')),
          getComponent('th', getTextComponent('Quantidade de Rolos')),
          getComponent('th', getTextComponent('Preço do Pacote')),
          getComponent('th', getTextComponent('Preço por Metro ajustado'))
        )
      ),
      getComponent('tbody'),
    ],
  },
})
