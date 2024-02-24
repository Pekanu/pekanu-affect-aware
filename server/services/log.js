const joi = require('joi');
const json2csv = require('json2csv').parse;
const Log = require('../models/log');

class LogService {
  logValidator(logData) {
    const schema = joi.object({
      session: joi.string().required(),
      user: joi.string().required().hex().length(24),
      action: joi.string().required(),
      context: joi.object().optional(),
      username: joi.string().required(),
    });
    return schema.validate(logData);
  }

  async createLog(logData) {
    const { value, error } = this.logValidator(logData);
    if (error) throw new Error(error);
    const newLog = new Log(value);
    return await newLog.save();
  }

  async downloadLogs(filter = {}, format = 'json') {
    const logs = await Log.find(filter);

    if (logs.length > 0) {
      if (format === 'csv') {
        const csv = json2csv(logs);
        return csv;
      } else {
        return logs;
      }
    } else {
      throw new Error('No logs found with the specified filter.');
    }
  }
}

module.exports = LogService;
