import { getDBRefVerseApp } from '../db/db.js';
import Crud from '../utils/crud.utils.js';
import { ERROR_CODES, MESSAGE } from '../global/global.vars.js';

class Controller {
  home = (req, res) => {
    try {
      if (req.user) {
        res.send(`Welcome, ${capitalizeFirstLetter(req.user.displayName)}!`);
      } else {
        res.redirect('/login/google');
      }
    } catch (error) {
      return res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || MESSAGE['500'],
        errorCode: error.errorCode || ERROR_CODES.SERVER_ERROR,
      });
    }
  };

  fetchCardsData = (req, res) => {
    try {
      const crud = new Crud(getDBRefVerseApp);
      crud.getValueAsync('/cards', (error, usersData) => {
        if (error) return res.status(401).json({ status: 401, message: MESSAGE['401'], errorCode: ERROR_CODES.UNAUTHORIZED });
        if (!usersData) return res.status(404).json({ status: 404, message: MESSAGE['404'], errorCode: ERROR_CODES.DATA_NOT_FOUND });

        res.json({ status: 200, message: MESSAGE['200'], data: usersData });
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || MESSAGE['500'],
        errorCode: error.errorCode || ERROR_CODES.SERVER_ERROR,
      });
    }
  };

  fetch50CardsData = (req, res) => {
    try {
      const crud = new Crud(getDBRefVerseApp);
      const { startAfter, limit } = req.query;

      crud.getChunksAsync('/cards', +startAfter, +limit, (error, data) => {
        if (error) return res.status(401).json({ status: 401, message: MESSAGE['401'], errorCode: ERROR_CODES.UNAUTHORIZED });
        if (!data) return res.status(404).json({ status: 404, message: MESSAGE['404'], errorCode: ERROR_CODES.DATA_NOT_FOUND });

        const hasMoreData = Object.keys(data).length === +limit;
        const nextStartAfter = hasMoreData ? Object.keys(data).pop() : undefined;
        res.status(200).json({ data, hasMoreData, nextStartAfter });
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || MESSAGE['500'],
        errorCode: error.errorCode || ERROR_CODES.SERVER_ERROR,
      });
    }
  };

  saveCardsData = (req, res) => {
    try {
      const crud = new Crud(getDBRefVerseApp);
      const { cardsData } = req.body;
      if (!cardsData) return res.status(400).json({ status: 400, message: MESSAGE['400'], errorCode: ERROR_CODES.MISSING_PARAMS });

      crud.updateValueAsync('/cards', cardsData, (error) => {
        if (error) return res.status(401).json({ status: 401, message: 'Unauthorized' });
        res.json({ status: 200, message: 'Cards data stored successfully' });
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || MESSAGE['500'],
        errorCode: error.errorCode || ERROR_CODES.SERVER_ERROR,
      });
    }
  };
}

export default Controller;

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
