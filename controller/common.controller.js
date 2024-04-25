import { getDBRefVerseApp } from '../db/db.js';
import Crud from '../utils/crud.utils.js';
import { ERROR_CODES, MESSAGE } from '../global/global.vars.js';

class Controller {
  fetchCardsData = (req, res) => {
    try {
      const crud = new Crud(getDBRefVerseApp);
      crud.getValueAsync('/users', (error, usersData) => {
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
}

export default Controller;
