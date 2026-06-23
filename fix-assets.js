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
            
            if (content.includes('/assets')) {
                // Replace all instances of /assets with /assets
                content = content.replace(/\.\.\/assets/g, '/assets');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed assets import in ${fullPath}`);
            }
        }
    }
}

console.log("Fixing assets paths...");
replaceImportsInDir('.');
console.log("Done.");
