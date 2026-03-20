import "./style.css";
const pkmnSearchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const imgSpriteContainer = document.getElementById("sprite-container");
const pkmnTypeContainer = document.getElementById("types");
const pkmnWeight = document.getElementById("weight");
const pkmnHeight = document.getElementById("height");
const pkmnName = document.getElementById("pokemon-name");
const pkmnId = document.getElementById("pokemon-id");
const pkmnHp = document.getElementById("hp");
const pkmnAtk = document.getElementById("attack");
const pkmnDef = document.getElementById("defense");
const pkmnSpAtk = document.getElementById("special-attack");
const pkmnSpDef = document.getElementById("special-defense");
const pkmnSpd = document.getElementById("speed");
const otherSpriteContainer = document.getElementById("all-sprite-container");
const toggleAllSpriteContainer = document.getElementById(
  "toggle-all-sprite-container",
);
const hideSpritesBtn = document.getElementById("hide-sprites-container");
const spritePopupContainer = document.getElementById("sprite-popup-container");
let pokemonData;
let hidden = true;

const getPkmnFromInput = () => {
  //format input
  const reg1 = /[^a-zA-Z0-9_\s]/gim;
  const reg2 = /[_\s]/g;
  const reg3 = /[♂]/;
  const reg4 = /[♀]/;

  const formattedInput = pkmnSearchInput.value
    .toLowerCase()
    .trim()
    .replace(reg1, "")
    .replace(reg2, "-")
    .replace(reg3, "-m")
    .replace(reg4, "-f");

  return formattedInput;
};

const fetchPkmnData = async (pkmn) => {
  try {
    //fetch pokemon pokemonData

    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pkmn}`,
    );
    const data = await res.json();
    pkmnSearchInput.value = "";
    renderPkmnData(data);
  } catch (error) {
    clearDisplay();
    alert("Pokémon not found");
    console.error(error);
  }
};

const renderPkmnData = (pkmn) => {
  pokemonData = pkmn;

  //set pokemon info

  pkmnName.textContent = `${pokemonData.name.toUpperCase()}`;
  pkmnId.textContent = `#${pokemonData.id}`;
  pkmnHeight.textContent = `Height: ${pokemonData.height}`;
  pkmnWeight.textContent = `Weight: ${pokemonData.weight}`;
  imgSpriteContainer.innerHTML = `<img id="sprite" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"/>`;
  otherSpriteContainer.innerHTML = `
            <button class="sprite-btn"><img id="front-sprite" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"/></button>
            <button class="sprite-btn"><img id="back-sprite" src="${pokemonData.sprites.back_default}" alt="${pokemonData.name}"/></button>
            <button class="sprite-btn"><img id="front-shiny-sprite" src="${pokemonData.sprites.front_shiny}" alt="${pokemonData.name}"/></button>
            <button class='sprite-btn'><img id="back-shiny-sprite" src="${pokemonData.sprites.back_shiny}" alt="${pokemonData.name}"/></button>`;
  toggleAllSpriteContainer.innerHTML = `<button class="toggle-sprite-btn sprite-btn"><img class="front-shiny-sprite" src="${pokemonData.sprites.front_shiny}" alt="${pokemonData.name}"/></button>
                                        <div class="btn-overlay">...</div>`;
  pkmnTypeContainer.innerHTML = pokemonData.types
    .map(
      (obj) =>
        `<span class="type ${
          obj.type.name
        }">${obj.type.name.toUpperCase()}</span>`,
    )
    .join("");

  //set pokemon stats

  pkmnHp.textContent = `${pokemonData.stats[0].base_stat}`;
  pkmnAtk.textContent = `${pokemonData.stats[1].base_stat}`;
  pkmnDef.textContent = `${pokemonData.stats[2].base_stat}`;
  pkmnSpAtk.textContent = `${pokemonData.stats[3].base_stat}`;
  pkmnSpDef.textContent = `${pokemonData.stats[4].base_stat}`;
  pkmnSpd.textContent = `${pokemonData.stats[5].base_stat}`;

  otherSpriteContainer.addEventListener("click", (e) => {
    const target = e.target.closest("img");
    if (!target) return;
    imgSpriteContainer.innerHTML = `<img id="sprite" src="${target.src}" alt="${target.name}"/>`;
    spritePopupContainer.classList.add("hidden");
    hidden = true;
  });
};

const clearDisplay = () => {
  //remove sprite

  imgSpriteContainer.innerHTML = "";
  otherSpriteContainer.innerHTML = "";
  toggleAllSpriteContainer.innerHTML = "";

  //clear pokemon display / stats

  pkmnName.textContent = "";
  pkmnId.textContent = "";
  pkmnHeight.textContent = "";
  pkmnWeight.textContent = "";
  pkmnTypeContainer.innerHTML = "";
  pkmnHp.textContent = "";
  pkmnAtk.textContent = "";
  pkmnDef.textContent = "";
  pkmnSpAtk.textContent = "";
  pkmnSpDef.textContent = "";
  pkmnSpd.textContent = "";
  pkmnSearchInput.value = "";
};

searchBtn.addEventListener("click", () => {
  fetchPkmnData(getPkmnFromInput());
});

pkmnSearchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchPkmnData(getPkmnFromInput());
  }
});
toggleAllSpriteContainer.addEventListener("click", () => {
  if (hidden) {
    spritePopupContainer.classList.remove("hidden");
    hidden = false;
  } else {
    spritePopupContainer.classList.add("hidden");
    hidden = true;
  }
});

hideSpritesBtn.addEventListener("click", () => {
  spritePopupContainer.classList.add("hidden");
  hidden = true;
});
