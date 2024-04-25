class Crud {
  constructor(getDatabaseReference, getMessagingIprepApp) {
    this.db = getDatabaseReference();
    if (getMessagingIprepApp) this.messagingAdmin = getMessagingIprepApp();
  }

  getValueSync = (path) => {
    return new Promise((resolve, reject) => {
      try {
        this.db
          .child(path)
          .once('value')
          .then((snapshot) => {
            const data = snapshot.val();
            return resolve({ error: null, data });
          })
          .catch((error) => {
            return resolve({ error });
          });
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  };

  getValueAsync = (path, next) => {
    try {
      this.db
        .child(path)
        .once('value')
        .then((snapshot) => {
          const data = snapshot.val();
          next(null, data);
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getChunksAsync = (path, startAfter, limit, next) => {
    try {
      let instance = this.db.child(path).limitToFirst(limit);
      if (startAfter && startAfter !== 'undefined') {
        instance = this.db.child(path).orderByKey().startAfter(startAfter).limitToFirst(limit);
      }

      instance
        .once('value', (snap) => {
          next(null, snap.val());
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getChunksSync = (path, startAfter, limit) => {
    let instance = this.databaseRef.child(path).limitToFirst(limit).once('value');
    if (startAfter && startAfter !== 'undefined') {
      instance = this.databaseRef.child(path).orderByKey().startAfter(startAfter).limitToFirst(limit).once('value');
    }

    return new Promise((resolve, reject) => {
      instance
        .then((snapshot) => {
          resolve(snapshot.val());
        })
        .catch((e) => {
          reject(e);
        });
    });
  };

  getIndexedValueSync = (path, orderByKey, value) => {
    return new Promise((resolve, reject) => {
      try {
        const ref = this.db.child(path);
        ref
          .orderByChild(orderByKey)
          .equalTo(value)
          .once('value')
          .then((snapshot) => {
            const data = snapshot.val();
            resolve({ error: null, data });
          })
          .catch((error) => {
            resolve({ error });
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  setValueSync = (path, data) => {
    return new Promise((resolve, reject) => {
      try {
        this.db
          .child(path)
          .set(data)
          .then(() => {
            return resolve();
          })
          .catch((error) => {
            return reject(error);
          });
      } catch (error) {
        console.log(error);
        return reject(error);
      }
    });
  };

  setValueAsync = (path, data, next) => {
    try {
      this.db
        .child(path)
        .set(data)
        .then(() => {
          next();
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateValueAsync = (path, data, next) => {
    try {
      this.db
        .child(path)
        .update(data)
        .then(() => {
          next();
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  updateValueSync = (path, data) => {
    return new Promise((resolve, reject) => {
      try {
        this.db
          .child(path)
          .update(data)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };
  deleteValueAsync = (path, next) => {
    try {
      this.db
        .child(path)
        .remove()
        .then(() => {
          next();
        })
        .catch((error) => {
          next(error);
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  deleteValueSync = (path) => {
    return new Promise((resolve, reject) => {
      try {
        this.db
          .child(path)
          .remove()
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  push = (path, data, next) => {
    try {
      const pushKey = this.db.push().key;
      const ref = this.db.child(path).child(pushKey);
      ref
        .set(data)
        .then(() => {
          next();
        })
        .catch((e) => {
          next(e);
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  sendMulticastMessage = (message) => {
    return new Promise((resolve, reject) => {
      this.messagingAdmin
        .sendMulticast(message)
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error);
        });
    });
  };

  getPushKey = (path) => {
    return new Promise(async (resolve, reject) => {
      try {
        const pushKey = await this.db.child(path).push().key;
        return resolve(pushKey);
      } catch (error) {
        return reject(error);
      }
    });
  };
}

export default Crud;
