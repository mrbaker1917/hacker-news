import React from "react";

function FieldsNav ({ selected, onUpdateField }) {
  const fields = ["type", "by", "time", "title", "text", "url", "score"]
  return (
    <ul className="flex-center">
      {fields.map((field) => (
        <li key={field}>
          <button 
          className="btn-clear nav-link"
          style={field === selected ? {textDecoration: "underline", color: "maroon", background: "beige"} : null}
          onClick={() => onUpdateField(field)}>
            {field}
            </button>
          </li>
      ))}
    </ul>
  )
}

export default class News extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedField: "title"
    }
    this.updateField = this.updateField.bind(this)
  }

  updateField (selectedField) {
    this.setState({
      selectedField
    })
  }

  render() {
    const { selectedField } = this.state

    return (
      <React.Fragment>
        <FieldsNav
          selected={selectedField}
          onUpdateField={this.updateField}
        />
      </React.Fragment>
    )
  }
}