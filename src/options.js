const options = {
  "pedidos": {
    "textoBase": "/%1%/ da CAIXA, /%2%/ em /%3%/. Desligou-se em /%4%/, por meio de adesão ao PADV/PAA. Ocupou no período não prescrito o cargo comissionado de/a função gratificada de /%5%/. Ajuizou ação trabalhista em /%6%/, onde pleiteou a condenação da CAIXA, em síntese, nos seguintes itens: /%7%/",
    "opcoes": [
      {
        "tipo": "texto",
        "valores": ["Ex-empregado", "Ex-empregada"]
      },
      {
        "tipo": "texto",
        "valores": ["admitido", "admitida"]
      },
      {"tipo": "data", "valores": ["01/03/2022"]},
      {"tipo": "data", "valores": ["01/03/2022"]},
      {
        "tipo": "texto",
        "valores": ["gerente", "caixa"]
      },
      {"tipo": "data", "valores": ["01/03/2022"]},
      {
        "tipo": "multiplos-textos",
        "valores": ["horas extras, consideradas as excedentes à sexta hora diária e trigésima semanal, durante todo o período contratual, com divisor 150, adicional 50% e 100%, com reflexos;", "lorem ipsum dolor sit amet"],
      },
    ]
  }
}
export default options
