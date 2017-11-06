const mongoose = require('mongoose');
const SchemaVersion = require('../source/models/db/schema-version');

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
        await migration.applyChanges();
        const version = new SchemaVersion({
            version: migration.version
        });
        await version.save();
    }
}

module.exports = async () => {
    const currentSchemaVersion = await getVersion();
    console.log(`Миграция: Версия схемы перед миграцией: ${ currentSchemaVersion.version || "Не указана" }`);    
    const scriptsDir = '../scripts/migrations/';
    const migrationScriptPathes = [
        `${scriptsDir}/001_attachAllCardsToFirstUser`
    ];
    const migrations = migrationScriptPathes.map((path) => require(path));
    for (let migration of migrations) {
        await migrateIfNeeded(migration);
    }
    console.log("Миграция: Все необходимые операции по мигации применены");
};