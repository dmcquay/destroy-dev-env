const shortUuid = require('short-uuid');

function generateRandomTableName() {
    return `table_${shortUuid.generate()}`
}

function generateRandomColumnName() {
    return `column_${shortUuid.generate()}`
}

const columnSpecs = [
    'TEXT NOT NULL',
    'TIMESTAMP WITHOUT TIME ZONE NOT NULL',
    'UUID NOT NULL'
]

function getRandomColumnSpec() {
    return columnSpecs[Math.floor(Math.random() * columnSpecs.length)]
}

function createTable() {
    const columns = []
    for (let i = 0; i < 10; i++) {
        columns.push(`${generateRandomColumnName()} ${getRandomColumnSpec()}`)
    }
    
    return {
        name: generateRandomTableName(),
        columns
    }
}

function generateCreateTableString(table) {
    return `CREATE TABLE ${table.name} (\n\t${table.columns.join(',\n\t')}\n);`
}

function main() {
    const count = parseInt(process.argv[2])
    for (let i = 0; i < count; i++) {
        const t = createTable()
        console.log(generateCreateTableString(t))
    }
}

main()