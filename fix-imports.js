const fs = require('fs');
const path = require('path');

function replaceImportsInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.next', '.git'].includes(file)) {
                replaceImportsInDir(fullPath);
            }
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Replace '@/' with '/' for our FSD folders
            const regex = /['"]@\/(shared|entities|features|widgets)\/(.*?)['"]/g;
            
            if (regex.test(content)) {
                content = content.replace(regex, "'/$1/$2'");
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed alias in ${fullPath}`);
            }
        }
    }
}

console.log("Fixing alias paths...");
replaceImportsInDir('.');
console.log("Done.");
