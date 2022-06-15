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

//funderAddress, appId, amount
exports.fundApp = (funderAddress, appId, amount) => {
	return new Promise((resolve, reject) => {
		const sql = `INSERT INTO fundedApplication(funderAddress, appId, amount)VALUES(?,?,?)`;
		db.run(sql, [
			funderAddress,
			appId,
			amount
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

exports.getApplicationFromAppId = (appId) => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT * FROM application WHERE appId = '" + appId + "'";
		db.all(sql, [], function (err, rows) {
			if (err) {
				reject(err);
				return;
			}
			resolve(rows);
		});
	});
};

exports.getAllFundedAppsFromFunderAddress = (funderAddress) => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT appId, sum(amount) FROM fundedApp WHERE funderAddress = '" + funderAddress + "' GROUP BY appId";
		db.all(sql, [], function (err, rows) {
			if (err) {
				reject(err);
				return;
			}
			resolve(rows);
		});
	});
};

exports.getFundedAppAmountFromFunderAddressAndAppId = (funderAddress, appId) => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT appId, sum(amount) FROM fundedApp WHERE funderAddress = '" + funderAddress + "' AND appId = '" + appId + "' GROUP BY appId";
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