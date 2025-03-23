// Polyfill for Object.values for older browsers
if (!Object.values) {
  Object.values = function (obj) {
    var values = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        values.push(obj[key]);
      }
    }
    return values;
  };
}

// Replace fetch with XMLHttpRequest for compatibility with older browsers
var xhr = new XMLHttpRequest();
xhr.open("GET", "./data.json", true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    try {
      var json = JSON.parse(xhr.responseText);
      addContent(json);
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  }
};
xhr.send();

function addContent(json) {
  var cont = document.getElementsByClassName("content")[0];

  // Create HTML for each entry (using regular function instead of arrow functions)
  function elm(l1, l2, l3, nm, dc, lr) {
    return `<section>
              <div class="clt">
                <img src="${l1}" />
                <img src="${l2}" />
                <img src="${l3}" />
              </div>
              <div class="des">
                <h1>${nm}</h1>
                <p>${dc}</p>
                <button onclick="window.open('${lr}')">
                  <span>Xem ngay và luôn</span>
                  <img src="./res/arrow.svg" />
                </button>
              </div>
              <div class="line"></div>
            </section>`;
  }

  // Iterate through the object values (Object.values polyfill handles this)
  var entries = Object.values(json);
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var link = entry["link"];
    var name = entry["name"];
    var desc = entry["desc"];
    cont.insertAdjacentHTML("beforeend", elm(entry["thumb"][0], entry["thumb"][1], entry["thumb"][2], name, desc, link));
  }
}
