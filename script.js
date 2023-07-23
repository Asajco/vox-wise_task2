//funckia na fetch

async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    console.log(data)
    return data.products.filter((product) => {
      return product.stock < 100
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

//funckia na vytvorenie elementu
function createProductElement(product) {
  const productElement = document.createElement('div')
  productElement.classList.add('product')

  //funckia na skrátenie textu
  function truncateDescription(description, maxLength) {
    if (description.length <= maxLength) {
      return description
    }
    return description.substring(0, maxLength) + '...'
  }
  //štýlovanie ceny
  const priceStyle =
    product.discountPercentage > 5 ? 'text-decoration: line-through;' : ''

  productElement.innerHTML = `
    <div class="image"></div>
    <div class="card-bottom">
      <p class="gray-text">${product.brand}</p>
      <h3 class="title">${product.title}</h3>
      <p class="gray-text">${truncateDescription(product.description, 40)}</p>
      <div class="price-group">
        <p style="${priceStyle}">${product.price.toFixed(2)}$</p>
        <p class="discount">${
          product.discountPercentage < 5 ? '' : product.discountPercentage + '%'
        }</p>
        <p>${
          product.discountPercentage < 5
            ? product.price.toFixed(2)
            : ((product.price / product.discountPercentage) * 10).toFixed(2) +
              ''
        }$</p>
        <button class="submit-button">Add</button>
      </div>
    </div>
  `
  //button funkcia na log
  const button = productElement.querySelector('button')
  button.addEventListener('click', function () {
    viewFullInformation(product)
  })

  return productElement
}

function viewFullInformation(product) {
  console.log(product)
}

//vytvorenie/render produktov
async function renderProducts() {
  const productList = document.getElementById('productList')
  productList.innerHTML = '<p>Loading...</p>'
  const products = await fetchProducts()
  console.log(products)
  productList.innerHTML = ''
  products.forEach((product) => {
    const productElement = createProductElement(product)
    productList.appendChild(productElement)
  })
}

renderProducts()
//sort
function sortByPriceAscending(products) {
  return products.sort((a, b) => a.price - b.price)
}

function sortByPriceDescending(products) {
  return products.sort((a, b) => b.price - a.price)
}
//init je to defualtne následne je to už sortnuté
async function init() {
  const productList = document.getElementById('productList')
  productList.innerHTML = '<p>Loading...</p>'
  const products = await fetchProducts()
  console.log(products)
  productList.innerHTML = ''
  products.forEach((product) => {
    const productElement = createProductElement(product)
    productList.appendChild(productElement)
  })

  const sortButton = document.getElementById('sortButton')
  let ascending = true

  sortButton.addEventListener('click', () => {
    const sortedProducts = ascending
      ? sortByPriceAscending(products.slice())
      : sortByPriceDescending(products.slice())

    productList.innerHTML = ''
    sortedProducts.forEach((product) => {
      const productElement = createProductElement(product)
      productList.appendChild(productElement)
    })

    ascending = !ascending
  })
}

init()
