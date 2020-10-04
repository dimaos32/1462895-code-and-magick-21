'use strict';

(() => {

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

  const setup = document.querySelector(`.setup`);
  const setupSimilarList = setup.querySelector(`.setup-similar-list`);
  const wizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  const fragment = document.createDocumentFragment();
  const wizardCoatColor = setup.querySelector(`.setup-wizard .wizard-coat`);
  const wizardCoatColorInput = setup.querySelector(`input[name = coat-color]`);
  const wizardEyesColor = setup.querySelector(`.setup-wizard .wizard-eyes`);
  const wizardEyesColorInput = setup.querySelector(`input[name = eyes-color]`);
  const fireballColor = setup.querySelector(`.setup-fireball-wrap`);
  const fireballColorInput = setup.querySelector(`input[name = fireball-color]`);

  const createRandomWizards = (n = 4) => {
    const randomWizards = [];

    const names = window.util.getRandomArrayElements(DB_WIZARDS.name, n);
    const surnames = window.util.getRandomArrayElements(DB_WIZARDS.surname, n);

    for (let i = 0; i < n && i < DB_WIZARDS.name.length && i < DB_WIZARDS.surname.length; i++) {
      randomWizards.push({
        name: `${names[i]} ${surnames[i]}`,
        coatColor: DB_WIZARDS.coatColor[window.util.getRandomIntNumber(0, DB_WIZARDS.coatColor.length - 1)],
        eyesColor: DB_WIZARDS.eyesColor[window.util.getRandomIntNumber(0, DB_WIZARDS.eyesColor.length - 1)]
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

  const getRandomCoatColor = () => {
    const color = DB_WIZARDS.coatColor[window.util.getRandomIntNumber(0, DB_WIZARDS.coatColor.length - 1)];

    wizardCoatColor.style.fill = color;
    wizardCoatColorInput.value = color;
  };

  const getRandomEyesColor = () => {
    const color = DB_WIZARDS.eyesColor[window.util.getRandomIntNumber(0, DB_WIZARDS.eyesColor.length - 1)];

    wizardEyesColor.style.fill = color;
    wizardEyesColorInput.value = color;
  };

  const getRandomFireballColor = () => {
    const color = DB_WIZARDS.fireballColor[window.util.getRandomIntNumber(0, DB_WIZARDS.fireballColor.length - 1)];

    fireballColor.style.backgroundColor = color;
    fireballColorInput.value = color;
  };

  const wizards = createRandomWizards(WIZARDS_QUANTITY);

  for (let i = 0; i < wizards.length; i++) {
    fragment.append(renderWizard(wizards[i]));
  }

  setupSimilarList.append(fragment);

  setup.querySelector(`.setup-similar`).classList.remove(`hidden`);

  wizardCoatColor.addEventListener(`click`, getRandomCoatColor);
  wizardEyesColor.addEventListener(`click`, getRandomEyesColor);
  fireballColor.addEventListener(`click`, getRandomFireballColor);

})();

