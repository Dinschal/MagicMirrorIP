/**
* @file MagicMirrorIP.js
* @author Dinschal
*/

/**
 * @external Module
 * @see https://github.com/MichMich/MagicMirror/blob/master/js/module.js
 */

/**
 * @external Log
 * @see https://github.com/MichMich/MagicMirror/blob/master/js/logger.js
 */

 /**
  * @module MagicMirrorIP
  * @description Frontend for the MagicMirror to display ethernet or wlan data.
  *
  * @requires external:Module
  * @requires external:Log
  */

  Module.register('MagicMirrorIP', {
  /** @member {?Object} interfaces - Network interfaces of the computer. */
  interfaces: null,

  /**
  * @member {Object} defaults - Define the default config values of the module
  * @property {int} fontSize - Size of the displayed text in pixel
  * @property {boolean} dimmed - True or false for enable/disable dimming
  * @property {string[]} types - Types of network inferface.
  * @property {string[]} families - IP address families.
  */

  defaults: {
       fontSize: 9,
       dimmed: true,
       types:['eth0', 'wlan0'],
       families: ['IPv4', 'IPv6']
  },

  /**
  * @function getTranslation
  * @description Translation for the module
  * @override
  *
  * @returns {Object.<string, string>} Available translation for the module (key: language code, value: filepath)
  */

  getTranslation(){
        return {
            de: 'translation/de.json'
        };
  },

 /**
 * @function getTemplate
 * @description Nunjuck template
 * @override
 *
 * @returns {string} path to nunjuck template
 */

 getTemplate() {
        return 'template/MagicMirrorIP.njk';
 }

 /**
 * @function getTemplateData
 * @description data that is needed to render the nunjuck template
 * @override
 *
 * returns {Object} data for nunjuck template
 */

 getTemplateData() {
        return {
        config: this.config,
        interfaces: this.interfaces,
        };
 },

 /**
 * @function start
 * @description adds nunjuck globals and requests network interfaces from node_helper
 * @override
 *
 * @returns {void}
 */

 start() {
        Log.info(`Starting module: ${this.name}`);
        this.addGlobals();
        this.sendSocketNotification('GET_NETWORK_INFERFACES');
 },

  /**
  * @function socketNotificationReceived
  * @description Handles incoming messages from node_helper.
  * @override
  *
  * @param {string} notification - notification name
  * @param {*} payload - detailed payload of the notification.
  */

  socketNotificationReceived(notification, payload) {
        if (notification === 'NETWORK_INTERFACES') {
            this.interfaces = payload;
            Log.info('interfaces', payload);
            this.updateDom(300);
        }
    },

  /**
  * @function getMacAddress
  * @description Helper function to get mac adress from array item.
  *
  * @param {Object[]} array - Objects with property mac for the mac address.
  *
  * @returns {string} Mac address or empty string.
  */

  getMacAddress(array= []) {
        for (const item of array) {
            if (item.mac) {
                return `(MAC: ${item.mac})`;
            }
        }

        return '';
    },

  /**
  * @function includes
  * @description Helper function to check if item is included in the array.
  *
  * @param {string[]} array - Array of texts.
  * @param {string} item - Text that should be checked for.
  *
  * @returns {boolean} Is the item included in the array?
  */

  includes(array= [], item) {
        return array.includes(item);
    },

  /**
  * @function addGlobals
  * @description Adds custom globals used by the nunjuck template.
  *
  * @returns {void}
  */

  addGlobals() {
        this.nunjucksEnvironment().addGlobal('includes', this.includes);
    }

  }); //End of Module