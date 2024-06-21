import { showSnackbar } from './showSnackbar.js'

/**
 * Função para validar campos de texto não vazios.
 *
 * @param {string} value - O valor do campo de texto a ser validado.
 * @param {string} fieldName - O nome do campo de texto a ser validado.
 *
 * @returns {string|null} Retorna o valor se o campo de texto for válido, caso contrário, retorna null.
 *
 * @example
 * // Exemplo de uso:
 * const nome = validateTextField("João", "Nome");
 * // nome = "João"
 *
 * const sobrenome = validateTextField("", "Sobrenome");
 * // sobrenome = null
 * // Exibirá uma mensagem de erro: "Por favor, preencha o campo Sobrenome corretamente."
 */
const validateTextField = (value, fieldName) => {
  if (!value.trim()) {
    const errorMessage = `Por favor, preencha o campo ${fieldName} corretamente.`
    showSnackbar(errorMessage)
    console.error(errorMessage)
    return null
  }
  return value.trim()
}

/**
 * Função para validar campos de números flutuantes.
 *
 * @param {string} value - O valor do campo a ser validado.
 * @param {string} fieldName - O nome do campo a ser validado.
 *
 * @returns {number|null} Retorna o valor flutuante se o campo for válido, caso contrário, retorna null.
 *
 * @example
 * // Exemplo de uso:
 * const peso = validateFloatField("75.5", "Peso");
 * // peso = 75.5
 *
 * const altura = validateFloatField("abc", "Altura");
 * // altura = null
 * // Exibirá uma mensagem de erro: "Por favor, preencha o campo Altura com um número válido."
 */
const validateFloatField = (value, fieldName) => {
  const floatValue = parseFloat(value)
  if (isNaN(floatValue) || floatValue <= 0) {
    const errorMessage = `Por favor, preencha o campo ${fieldName} com um número válido.`
    showSnackbar(errorMessage)
    console.error(errorMessage)
    return null
  }
  return floatValue
}

/**
 * Função para validar campos de números inteiros.
 *
 * @param {string} value - O valor do campo a ser validado.
 * @param {string} fieldName - O nome do campo a ser validado.
 *
 * @returns {number|null} Retorna o valor inteiro se o campo for válido, caso contrário, retorna null.
 *
 * @example
 * // Exemplo de uso:
 * const idade = validateIntField("25", "Idade");
 * // idade = 25
 *
 * const quantidade = validateIntField("abc", "Quantidade");
 * // quantidade = null
 * // Exibirá uma mensagem de erro: "Por favor, preencha o campo Quantidade com um número válido."
 */
const validateIntField = (value, fieldName) => {
  const intValue = parseInt(value, 10)
  if (isNaN(intValue) || intValue <= 0) {
    const errorMessage = `Por favor, preencha o campo ${fieldName} com um número válido.`
    showSnackbar(errorMessage)
    console.error(errorMessage)
    return null
  }
  return intValue
}

/**
 * Função para sanitizar os campos de um objeto.
 *
 * @param {Object} obj - O objeto a ser sanitizado.
 * @param {string} obj.nome - O nome a ser validado.
 * @param {string} obj.tipoFolha - O tipo de folha a ser validado.
 * @param {string} obj.metrosRolo - Os metros por rolo a serem validados.
 * @param {string} obj.quantidadeRolos - A quantidade de rolos a ser validada.
 * @param {string} obj.precoPacote - O preço do pacote a ser validado.
 * @param {string} obj.id - O ID do objeto.
 *
 * @returns {Object|null} Retorna o objeto sanitizado se todos os campos forem válidos, caso contrário, retorna null.
 *
 * @example
 * // Exemplo de uso:
 * const produto = {
 *     nome: "Papel Higiênico",
 *     tipoFolha: "Dupla",
 *     metrosRolo: "30",
 *     quantidadeRolos: "4",
 *     precoPacote: "5.99",
 *     id: "123"
 * };
 *
 * const produtoSanitizado = sanitizaCampos(produto);
 * // produtoSanitizado = {
 * //     nome: "Papel Higiênico",
 * //     tipoFolha: "Dupla",
 * //     metrosRolo: 30,
 * //     quantidadeRolos: 4,
 * //     precoPacote: 5.99,
 * //     id: "123"
 * // }
 */
export const sanitizaCampos = (obj) => {
  const sanitizedObj = {
    nome: validateTextField(obj.nome, 'Nome'),
    tipoFolha: validateTextField(obj.tipoFolha, 'Tipo de Folha'),
    metrosRolo: validateFloatField(obj.metrosRolo, 'Metros por Rolo'),
    quantidadeRolos: validateIntField(
      obj.quantidadeRolos,
      'Quantidade de Rolos'
    ),
    precoPacote: validateFloatField(obj.precoPacote, 'Preço do Pacote'),
    id: obj.id,
  }

  // Handle case where validation fails for any field
  if (Object.values(sanitizedObj).includes(null)) {
    showSnackbar('Erro na validação dos campos.')
    console.error('Erro na validação dos campos.', sanitizedObj)
    return null
  }

  return sanitizedObj
}
