const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;

const db = pgp(
  'postgres://ouhvltpduxmogf:14bd371be3883441bcb4d6d1a1aa1d990f8677665a7bc203a765069129b8e6c5@ec2-54-247-123-231.eu-west-1.compute.amazonaws.com:5432/d9fej1ob3jfs9u'
);

export default db;
