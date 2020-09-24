'use strict';

const DB_WIZARDS = {
  name: [
    `Иван`,
    `Хуан Себастьян`,
    `Мария`,
    `Кристоф`,
    `Виктор`,
    `Юлия`,
    `Люпита`,
    `Вашингтон`
  ],
  surname: [
    `да Марья`,
    `Верон`,
    `Мирабелла`,
    `Вальц`,
    `Онопко`,
    `Топольницкая`,
    `Нионго`,
    `Ирвинг`
  ],
  coatColor: [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`
  ],
  eyesColor: [
    `black`,
    `red`,
    `blue`,
    `yellow`,
    `green`
  ]
};

const setup = document.querySelector(`.setup`);
const setupSimilarList = setup.querySelector(`.setup-similar-list`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const fragment = document.createDocumentFragment();

let wizards;

const getRandomArrayElements = (arr, n = 1) => {
  let randomArray = [];

  for (let i = 0; i < arr.length && i < n; i++) {
    const ELEMENT = window.getRandomIntNumber(i, arr.length - 1);
    randomArray.push(arr[ELEMENT]);
    const SWAP = arr[ELEMENT];
    arr[ELEMENT] = arr[i];
    arr[i] = SWAP;
  }

  return randomArray;
};

const createRandomWizards = (n = 4) => {
  let RandomWizards = [];

  const NAMES = getRandomArrayElements(DB_WIZARDS.name, n);
  const SURNAMES = getRandomArrayElements(DB_WIZARDS.surname, n);

  for (let i = 0; i < n && i < DB_WIZARDS.name.length && i < DB_WIZARDS.surname.length; i++) {
    let wizard = {
      name: NAMES[i] + ` ` + SURNAMES[i],
      coatColor: DB_WIZARDS.coatColor[window.getRandomIntNumber(0, DB_WIZARDS.coatColor.length - 1)],
      eyesColor: DB_WIZARDS.eyesColor[window.getRandomIntNumber(0, DB_WIZARDS.eyesColor.length - 1)]
    };

    RandomWizards.push(wizard);
  }

  return RandomWizards;
};

const renderWizard = (wizard) => {
  let wizardPreSet = wizardTemplate.cloneNode(true);

  wizardPreSet.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardPreSet.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardPreSet.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardPreSet;
};

wizards = createRandomWizards();

for (let i = 0; i < wizards.length; i++) {
  fragment.append(renderWizard(wizards[i]));
}

setupSimilarList.append(fragment);

setup.classList.remove(`hidden`);
setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
