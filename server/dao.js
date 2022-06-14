'use strict';

const db = require('./db');

// appId, creatorAddress, name, description, imageUrl, start, end, goal
exports.createApp = (appId, creatorAddress, name, description, imageUrl, start, end, goal) => {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO application(appId, creatorAddress, name, description, imageUrl, start, end, goal)VALUES(?,?,?,?,?,?,?,?)`;
		db.run(sql, [
            appId,
            creatorAddress,
			name,
            description,
            imageUrl,
            start,
            end,
            goal
		], function (err) {
			if (err) {
                console.log(err)
				reject(err);
				return;
			}
			resolve(this.lastID);
		});
	});
};

exports.getAllApplications = () => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM application";
        db.all(sql, [], function (err, rows) {
			if (err) {
				reject(err);
				return;
			}
            resolve(rows);
        }); 
	});
};

exports.getApplicationsFromCreatorAddress = (creatorAddress) => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM application WHERE creatorAddress = '" + creatorAddress + "'";
		db.all(sql, [], function (err, rows) {
			if (err) {
				reject(err);
				return;
			}
            resolve(rows);
        }); 
	});
};

//"SELECT * FROM application WHERE creatorAddress = '" + creatorAddress + "' AND start = '" + start + "'"