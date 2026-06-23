const fs = require('fs');
const path = require('path');

const MAPPINGS = {
    // components
    '/features/Cart/CartItem': 'features/Cart/CartItem.jsx',
    '/widgets/Header/CategoryNav': 'widgets/Header/CategoryNav.jsx',
    '/widgets/Admin/CategoryTable': 'widgets/Admin/CategoryTable.jsx',
    '/features/Checkout/Confirmation': 'features/Checkout/Confirmation.jsx',
    '/shared/ui/ImageDisplay': 'shared/ui/ImageDisplay.jsx',
    '/features/Checkout/OrderItem': 'features/Checkout/OrderItem.js',
    '/features/Checkout/OrderSummary': 'features/Checkout/OrderSummary.jsx',
    '/features/Checkout/PayForm': 'features/Checkout/PayForm.jsx',
    '/shared/ui/ProductSkeleton': 'shared/ui/ProductSkeleton.jsx',
    '/shared/ui/SearchInput': 'shared/ui/SearchInput.jsx',
    '/shared/ui/Table': 'shared/ui/Table.jsx',
    '/shared/ui/TableLoader': 'shared/ui/TableLoader.jsx',

    // container
    '/widgets/Cart/CartContainer': 'widgets/Cart/CartContainer.jsx',
    '/widgets/CategoryGrid/CategoriesPage': 'widgets/CategoryGrid/CategoriesPage.jsx',
    '/widgets/Admin/DashboardCategories': 'widgets/Admin/DashboardCategories.jsx',
    '/widgets/Admin/DashboardProducts': 'widgets/Admin/DashboardProducts.jsx',
    '/features/Auth/LoginContainer': 'features/Auth/LoginContainer.jsx',
    '/widgets/ProductGrid/ProductsPage': 'widgets/ProductGrid/ProductsPage.jsx',
    '/features/Auth/Register': 'features/Auth/Register.jsx',
};

function ensureDirSync(dirpath) {
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath, { recursive: true });
    }
}

// 1. Move files
for (const [oldPath, newPath] of Object.entries(MAPPINGS)) {
    if (fs.existsSync(oldPath)) {
        console.log(`Moving ${oldPath} to ${newPath}`);
        ensureDirSync(path.dirname(newPath));
        fs.renameSync(oldPath, newPath);
    } else {
        console.log(`WARN: ${oldPath} does not exist`);
    }
}

// 2. Search and Replace imports globally
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
            let modified = false;

            for (const [oldPath, newPath] of Object.entries(MAPPINGS)) {
                const oldNoExt = oldPath.replace(/\.jsx?$/, '');
                const newNoExt = newPath.replace(/\.jsx?$/, '');

                const regex = new RegExp(`['"\`](\\.|\\/)*${oldNoExt}(?:\\.jsx?)?['"\`]`, 'g');
                
                content = content.replace(regex, (match) => {
                    modified = true;
                    return `'@/${newNoExt}'`;
                });
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated imports in ${fullPath}`);
            }
        }
    }
}

console.log("Updating imports...");
replaceImportsInDir('.');
console.log("Done.");

// 3. Try removing empty directories
try {
    if (fs.readdirSync('components').length === 0) fs.rmdirSync('components');
    if (fs.readdirSync('container').length === 0) fs.rmdirSync('container');
} catch (e) {
    console.log("Could not remove old folders (might not be empty)");
}
