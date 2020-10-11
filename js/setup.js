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
  const setupPlayer = setup.querySelector(`.setup-player`);
  const wizardColorCoat = setup.querySelector(`.setup-wizard .wizard-coat`);
  const wizardColorCoatInput = setup.querySelector(`input[name = coat-color]`);
  const wizardColorEyes = setup.querySelector(`.setup-wizard .wizard-eyes`);
  const wizardColorEyesInput = setup.querySelector(`input[name = eyes-color]`);
  const colorFireball = setup.querySelector(`.setup-fireball-wrap`);
  const colorFireballInput = setup.querySelector(`input[name = fireball-color]`);

  const renderWizard = (wizard) => {
    const wizardPreset = wizardTemplate.cloneNode(true);

    wizardPreset.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardPreset.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardPreset.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;

    return wizardPreset;
  };

  const onCoatClick = () => {
    const color = DB_WIZARDS.colorCoat[window.util.getRandomIntNumber(0, DB_WIZARDS.colorCoat.length - 1)];

    wizardColorCoat.style.fill = color;
    wizardColorCoatInput.value = color;
  };

  const onEyesClick = () => {
    const color = DB_WIZARDS.colorEyes[window.util.getRandomIntNumber(0, DB_WIZARDS.colorEyes.length - 1)];

    wizardColorEyes.style.fill = color;
    wizardColorEyesInput.value = color;
  };

  const onFireballClick = () => {
    const color = DB_WIZARDS.colorFireball[window.util.getRandomIntNumber(0, DB_WIZARDS.colorFireball.length - 1)];

    colorFireball.style.backgroundColor = color;
    colorFireballInput.value = color;
  };

  const onSetupPlayerClick = (evt) => {
    switch (evt.target.classList.value) {
      case `wizard-coat`:
        let newColorCoat;

        do {
          newColorCoat = DB_WIZARDS.colorCoat[window.util.getRandomIntNumber(0, DB_WIZARDS.colorCoat.length - 1)];
        } while (newColorCoat === wizardColorCoatInput.value);

        wizardColorCoat.style.fill = newColorCoat;
        wizardColorCoatInput.value = newColorCoat;
        break;

      case `wizard-eyes`:
        let newColorEyes;

        do {
          newColorEyes = DB_WIZARDS.colorEyes[window.util.getRandomIntNumber(0, DB_WIZARDS.colorEyes.length - 1)];
        } while (newColorEyes === wizardColorEyesInput.value);

        wizardColorEyes.style.fill = newColorEyes;
        wizardColorEyesInput.value = newColorEyes;
        break;

      case `setup-fireball`:
        let newColorFireball;

        do {
          newColorFireball = DB_WIZARDS.colorFireball[window.util.getRandomIntNumber(0, DB_WIZARDS.colorFireball.length - 1)];
        } while (newColorFireball === colorFireballInput.value);

        colorFireball.style.backgroundColor = newColorFireball;
        colorFireballInput.value = newColorFireball;
        break;
    }
  }

  const onLoadSuccess = (wizards) => {
    const fragment = document.createDocumentFragment();

    window.util.getRandomArrayElements(wizards, WIZARDS_QUANTITY)
    .forEach((wizard) => {
      fragment.append(renderWizard(wizard));
    });

    setupSimilarList.append(fragment);
    setup.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  // wizardColorCoat.addEventListener(`click`, onCoatClick);
  // wizardColorEyes.addEventListener(`click`, onEyesClick);
  // colorFireball.addEventListener(`click`, onFireballClick);
  setupPlayer.addEventListener(`click`, onSetupPlayerClick);

  window.backend.load(onLoadSuccess, window.backend.onError);

})();

