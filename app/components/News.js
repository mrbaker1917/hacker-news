import React from "react";
import { fetchNews } from "../utils/api"

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
      selectedField: "title",
      items: null,
      error: null
    }
    this.updateField = this.updateField.bind(this)
    this.isLoading = this.isLoading.bind(this)
  }

  updateField (selectedField) {
    this.setState({
      selectedField,
      error: null,
      items: null
    })
    fetchNews()
      .then((items) => this.setState({
        items,
        error: null,
      }))
      .catch((error) => {
        console.warn('Error fetching items: ', error)

        this.setState({
          error: `There was an error fetching the items.`
        })
      })
  }
  isLoading() {
    return this.state.items === null && this.state.error === null
  }


  render() {
    const { selectedField, items, error } = this.state

    return (
      <React.Fragment>
        <FieldsNav
          selected={selectedField}
          onUpdateField={this.updateField}
        />

        {this.isLoading() && <p>Loading</p>}

        {error && <p>{error}</p>}

        {items && <pre>{JSON.stringify(items, null, 2)}</pre>}
      </React.Fragment>
    )
  }
}