'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 50;
const BARS_X = 40;
const BARS_Y = 85;
const BAR_WIDTH = 40;
const BAR_MAX_HEIGHT = 150;
const NAMES_X = BARS_X;
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

window.renderStatistics = function (ctx, names, times) {
  let badTime = getMaxElement(times);

  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#ffffff`);

  ctx.font = `16px PT Mono`;

  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = `#000000`;
    ctx.fillText(
        names[i],
        CLOUD_X + NAMES_X + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + NAMES_Y);

    ctx.fillText(
        Math.round(times[i]),
        CLOUD_X + NAMES_X + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + BARS_Y + BAR_MAX_HEIGHT * (badTime - times[i]) / badTime - 10);

    ctx.fillStyle = names[i] === `Вы` ? `#ff0000` : `hsl(240, ${Math.ceil(Math.random() * 100)}%, 50%)`;
    ctx.fillRect(
        CLOUD_X + BARS_X + (GAP + BAR_WIDTH) * i,
        CLOUD_Y + BARS_Y + BAR_MAX_HEIGHT * (badTime - times[i]) / badTime,
        BAR_WIDTH,
        BAR_MAX_HEIGHT * times[i] / badTime
    );
  }

  ctx.fillStyle = `#000000`;
  ctx.fillText(`Ура вы победили!`, 120, 41);
  ctx.fillText(`Список результатов:`, 120, 57);
};
