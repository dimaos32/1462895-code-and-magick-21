'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, 100, 10, `#ffffff`);

  ctx.fillStyle =`#000000`;
  ctx.font =`16px PT Mono`;
  ctx.fillText(`Ура вы победили!`, 120, 41);
  ctx.fillText(`Список результатов:`, 120, 57);
};
