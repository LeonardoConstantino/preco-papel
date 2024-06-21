/**
 * Renderiza um elemento HTML no contêiner especificado.
 *
 * @param {Object} elementConfig - Configuração do elemento a ser renderizado.
 * @param {string|null} elementConfig.type - Tipo de elemento HTML (e.g., 'div', 'span') ou null para nós de texto.
 * @param {Object} [elementConfig.props={}] - Propriedades do elemento HTML.
 * @param {string|number} [elementConfig.props.nodeValue] - Valor do nó de texto (se aplicável).
 * @param {Array<Object>} [elementConfig.props.children] - Filhos do elemento HTML.
 * @param {boolean} [isAppend=false] - Indica se o elemento deve ser adicionado ao contêiner.
 * @param {HTMLElement} [container=document.body] - Contêiner onde o elemento será inserido.
 * @returns {HTMLElement|Text|undefined} - Retorna o elemento criado se `isAppend` for falso.
 * @throws {Error} Se o tipo do elemento for inválido.
 * @throws {Error} Se um valor de atributo for inválido.
 * @throws {Error} Se um listener de evento for inválido.
 * @throws {Error} Se os filhos não forem um array.
 * @example
 *
 * // Exemplo de uso
 * const myElement = {
 *   type: 'button',
 *   props: {
 *     type: 'button',
 *     className: 'btn',
 *     onClick: () => alert('Clicked'),
 *     children: [{ type: null, props: { nodeValue: 'Click me' } }]
 *   }
 * };
 *
 * // Renderiza o elemento no corpo do documento
 * renderElement(myElement, true);
 */
export const renderElement = (
  { type, props = {} },
  isAppend = false,
  container = document.body
) => {
  try {
    // Validação de tipo de elemento
    if (type !== null && type !== undefined && typeof type !== 'string') {
      throw new Error(`Invalid element type: ${type}`)
    }

    // Determina se é um nó de texto
    const isTextElement = type === undefined || type === null
    const element = isTextElement
      ? document.createTextNode(props.nodeValue || '')
      : document.createElement(type)

    if (!isTextElement) {
      /**
       * Verifica se a propriedade é um listener de evento.
       * @param {string} p - Nome da propriedade.
       * @returns {boolean} - Verdadeiro se a propriedade for um listener de evento.
       */
      const isListener = (p) => p.startsWith('on')

      /**
       * Verifica se a propriedade é um atributo HTML.
       * @param {string} p - Nome da propriedade.
       * @returns {boolean} - Verdadeiro se a propriedade for um atributo HTML.
       */
      const isAttribute = (p) =>
        !isListener(p) && p !== 'children' && p !== 'nodeValue'

      // Itera sobre as propriedades do elemento
      Object.keys(props).forEach((p) => {
        if (isAttribute(p)) {
          if (typeof props[p] !== 'string' && typeof props[p] !== 'number') {
            throw new Error(`Invalid attribute value for ${p}: ${props[p]}`)
          }
          element.setAttribute(p, props[p])
        }
        if (isListener(p)) {
          if (typeof props[p] !== 'function') {
            throw new Error(`Invalid event listener for ${p}: ${props[p]}`)
          }
          element.addEventListener(p.toLowerCase().slice(2), props[p])
        }
      })

      // Renderiza os filhos, se houver
      const children = props.children || []
      if (!Array.isArray(children)) {
        throw new Error(`Children should be an array: ${children}`)
      }
      children.forEach((childElement) =>
        renderElement(childElement, true, element)
      )
    }

    if (isAppend) {
      // Adiciona o elemento ao contêiner
      container.appendChild(element)
      return element
    }
    return element
  } catch (error) {
    console.error('Error rendering element:', error.message)
  }
}
