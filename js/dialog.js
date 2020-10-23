'use strict';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const setup = document.querySelector(`.setup`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = setup.querySelector(`.setup-close`);
const fileChooser = setup.querySelector(`.upload input[type=file]`);
const avatarPreview = setup.querySelector(`.setup-user-pic`);
const userNameInput = setup.querySelector(`.setup-user-name`);
const dialogLever = setup.querySelector(`.upload`);
const form = setup.querySelector(`.setup-wizard-form`);

const popupOffset = {
  x: 0,
  y: 0,
};

const resetpopupOffset = () => {
  popupOffset.x = 0;
  popupOffset.y = 0;
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
  setup.style = `transform: translateX(-50%);`;
  resetpopupOffset();
  document.removeEventListener(`keydown`, onSetupEscPress);
};

const onInputUserName = () => {
  const valueLength = userNameInput.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Еще ${MIN_NAME_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} символов`);
  } else {
    userNameInput.setCustomValidity(``);
  }

  userNameInput.reportValidity();
};

const onSendSuccess = () => {
  setup.classList.add(`hidden`);
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

userNameInput.addEventListener(`input`, onInputUserName);

dialogLever.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    evt.preventDefault();

    const startCoords = {
      x: evt.clientX - popupOffset.x,
      y: evt.clientY - popupOffset.y,
    };

    let isMoved = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      isMoved = true;

      const shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y,
      };

      setup.style = `transform: translate(calc(-50% + ${shift.x}px), ${shift.y}px)`;

      popupOffset.x = shift.x;
      popupOffset.y = shift.y;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      startCoords.x = upEvt.clientX;
      startCoords.y = upEvt.clientY;

      if (isMoved) {
        const onDialogLeverClick = (clickEvt) => {
          clickEvt.preventDefault();
          dialogLever.removeEventListener(`click`, onDialogLeverClick);
        };

        dialogLever.addEventListener(`click`, onDialogLeverClick);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }
});

fileChooser.addEventListener(`change`, () => {
  const file = fileChooser.files[0];

  const isPicture = FILE_TYPES.some((ending) => {
    return file.name.toLowerCase().endsWith(ending);
  });

  if (isPicture) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

form.addEventListener(`submit`, (evt) => {
  window.backend.send(new FormData(form), onSendSuccess, window.backend.onError);
  evt.preventDefault();
});

