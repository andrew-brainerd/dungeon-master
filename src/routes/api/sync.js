const sync = require('express').Router();
const { pusher } = require('../../utils/sync');
const { isDefined } = require('../../utils/url');
const status = require('../../constants/statusMessages');
const { GAME_STATUS } = require('../../constants/pusher');

sync.post('/', async (req, res) => {
  const { query: { dungeonId }, body: { gameStatus } } = req;

  if (!isDefined(dungeonId)) return status.missingQueryParam(res, 'dungeonId');
  if (!gameStatus) return status.missingBodyParam(res, 'status');

  pusher.trigger(dungeonId, GAME_STATUS, { ...gameStatus });

  return status.created(res, { message: 'Pushed Game Status Update', gameStatus });
});

module.exports = sync;
