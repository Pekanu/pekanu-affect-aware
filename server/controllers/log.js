const LogService = require('../services/log');

const logService = new LogService();

exports.createLog = async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    console.log(sessionId);
    const userId = req.session.user._id.toString();
    const username = req.session.user?.username;

    const { context, action } = req.body;

    const newLog = await logService.createLog({
      session: sessionId,
      user: userId,
      action,
      context,
      username,
    });

    res.status(201).json({
      log: newLog,
    });
  } catch (err) {
    next(err);
  }
};

exports.downloadLogs = async (req, res, next) => {
  try {
    const { username, minTimestamp, format } = req.query;
    const filter = {};

    if (username) filter.username = username;
    if (minTimestamp) filter.createdAt = { $gte: new Date(minTimestamp) };

    const logs = await logService.downloadLogs(filter, format);

    if (format && format.toLowerCase() === 'csv') {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=logs.csv`);
      res.send(logs);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=logs.json`);
      res.json(logs);
    }
  } catch (err) {
    next(err);
  }
};
