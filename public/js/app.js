console.log("client Side JavaScript File is Loaded");

const addressForm = document.querySelector("form");
const addressInput = document.querySelector("form input[type=text]");
const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");

msgOne.textContent = "";
msgTwo.textContent = "";

addressForm.onsubmit = e => {
  e.preventDefault();

  const address = addressInput.value;
  msgOne.textContent = "Loading ...";
  msgTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${encodeURIComponent(address)}`)
    .then(res => {
      res.json().then(data => {
        if (data.error) {
          msgOne.textContent = data.error;
        } else {
          msgOne.textContent = data.location;
          msgTwo.textContent = data.forecast;
        }
      });
    })
    .catch(err => {
      msgOne.textContent = err + ", Check your internet connection";
    });
};
