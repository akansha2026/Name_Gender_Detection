const inputRef = document.querySelector("input");
const btnRef = document.querySelector("button");
const res = document.getElementById("inner");

let disabled = false;

function detect() {
  disabled = true;
  const input = inputRef.value;
  const ans = fetch(`https://api.genderize.io?name=${input}`);
  ans
    .then((value) => {
      const jsonPromise = value.json();
      jsonPromise
        .then((data) => {
          const gender = data.gender;
          const prob = data.probability
          if(gender) res.innerHTML = `<span>${gender.toUpperCase()}</span> with ${prob*100}% surety.`
          else res.innerHTML = "Please enter a correct name!"
          disabled = false;
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

btnRef.addEventListener("click", () => {
  if (disabled) return;
  detect();
});
