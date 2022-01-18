/**
 * @file node_helper.js
 *
 * @author Dinschal
 */

 /**
 * @external node_helper
 * @see https://github.com/MichMich/MagicMirror/blob/master/modules/node_modules/node_helper/index.js
 */

 const NodeHelper = require('node_helper');

 /**
 * @external os
 * @see https://nodejs.org/api/os.html
 */

 const interfaces = require('os').networkInterfaces();

 /**
 * @module node_helper
 * @description backend for module to get information about network interfaces of the computer
 *
 * @requires external:os
 * @requires external:node_helper
 */

 module.exports = NodeHelper.create({
 /**
 * @function start
 * @description logs a startmessage to the console
 * @override
 *
 * @returns {void}
 */

 start() {
    console.log(`Starting module helper: ${this.name}`);
    console.log(`Available network interface types: ${Object.keys(interfaces).join(', ')}`);
 },

 /**
 * @function socketNotificationReceived
 * @description recieves socket notifications from module
 * @override
 *
 * @param {string} notification notification name
 *
 * @returns {void}
 */

 socketNotificationReceived(notification) {
    if (notification === 'GET_NETWORK_INTERFACES') {
        this.sendSocketNotification('NETWORK_INTERFACES', interfaces);
    }
 }

 }); //end of node_helper.js