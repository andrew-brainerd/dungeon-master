const data = require('../utils/data');
const ObjectId = require('mongodb').ObjectId;
const log = require('../utils/log');
const { messageTypes, sendSms } = require('../utils/messaging');
const { DUNGEON_COLLECTION } = require('../constants/collections');

const createDungeon = (name, createdBy) => {
  return new Promise((resolve, reject) => {
    data.db && data.db.collection(DUNGEON_COLLECTION)
      .insertOne({ name, createdBy, members: [createdBy] }, (err, { ops }) => {
        const newDungeon = ops[0];
        log.success(`Created new dungeon (${newDungeon._id})`);
        sendSms(`Created new dungeon`, '9897210902');
        err ? reject(err) : resolve(newDungeon);
      });
  });
};

const getDungeon = dungeonId => {
  return new Promise((resolve, reject) => {
    data.db && data.db.collection(DUNGEONS_COLLECTION)
      .find({ _id: ObjectId(dungeonId) })
      .toArray((err, result) =>
        err ? reject(err) : resolve(result[0])
      );
  });
};

module.exports = {
  createDungeon,
  getDungeon
};
