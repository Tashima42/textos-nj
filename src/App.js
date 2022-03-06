import React, {useState, useEffect} from "react"
import {Button, Autocomplete, TextField} from "@mui/material";
import './App.css';
import options from "./options"

function App() {
  const baseText = options.pedidos.textoBase
  const [finalText, setFinalText] = useState(options.pedidos.textoBase)
  const [templateValues, setTemplateValues] = useState([])
  return (
    <div>
      <h3>Pedidos</h3>
      {createComponent()}
      <textarea rows="10" cols="65" type="readonly" value={finalText} />
    </div >
  );

  function createComponent() {
    const t = options.pedidos.opcoes.map((option, index) => {
      const autoCompleteOptions = option.valores
      const id = `${index + 1}${option.tipo === "multiplos-textos" ? "m" : ""}`
      const component = <Autocomplete
        id={id}
        options={autoCompleteOptions}
        sx={{width: 700}}
        renderInput={(params) => <TextField {...params} label={index + 1} />}
        key={index + 1}
        onChange={s}
      />
      return component
    })
    return (
      <form>
        {t}
      </form>
    )
  }
  function s(event, value) {
    if (!value) return
    const id = event.target.id
    const index = id.split('-')[0]
    console.log(id)
    console.log(index)
    templateValues[index] = value
    setTemplateValues(templateValues)
    b()
  }
  function b() {
    let text = baseText
    templateValues.forEach((v, index) => {
      text = text.replace(`/%${index}%/`, v)
    })
    setFinalText(text)
  }
}

export default App;
