export function fetchNews() {
  const endpoint = window.encodeURI('https://hacker-news.firebaseio.com/v0/topstories.json')

  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if(!data.items) {
        throw new Error(data.message)
      }

      return data.items
    })
}