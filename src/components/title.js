import { getTextComponent } from '../utils/helpers.js'

export const title = {
  type: 'div',
  props: {
    class: 'container',
    children: [
      {
        type: 'h1',
        props: {
          class: 'principal',
          children: [
            getTextComponent('Calculadora de Preço do Papel Higiênico'),
          ],
        },
      },
    ],
  },
}
