export async function getHomeArticles() {
    const response = await fetch('http://192.168.0.147:8000/Article/HomeArticlesList/?format=json');
    const data = await response.json();
    var importantArticles = [];
    for (let i = 0; i < data.length; i++) {
        importantArticles.push(data[i].article)
    }
    return importantArticles
}

export async function getLatestArticles() {
    const response = await fetch('http://192.168.0.147:8000/Article/LatestArticlesList/?format=json');
    const data = await response.json();
    return data
}
export async function getArticles() {
    const response = await fetch('http://192.168.0.147:8000/Article/ArticlesList/?format=json');
    const articles = await response.json();
    return articles
}