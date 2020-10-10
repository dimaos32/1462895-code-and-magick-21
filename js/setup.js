'use strict';

(() => {

  const DB_WIZARDS = {
    colorCoat: [
      `rgb(101, 137, 164)`,
      `rgb(241, 43, 107)`,
      `rgb(146, 100, 161)`,
      `rgb(56, 159, 117)`,
      `rgb(215, 210, 55)`,
      `rgb(0, 0, 0)`,
    ],
    colorEyes: [
      `black`,
      `red`,
      `blue`,
      `yellow`,
      `green`,
    ],
    colorFireball: [
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
  const wizardcolorCoat = setup.querySelector(`.setup-wizard .wizard-coat`);
  const wizardcolorCoatInput = setup.querySelector(`input[name = coat-color]`);
  const wizardcolorEyes = setup.querySelector(`.setup-wizard .wizard-eyes`);
  const wizardcolorEyesInput = setup.querySelector(`input[name = eyes-color]`);
  const colorFireball = setup.querySelector(`.setup-fireball-wrap`);
  const colorFireballInput = setup.querySelector(`input[name = fireball-color]`);

  const renderWizard = (wizard) => {
    const wizardPreset = wizardTemplate.cloneNode(true);

    wizardPreset.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardPreset.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardPreset.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardPreset;
  };

  const getRandomcolorCoat = () => {
    const color = DB_WIZARDS.colorCoat[window.util.getRandomIntNumber(0, DB_WIZARDS.colorCoat.length - 1)];

    wizardcolorCoat.style.fill = color;
    wizardcolorCoatInput.value = color;
  };

  const getRandomcolorEyes = () => {
    const color = DB_WIZARDS.colorEyes[window.util.getRandomIntNumber(0, DB_WIZARDS.colorEyes.length - 1)];

    wizardcolorEyes.style.fill = color;
    wizardcolorEyesInput.value = color;
  };

  const getRandomcolorFireball = () => {
    const color = DB_WIZARDS.colorFireball[window.util.getRandomIntNumber(0, DB_WIZARDS.colorFireball.length - 1)];

    colorFireball.style.backgroundColor = color;
    colorFireballInput.value = color;
  };

  const onSuccess = (wizards) => {
    const fragment = document.createDocumentFragment();

    window.util.getRandomArrayElements(wizards, WIZARDS_QUANTITY)
    .forEach((wizard) => {
      fragment.append(renderWizard(wizard));
    });

    setupSimilarList.append(fragment);
    setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  const onError = (message) => {
    const node = document.createElement(`div`);

    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  wizardcolorCoat.addEventListener(`click`, getRandomcolorCoat);
  wizardcolorEyes.addEventListener(`click`, getRandomcolorEyes);
  colorFireball.addEventListener(`click`, getRandomcolorFireball);

  window.backend.load(onSuccess, onError);

})();

