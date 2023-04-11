import axios from "axios";

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //
  const divWrapper = document.createElement('div');
  const divHeadline = document.createElement('div');
  const divAuthor = document.createElement('div');
  const divContainer = document.createElement('div');
  const img = document.createElement('img');
  const spanName = document.createElement('span');

  divWrapper.appendChild(divHeadline);
  divWrapper.appendChild(divAuthor);
  divAuthor.appendChild(divContainer);
  divAuthor.appendChild(spanName);
  divContainer.appendChild(img);

  divWrapper.classList.add('card');
  divHeadline.classList.add('headline');
  divAuthor.classList.add('author');
  divContainer.classList.add('img-container');

  divHeadline.textContent = article.headline;
  img.src = article.authorPhoto;
  spanName.textContent = 'By ' + article.authorName;

  divWrapper.addEventListener('click', (e) => {
    console.log(e.target);
  })

  return divWrapper;
}


const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
 
    axios.get('http://localhost:5001/api/articles')
    .then(res => {
      const articles = res.data.articles;

      for(const category in articles) {
        articles[category].forEach(article => {
          const card = Card(article);
          document.querySelector(selector).appendChild(card);
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

export { Card, cardAppender }
