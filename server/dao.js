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

//Get funded apps by a single funder
exports.getAllFundedAppsFromFunderAddress = (funderAddress) => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT appId FROM fundedApplication WHERE funderAddress = '" + funderAddress + "'";
		db.all(sql, [], function (err, rows) {
			if (err) {
				reject(err);
				return;
			}
			resolve(rows);
		});
	});
};

//Get funded amount from a single funder relating to a single app
exports.getFundedAppAmountFromFunderAddressAndAppId = (funderAddress, appId) => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT sum(amount) as amount FROM fundedApplication WHERE funderAddress = '" + funderAddress + "' AND appId = '" + appId + "' GROUP BY appId";
		db.all(sql, [], function (err, rows) {
			if (err) {
				reject(err);
				return;
			}
			resolve(rows);
		});
	});
};

exports.getFundedAppAmountFromAppId = (appId) => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT sum(amount) as amount FROM fundedApplication WHERE appId = '" + appId + "' GROUP BY appId";
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