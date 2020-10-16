'use strict';

(() => {

  const WIZARDS_QUANTITY = 4;

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

  const setupSimilarList = document.querySelector(`.setup-similar-list`);
  const wizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);
  const setup = document.querySelector(`.setup`);
  const setupPlayer = setup.querySelector(`.setup-player`);
  const wizardCoatColor = setup.querySelector(`.setup-wizard .wizard-coat`);
  const wizardCoatColorInput = setup.querySelector(`input[name = coat-color]`);
  const wizardEyesColor = setup.querySelector(`.setup-wizard .wizard-eyes`);
  const wizardEyesColorInput = setup.querySelector(`input[name = eyes-color]`);
  const fireballcolor = setup.querySelector(`.setup-fireball`);
  const fireballcolorInput = setup.querySelector(`input[name = fireball-color]`);

  const onSetupPlayerClick = (evt) => {
    switch (evt.target) {
      case wizardCoatColor:
        let newCoatColor;

        do {
          newCoatColor = window.util.getRandomArrayElements(DB_WIZARDS.colorCoat)[0];
        } while (newCoatColor === wizardCoatColorInput.value);

        wizardCoatColor.style.fill = newCoatColor;
        wizardCoatColorInput.value = newCoatColor;
        break;

      case wizardEyesColor:
        let newEyesColor;

        do {
          newEyesColor = window.util.getRandomArrayElements(DB_WIZARDS.colorEyes)[0];
        } while (newEyesColor === wizardEyesColorInput.value);

        wizardEyesColor.style.fill = newEyesColor;
        wizardEyesColorInput.value = newEyesColor;
        break;

      case fireballcolor:
        let newfireballcolor;

        do {
          newfireballcolor = window.util.getRandomArrayElements(DB_WIZARDS.colorFireball)[0];
        } while (newfireballcolor === fireballcolorInput.value);

        fireballcolor.style.backgroundColor = newfireballcolor;
        fireballcolorInput.value = newfireballcolor;
        break;
    }
  };

  const renderWizard = (wizard) => {
    const wizardPreset = wizardTemplate.cloneNode(true);

    wizardPreset.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardPreset.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardPreset.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardPreset;
  };

  const renderWizards = (wizards) => {
    const fragment = document.createDocumentFragment();

    const wizardsQuantity = wizards.length > WIZARDS_QUANTITY
      ? WIZARDS_QUANTITY
      : wizards.length;

    for (let i = 0; i < wizardsQuantity; i++) {
      fragment.append(renderWizard(wizards[i]));
    }

    setupSimilarList.append(fragment);
    document.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  setupPlayer.addEventListener(`click`, onSetupPlayerClick);

  window.render = {
    renderWizards,
  };

})();
