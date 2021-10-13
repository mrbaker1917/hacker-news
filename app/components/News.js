import React from "react";
import { fetchItem, fetchComments, fetchMainPosts, fetchUser, fetchPosts } from "../utils/api"

function FieldsNav ({ selected, onUpdateField }) {
  const fields = ["top", "new"]
  return (
    <ul className="flex-left">
      {fields.map((field) => (
        <li key={field}>
          <button 
          className="btn-clear nav-link"
          style={field === selected ? {textDecoration: "underline", color: "maroon", background: "beige"} : null}
          onClick={() => onUpdateField(field)}
          >
            {field}
            </button>
          </li>
      ))}
    </ul>
  )
}

function NewsGrid({ items }) {
  return (
    <ul className="news-list">
      {items.map((item) => {
        const { id, title, by, time, url, kids } = item
        const date = new Date(time*1000)
        let hours = date.getHours()
        const minutes = "0" + date.getMinutes()
        let forTime = ""
        if (hours > "12") {
          hours -= "12"
          forTime = hours + ":" + minutes.substr(-2) + " PM"
        } else {
          forTime = hours + ":" + minutes.substr(-2) + " AM"
        }
        let numbComments = "0"
        if (kids) { 
          numbComments = kids.length.toString()
        }
  
        return (
          <li key={id}>
            <a href={url} target="_blank"> {title} </a>
            <p>by {by} on {date.toLocaleDateString("en-US")}, {forTime} with {numbComments} comments</p>
          </li>
        )
      })}
    </ul>
  )
}

export default class News extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedField: "top",
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
      // items: null
    })
    fetchMainPosts(selectedField)
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
        <h1>Hacker News</h1>
        <FieldsNav
          selected={selectedField}
          onUpdateField={this.updateField}
        />

        {this.isLoading() && <p>Loading</p>}

        {error && <p>{error}</p>}

        {items && <NewsGrid items={items} />}
      </React.Fragment>
    )
  }
}