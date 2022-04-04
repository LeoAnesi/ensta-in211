module.exports = {
  type: "postgres",
  host: "database-1.cmxb7wpkjrv9.eu-west-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: process.env.DATABASE_PASSWORD,
  database: "leo",
  synchronize: false,
  entities: ["entities/*.js"],
  migrations: ["migrations/*.js"],
  cli: {
    migrationsDir: "migrations",
  },
};
