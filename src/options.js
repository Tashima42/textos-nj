const options = {
  "PEDIDOS": {
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
      {"tipo": "data"},
      {"tipo": "data"},
      {
        "tipo": "texto",
        "valores": ["gerente", "caixa"]
      },
      {"tipo": "data"},
      {
        "tipo": "multiplos-textos",
        "valores": [
          "horas extras, consideradas as excedentes à sexta hora diária e trigésima semanal, durante todo o período contratual, com divisor 150, adicional 50% e 100%, com reflexos;",
          "lorem ipsum dolor sit amet;",
          "que a Justiça do Trabalho é absolutamente incompetente para processar e julgar assuntos que tratem de previdência privada, como é o caso da FUNCEF;"
        ],
      }
    ]
  },
  "PRELIMINAR DE CONTESTAÇÃO": {
    "textoBase": "Na sua defesa a CAIXA alegou preliminarmente: /%1%/",
    "opcoes": [
      {
        "tipo": "multiplos-textos",
        "valores": [
          "que a Justiça do Trabalho é absolutamente incompetente para processar e julgar assuntos que tratem de previdência privada, como é o caso da FUNCEF",
          "Lorem Ipsum"
        ]
      }
    ]
  }
}
export default options
