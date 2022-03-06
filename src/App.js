import React, {useState, useEffect} from "react"
import {Autocomplete, TextField} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import {DatePicker} from "@mui/lab";
import './App.css';
import options from "./options"

function App() {
  const optionsKeys = Object.keys(options)
  const [currentOption, setCurrentOption] = useState(optionsKeys[0])
  const [baseText, setBaseText] = useState(options[currentOption].textoBase)
  const [finalText, setFinalText] = useState(baseText)
  const [templateValues, setTemplateValues] = useState([])

  useEffect(() => {
    setBaseText(options[currentOption].textoBase)
  }, [currentOption])

  useEffect(() => {
    setFinalText(baseText)
  }, [baseText])

  return (
    <div className="App">
      <Autocomplete
        className="autocomplete"
        id="options"
        options={optionsKeys}
        sx={{width: 700}}
        renderInput={(params) => <TextField {...params} label="Options" />}
        onChange={selectCurrentOption}
        defaultValue={optionsKeys[0]}
      />
      <div>
        {createComponent()}
      </div>
    </div >
  );

  function selectCurrentOption(event, value) {
    if (!value) return
    setCurrentOption(value)
  }

  function createComponent() {
    const t = options[currentOption].opcoes.map((option, index) => {
      if (option.tipo === "multiplos-textos") {
        return option.valores.map((val, i) => {
          const id = `${index + 1}.${i}`
          return <Autocomplete
            className="autocomplete"
            id={id}
            options={option.valores}
            sx={{width: 700}}
            renderInput={(params) => <TextField {...params} label={id} />}
            key={id}
            onChange={s}
          />
        })
      } else if (option.tipo === "texto") {
        const id = String(index + 1)
        return <Autocomplete
          className="autocomplete"
          id={id}
          options={option.valores}
          sx={{width: 700}}
          renderInput={(params) => <TextField {...params} label={id} />}
          key={id}
          onChange={s}
        />
      } else if (option.tipo === "data") {
        const id = String(index + 1)
        return <div className="date-picker">
          <LocalizationProvider
            key={id}
            dateAdapter={AdapterDateFns} >
            <DatePicker
              label="Basic example"
              onChange={value => {
                const event = {target: {id: `${id}-option`}}
                s(event, value)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider >
        </div >
      }
    })
    return (
      <div>
        <h3>{options.nome}</h3>
        <form>
          {t}
          <textarea rows="10" cols="65" type="readonly" value={finalText} />
        </form>
      </div>
    )
  }

  function s(event, value) {
    if (!value) return
    const id = event.target.id
    const index = id.split('-')[0]
    const multIndex = index.split(".")
    if (multIndex && multIndex.length > 1) {
      if (!templateValues[multIndex[0]]) templateValues[multIndex[0]] = []
      templateValues[multIndex[0]][multIndex[1]] = value
    } else {
      templateValues[index] = value
    }
    setTemplateValues(templateValues)
    b()
  }
  function b() {
    let text = baseText
    templateValues.forEach((v, index) => {
      if (Array.isArray(v)) {
        let string = ""
        v.forEach((va, i) => {
          string = string + `${i + 1}) ${va} `
        })
        v = string
      }
      text = text.replace(`/%${index}%/`, v)
    })
    setFinalText(text)
  }
  function dateParser(date) {
    date = new Date()
    const dia = date.getDate().toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping: false})
    const mes = (date.getMonth() + 1).toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping: false})
    const ano = date.getFullYear()
    return `${dia}/${mes}/${ano}`
  }
}

export default App;
