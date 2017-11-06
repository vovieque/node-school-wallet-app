const mongoose = require('mongoose');
const SchemaVersion = require('../source/models/db/schema-version');

//config
const scriptsDir = '../scripts/migrations/';
const migrationScriptPathes = [
    `${scriptsDir}/001_attachAllCardsToFirstUser`,
    `${scriptsDir}/002_Card_userId_to_ownerIds`
];


const getVersion = async () => {
    return await SchemaVersion.getCurrentVersion();
}

 /**
  * @param {{ description: String, version: Number, applyChanges: Function}} migration
  Object, containing all inforamtion about migration from one version to another
  */
const migrateIfNeeded = async (migration) => {
    const currentSchemaVersion = await getVersion();
    if (migration.version > currentSchemaVersion) {
        console.log(`Миграция: Применяем версию ${ migration.version }. ${ migration.description }`);
        try {
            await migration.applyChanges();
        }
        catch(e) {
            console.error("В процессе миграции возникла ошибка:");
            console.error(e);
            process.exit(1);
        }
        const version = new SchemaVersion({
            version: migration.version
        });
        await version.save();
    }
}

module.exports = async () => {
    const currentSchemaVersion = await getVersion();
    console.log(`Миграция: Версия схемы перед миграцией: ${ currentSchemaVersion || "Не указана" }`);    
    const migrations = migrationScriptPathes.map((path) => require(path));
    for (let migration of migrations) {
        await migrateIfNeeded(migration);
    }
    console.log("Миграция: Все необходимые операции по мигации применены");
};