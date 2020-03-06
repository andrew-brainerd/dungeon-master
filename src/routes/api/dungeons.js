const dungeons = require('express').Router();
const dungeonsData = require('../../data/dungeons');
const status = require('../../constants/statusMessages');
const { isDefined } = require('../../utils/url');

dungeons.post('/', async (req, res) => {
  const { body: { name, createdBy } } = req;

  if (!name) return status.missingBodyParam(res, 'name');
  if (!createdBy) return status.missingBodyParam(res, 'createdBy');

  const newDungeon = await dungeonsData.createDungeon(name, createdBy);
  if (!newDungeon) return status.serverError(res, 'Failed', `Failed to create dungeon [${name}]`);

  return status.created(res, { ...newDungeon });
});

dungeons.get('/:dungeonId', async (req, res) => {
  const { params: { dungeonId } } = req;

  if (!isDefined(dungeonId)) return status.missingQueryParam(res, 'dungeonId');

  const dungeon = await dungeonsData.getDungeon(dungeonId);
  return status.success(res, { ...dungeon });
});

module.exports = dungeons;
