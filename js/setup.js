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

  const setup = document.querySelector(`.setup`);
  const setupPlayer = setup.querySelector(`.setup-player`);
  const wizardCoatColor = setup.querySelector(`.setup-wizard .wizard-coat`);
  const wizardCoatColorInput = setup.querySelector(`input[name = coat-color]`);
  const wizardEyesColor = setup.querySelector(`.setup-wizard .wizard-eyes`);
  const wizardEyesColorInput = setup.querySelector(`input[name = eyes-color]`);
  const fireballColor = setup.querySelector(`.setup-fireball`);
  const fireballColorInput = setup.querySelector(`input[name = fireball-color]`);

  let currentWizardCoatColor = wizardCoatColorInput.value;
  let currentWizardEyesColor = wizardEyesColorInput.value;
  let wizards = [];

  const getRank = (wizard) => {
    let rank = 0;

    if (wizard.colorCoat === currentWizardCoatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === currentWizardEyesColor) {
      rank++;
    }

    return rank;
  };

  const updateWizards = () => {
    wizards.sort((left, right) => {
      let rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        if (Math.floor(Math.random() + 0.5)) {
          rankDiff = 1;
        } else {
          rankDiff = -1;
        }
      }
      return rankDiff;
    });

    window.render.renderWizards(wizards);
  };

  const onSetupPlayerClick = (evt) => {
    switch (evt.target) {
      case wizardCoatColor:
        let newCoatColor;

        do {
          newCoatColor = window.util.getRandomArrayElements(DB_WIZARDS.colorCoat)[0];
        } while (newCoatColor === wizardCoatColorInput.value);

        wizardCoatColor.style.fill = newCoatColor;
        wizardCoatColorInput.value = newCoatColor;
        currentWizardCoatColor = newCoatColor;
        break;

      case wizardEyesColor:
        let newEyesColor;

        do {
          newEyesColor = window.util.getRandomArrayElements(DB_WIZARDS.colorEyes)[0];
        } while (newEyesColor === wizardEyesColorInput.value);

        wizardEyesColor.style.fill = newEyesColor;
        wizardEyesColorInput.value = newEyesColor;
        currentWizardEyesColor = newEyesColor;
        break;

      case fireballColor:
        let newfireballColor;

        do {
          newfireballColor = window.util.getRandomArrayElements(DB_WIZARDS.colorFireball)[0];
        } while (newfireballColor === fireballColorInput.value);

        fireballColor.style.backgroundColor = newfireballColor;
        fireballColorInput.value = newfireballColor;
        break;
    }

    updateWizards();
  };

  setupPlayer.addEventListener(`click`, onSetupPlayerClick);

  const onLoadSuccess = (data) => {
    wizards = data;
    updateWizards();
  };

  window.backend.load(onLoadSuccess, window.backend.onError);

})();

