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
    `Вашингтон`,
  ],
  surname: [
    `да Марья`,
    `Верон`,
    `Мирабелла`,
    `Вальц`,
    `Онопко`,
    `Топольницкая`,
    `Нионго`,
    `Ирвинг`,
  ],
  coatColor: [
    `rgb(101, 137, 164)`,
    `rgb(241, 43, 107)`,
    `rgb(146, 100, 161)`,
    `rgb(56, 159, 117)`,
    `rgb(215, 210, 55)`,
    `rgb(0, 0, 0)`,
  ],
  eyesColor: [
    `black`,
    `red`,
    `blue`,
    `yellow`,
    `green`,
  ],
  fireballColor: [
    `#ee4830`,
    `#e6e848`,
    `#30a8ee`,
    `#5ce6c0`,
    `#e848d5`,
  ],
};

const WIZARDS_QUANTITY = 4;

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

const setup = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setup.querySelector(`.setup-close`);
const setupSimilarList = setup.querySelector(`.setup-similar-list`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);
const fragment = document.createDocumentFragment();
const userNameInput = document.querySelector(`.setup-user-name`);
const wizardCoatColor = setup.querySelector(`.setup-wizard .wizard-coat`);
const wizardCoatColorInput = setup.querySelector(`input[name = coat-color]`);
const wizardEyesColor = setup.querySelector(`.setup-wizard .wizard-eyes`);
const wizardEyesColorInput = setup.querySelector(`input[name = eyes-color]`);
const fireballColor = setup.querySelector(`.setup-fireball-wrap`);
const fireballColorInput = setup.querySelector(`input[name = fireball-color]`);

const getRandomArrayElements = (arr, n = 1) => {
  const randomArray = [];

  for (let i = 0; i < arr.length && i < n; i++) {
    const element = window.getRandomIntNumber(i, arr.length - 1);
    randomArray.push(arr[element]);
    const swap = arr[element];
    arr[element] = arr[i];
    arr[i] = swap;
  }

  return randomArray;
};

const createRandomWizards = (n = 4) => {
  const randomWizards = [];

  const names = getRandomArrayElements(DB_WIZARDS.name, n);
  const surnames = getRandomArrayElements(DB_WIZARDS.surname, n);

  for (let i = 0; i < n && i < DB_WIZARDS.name.length && i < DB_WIZARDS.surname.length; i++) {
    randomWizards.push({
      name: `${names[i]} ${surnames[i]}`,
      coatColor: DB_WIZARDS.coatColor[window.getRandomIntNumber(0, DB_WIZARDS.coatColor.length - 1)],
      eyesColor: DB_WIZARDS.eyesColor[window.getRandomIntNumber(0, DB_WIZARDS.eyesColor.length - 1)]
    });
  }

  return randomWizards;
};

const renderWizard = (wizard) => {
  const wizardPreset = wizardTemplate.cloneNode(true);

  wizardPreset.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardPreset.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardPreset.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardPreset;
};

const onSetupEscPress = (evt) => {
  if (evt.key === `Escape` && userNameInput !== document.activeElement) {
    evt.preventDefault();
    closePopup(setup);
  }
};

const openPopup = () => {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onSetupEscPress);
};

const closePopup = () => {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onSetupEscPress);
};

const getRandomCoatColor = () => {
  const color = DB_WIZARDS.coatColor[window.getRandomIntNumber(0, DB_WIZARDS.coatColor.length - 1)];

  wizardCoatColor.style.fill = color;
  wizardCoatColorInput.value = color;
};

const getRandomEyesColor = () => {
  const color = DB_WIZARDS.eyesColor[window.getRandomIntNumber(0, DB_WIZARDS.eyesColor.length - 1)];

  wizardEyesColor.style.fill = color;
  wizardEyesColorInput.value = color;
};

const getRandomFireballColor = () => {
  const color = DB_WIZARDS.fireballColor[window.getRandomIntNumber(0, DB_WIZARDS.fireballColor.length - 1)];

  fireballColor.style.backgroundColor = color;
  fireballColorInput.value = color;
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    openPopup();
  }
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    closePopup();
  }
});

wizardCoatColor.addEventListener(`click`, getRandomCoatColor);
wizardEyesColor.addEventListener(`click`, getRandomEyesColor);
fireballColor.addEventListener(`click`, getRandomFireballColor);

userNameInput.addEventListener(`input`, () => {
  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Еще ${MIN_NAME_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} символов`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
});

const wizards = createRandomWizards(WIZARDS_QUANTITY);

for (let i = 0; i < wizards.length; i++) {
  fragment.append(renderWizard(wizards[i]));
}

setupSimilarList.append(fragment);

setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
