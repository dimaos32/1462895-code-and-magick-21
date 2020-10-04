'use strict';

(() => {

  const COLOR_CLOUD = `#ffffff`;
  const COLOR_CLOUD_SHADOW = `rgba(0, 0, 0, 0.7)`;
  const COLOR_TEXT = `#000000`;
  const COLOR_CURRENT_PLAYER = `#ff0000`;

  const CLOUD_WIDTH = 420;
  const CLOUD_HEIGHT = 270;
  const CLOUD_X = 100;
  const CLOUD_Y = 10;

  const FONT_SIZE = 16;
  const FONT_FAMILY = `PT Mono`;

  const MESSAGE_X = 20;
  const MESSAGE_Y = 15;
  const MESSAGE_CONTENT = [
    `Ура вы победили!`,
    `Список результатов:`
  ];

  const BAR_WIDTH = 40;
  const BAR_MAX_HEIGHT = 150;
  const GAP = 50;
  const BARS_X = 40;
  const BARS_Y = 85;

  const NAMES_Y = 255;

  const renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  const getMaxElement = function (arr) {
    let maxElement = arr[0];

    for (let i = 1; i <= arr.length; i++) {
      if (maxElement < arr[i]) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  const ramdomBlueColor = () => {
    return `hsl(240, ${window.util.getRandomIntNumber()}%, 50%)`;
  };

  window.renderStatistics = function (ctx, names, times) {
    const badTime = getMaxElement(times);

    renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, COLOR_CLOUD_SHADOW);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, COLOR_CLOUD);

    ctx.font = `${FONT_SIZE}px ` + FONT_FAMILY;

    ctx.fillStyle = COLOR_TEXT;

    MESSAGE_CONTENT.forEach(function (str, i) {
      const currentStringY = CLOUD_Y + MESSAGE_Y + FONT_SIZE * (i + 1);
      ctx.fillText(str, CLOUD_X + MESSAGE_X, currentStringY);
    });

    for (let i = 0; i < names.length; i++) {
      const currentBarX = CLOUD_X + BARS_X + (GAP + BAR_WIDTH) * i;
      const currentBarY = CLOUD_Y + BARS_Y + BAR_MAX_HEIGHT * (badTime - times[i]) / badTime;

      ctx.fillStyle = COLOR_TEXT;
      ctx.fillText(names[i], currentBarX, CLOUD_Y + NAMES_Y);

      ctx.fillText(Math.round(times[i]), currentBarX, currentBarY - 10);

      ctx.fillStyle = names[i] === `Вы` ? COLOR_CURRENT_PLAYER : ramdomBlueColor();
      ctx.fillRect(currentBarX, currentBarY, BAR_WIDTH, BAR_MAX_HEIGHT * times[i] / badTime);
    }
  };

})();

