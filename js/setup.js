'use strict';

(() => {

  let wizards = [];

  const onLoadSuccess = (data) => {
    wizards = data;
    window.render.renderWizards(wizards);
  };

  window.backend.load(onLoadSuccess, window.backend.onError);

})();

