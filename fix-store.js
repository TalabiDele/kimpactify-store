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
            
            if (content.includes('/shared/')) {
                // Replace all instances of /shared/ with /shared/
                content = content.replace(/\.\.\/shared\//g, '/shared/');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed store import in ${fullPath}`);
            }
        }
    }
}

console.log("Fixing store paths...");
replaceImportsInDir('.');
console.log("Done.");
