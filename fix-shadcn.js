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
            
            if (content.includes('/shared/ui/shadcn/')) {
                content = content.replace(/\/components\/shadcn\//g, '/shared/ui/shadcn/');
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Fixed shadcn import in ${fullPath}`);
            }
        }
    }
}

console.log("Fixing shadcn paths...");
replaceImportsInDir('.');
console.log("Done.");
