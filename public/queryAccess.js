let html = document.documentElement
let queries = html.getElementsByClassName("query")
let lis = queries.getElementsByTagName("li")

for (let li of lis) {
    li.innerHtml = "text"
}
