import { getDetails } from '../components/details.js'
import { getTextComponent, getComponent } from '../utils/helpers.js'
import copy from '../assets/images/copy.svg'

const currentYear = getTextComponent(` ${new Date().getFullYear()}`)
const autor = getTextComponent(' Leonardo H. Constantino')
const textOpem = 'Click para fechar.'
const textClose = `Sobre: Aplicativo para acabar com o “drama do rolo” na hora da compra! Click para saber mais.`
const contentDetails = getTextComponent(
  'A “Calculadora de Preço do Papel Higiênico” é uma ferramenta online intuitiva que promete acabar com a indecisão na hora de escolher o papel higiênico com o melhor custo-benefício. Com um design simplificado, o aplicativo permite aos usuários inserir detalhes como o nome do papel, tipo de folha, metros por rolo, quantidade de rolos e preço do pacote. Após o preenchimento dessas informações, um simples clique no botão “Calcular” revela qual opção de papel higiênico é mais econômica, baseando-se no preço por metro ajustado. Além disso, a aplicação oferece uma tabela comparativa e a possibilidade de esconder o formulário para uma visualização mais clara dos resultados, tornando a experiência de compra mais eficiente e agradável.'
)

const details = getDetails(
  textOpem,
  textClose,
  false,
  getComponent('p', contentDetails)
)

const icone = {
  type: 'i',
  props: {
    style: `background-image: url(${copy})`,
  },
}

export const footer = {
  type: 'footer',
  props: {
    children: [
      details,
      getComponent(
        'p',
        getComponent('span', icone),
        getComponent('span', currentYear),
        getComponent('span', autor)
      ),
    ],
  },
}
