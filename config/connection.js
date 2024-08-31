/**CONNECTION:
 * object containing all the values need to connect to the database.
 * - this info should be kept secret.
 */
const connection = {
    databaseName: 'dashboard_schema',
    username: '',
    password: '',
    host: 'localhost', // Ensure this is included
    port: 3306
};

module.exports = connection;
