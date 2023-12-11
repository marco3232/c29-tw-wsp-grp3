
// console.log("add nav bar232233", document.querySelector(".first"));


document.querySelector(
  ".first"
).innerHTML = `<nav class="navbar navbar-expand-md navbar-dark bg-dark" aria-label="Fourth navbar example">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">鬼滅之刃傭</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample04">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">HomePage</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="contact_us.html">Contact us</a>
          </li>
          <!-- <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li> -->
          <!-- <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-bs-toggle="dropdown" aria-expanded="false">Category</a>
            <ul class="dropdown-menu" aria-labelledby="dropdown04">
              <li><a class="dropdown-item jacketOption" href="/category.html?id=1">Jacket</a></li>
              <li><a class="dropdown-item underOption" href="/category.html?id=2">Under</a></li>
              <li><a class="dropdown-item pantsOption" href="/category.html?id=3">Pants</a></li>
            </ul>
          </li>
        </ul>
        <form>
          <input class="form-control" type="text" placeholder="Search" aria-label="Search">
        </form>
        <a class="bi bi-person-fill" href="login.html"></a>

        <a class="bi bi-cart2" href="cart.html"></a>
      </div>
    </div>
  </nav>`;


  document.querySelector(
    ".title"
  ).innerHTML = `<div class="topic">鬼滅之刃傭-商品鋪</div>`

  document.querySelector(
    ".display-music"
  ).innerHTML = `<audio controls="" src="./music/lisa.mp3" id="music" loop="loop"></audio>`
  document.querySelector(
    ".viewall-button").innerHTML = `  <a class="btn btn-primary" href="category.html" role="button"
    >View all</a
  >`