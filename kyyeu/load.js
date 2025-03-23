fetch("./data.json")
  .then((response) => response.json())
  .then((json) => addContent(json));

function addContent(json) {
  let cont = document.getElementsByClassName("content")[0];
  let elm = (l1, l2, l3, nm, dc, lr) => `
  <section>
  <div class="clt">
  <img src="${l1}"/>
  <img src="${l2}"/>
  <img src="${l3}"/>
  </div><div class="des">
  <h1>${nm}</h1>
  <p>${dc}</p>
  <button id="linkBttn" lr="${lr}">
  <span>Xem ngay và luôn</span>
  <img src="./res/arrow.svg"/>
  </button>
  </div>
  <div class="line">
  </div>
  </section>`;
  Object.values(json).forEach((entries) => {
    let link = entries["link"];
    let name = entries["name"];
    let desc = entries["desc"];
    cont.insertAdjacentHTML("beforeend", elm(entries["thumb"][0], entries["thumb"][1], entries["thumb"][2], name, desc, link));
  });
}
