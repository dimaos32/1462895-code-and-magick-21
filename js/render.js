'use strict';

(() => {

  const WIZARDS_QUANTITY = 4;

  const setupSimilarList = document.querySelector(`.setup-similar-list`);
  const wizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

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

    setupSimilarList.innerHTML = ``;

    for (let i = 0; i < wizardsQuantity; i++) {
      fragment.append(renderWizard(wizards[i]));
    }

    setupSimilarList.append(fragment);
    document.querySelector(`.setup-similar`).classList.remove(`hidden`);
  };

  window.render = {
    renderWizards,
  };

})();
