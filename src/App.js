import React, {useState, useEffect} from "react"
import {Autocomplete, TextField} from "@mui/material";
import './App.css';
import forms from "./forms"

function App() {
  const formsKeys = Object.keys(forms)
  const [currentForm, setCurrentForm] = useState(formsKeys[0])
  const [baseText, setBaseText] = useState(forms[currentForm].textoBase)
  const [finalText, setFinalText] = useState(baseText)
  const [templateValues, setTemplateValues] = useState([])

  useEffect(() => {
    setTemplateValues([])
    setBaseText(forms[currentForm].textoBase)
  }, [currentForm])

  useEffect(() => {
    setFinalText(baseText)
  }, [baseText])

  return (
    <div className="App">
      <Autocomplete
        className="autocomplete"
        id="forms"
        options={formsKeys}
        sx={{width: 700}}
        renderInput={(params) => <TextField {...params} label="Forms" />}
        onChange={selectCurrentForm}
        defaultValue={formsKeys[0]}
      />
      <h5>Complete os campos</h5>
      <div>
        {createForm()}
      </div>
    </div >
  );

  function selectCurrentForm(_, value) {
    if (!value) return
    setCurrentForm(value)
  }

  function createForm() {
    const createdForms = forms[currentForm].opcoes.map((form, index) => {
      if (form.tipo === "multiplos-textos") {
        return form.valores.map((_, i) => {
          const id = `${index + 1}.${i + 1}`
          const label = form.legenda ? `${id} - ${form.legenda}` : id
          return <Autocomplete
            className="autocomplete"
            id={id}
            options={form.valores}
            sx={{width: 700}}
            renderInput={(params) => <TextField {...params} label={label} />}
            key={id}
            onChange={handleFormValuesChange}
          />
        })
      } else if (form.tipo === "texto") {
        const id = String(index + 1)
        const label = form.legenda ? `${id} - ${form.legenda}` : id
        return <Autocomplete
          className="autocomplete"
          id={id}
          options={form.valores}
          sx={{width: 700}}
          renderInput={(params) => <TextField {...params} label={label} />}
          key={id}
          onChange={handleFormValuesChange}
        />
      } else if (form.tipo === "texto-input") {
        const id = String((index + 1) + "-option")
        const label = form.legenda ? `${index + 1} - ${form.legenda}` : id
        return <TextField
          id={id}
          key={id}
          className="texto-input"
          label={label}
          variant="outlined"
          onChange={handleFormValuesChange}
        />
      }
      return (<div></div>)
    })
    return (
      <form>
        {createdForms}
        <textarea className="final-text" type="readonly" value={finalText} />
      </form>
    )
  }

  function handleFormValuesChange(event, value) {
    if (!value) {
      value = event.target.value
      if (!value) return
    }
    const id = event.target.id
    const index = id.split('-')[0]
    // Handle Itens with multiple valid options
    const multipleItensIndex = index.split(".")
    if (multipleItensIndex && multipleItensIndex.length > 1) {
      if (!templateValues[multipleItensIndex[0]]) templateValues[multipleItensIndex[0]] = []
      templateValues[multipleItensIndex[0]][multipleItensIndex[1]] = value
    } else templateValues[index] = value

    setTemplateValues(templateValues)
    updateFinalText()
  }
  function updateFinalText() {
    let text = baseText
    templateValues.forEach((templateValue, index) => {
      // Handle itens with multiple valid options
      if (Array.isArray(templateValue)) {
        let multipleItens = ""
        templateValue.forEach((item, i) => {
          multipleItens = multipleItens + `${i}) ${item} `
        })
        templateValue = multipleItens
      }
      text = text.replace(`/%${index}%/`, templateValue)
    })
    setFinalText(text)
  }
}

export default App;
