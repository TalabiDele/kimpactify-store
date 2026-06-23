const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Define mappings from old file to new file
const MAPPINGS = {
    // shared/ui
    '/shared/ui/Card': 'shared/ui/Card.jsx',
    '/shared/ui/Buttons': 'shared/ui/Buttons.jsx',
    '/shared/ui/Heading': 'shared/ui/Heading.jsx',
    '/shared/ui/More': 'shared/ui/More.jsx',
    '/shared/ui/Loader': 'shared/ui/Loader.jsx',
    '/shared/ui/CardSkeleton': 'shared/ui/CardSkeleton.jsx',
    '/shared/ui/shadcn': 'shared/ui/shadcn',
    '/shared/ui/StarRating': 'shared/ui/StarRating.jsx',
    '/shared/ui/ImageSlider': 'shared/ui/ImageSlider.jsx',
    '/shared/ui/Accordion': 'shared/ui/Accordion.jsx',
    '/shared/ui/Provider': 'shared/ui/Provider.jsx',
    '/shared/ui/ImageUpload': 'shared/ui/ImageUpload.jsx',
    '/shared/ui/Pagination': 'shared/ui/Pagination.jsx',

    // shared/api
    '/shared/api/requests': 'shared/api/requests.js',

    // entities
    '/entities/cart/model/cartStore': 'entities/cart/model/cartStore.js',
    '/shared/config/Context': 'shared/config/Context.jsx',
    
    // features
    '/features/ProductFilter/ProductsFilterContainer': 'features/ProductFilter/ProductsFilterContainer.jsx',
    '/features/CategoryNavigation/HomeDiscoverCard': 'features/CategoryNavigation/HomeDiscoverCard.jsx',
    '/features/Cart/PayModal': 'features/Cart/PayModal.jsx',
    '/features/Cart/CheckoutProducts': 'features/Cart/CheckoutProducts.jsx',

    // widgets
    '/widgets/Header/Navbar': 'widgets/Header/Navbar.jsx',
    '/widgets/Footer/Footer': 'widgets/Footer/Footer.jsx',
    '/widgets/Banner/Banner': 'widgets/Banner/Banner.jsx',
    '/widgets/ProductShowcase/TopPicks': 'widgets/ProductShowcase/TopPicks.jsx',
    '/widgets/ProductShowcase/AfricanWear': 'widgets/ProductShowcase/AfricanWear.jsx',
    '/widgets/ProductShowcase/KnitWears': 'widgets/ProductShowcase/KnitWears.jsx',
    '/widgets/ProductShowcase/CooperateWears': 'widgets/ProductShowcase/CooperateWears.jsx',
    '/widgets/ProductGrid/CardDisplay': 'widgets/ProductGrid/CardDisplay.jsx',
    '/widgets/ProductDetails/ProductContainer': 'widgets/ProductDetails/ProductContainer.jsx',
    '/widgets/ProductDetails/ProductDetails': 'widgets/ProductDetails/ProductDetails.jsx',
    '/widgets/Cart/Cart': 'widgets/Cart/Cart.jsx',
    
    // admin side
    '/widgets/Admin/AdminNav': 'widgets/Admin/AdminNav.jsx',
    '/widgets/Admin/AdminSidebar': 'widgets/Admin/AdminSidebar.jsx',
    '/widgets/Admin/SideNav': 'widgets/Admin/SideNav.jsx',
    '/features/Admin/AddProduct': 'features/Admin/AddProduct.jsx',
    '/features/Admin/EditProductModal': 'features/Admin/EditProductModal.jsx',
    '/features/Admin/DeleteProductModal': 'features/Admin/DeleteProductModal.jsx',
    '/features/Admin/AddCategory': 'features/Admin/AddCategory.jsx',
    '/features/Admin/EditCategory': 'features/Admin/EditCategory.jsx',
    '/features/Admin/DeleteCategoryModal': 'features/Admin/DeleteCategoryModal.jsx',
    '/features/Admin/DeleteOrderModal': 'features/Admin/DeleteOrderModal.jsx',
    '/features/Admin/OrderStatusModal': 'features/Admin/OrderStatusModal.jsx',
    '/widgets/Admin/AdminLayout': 'widgets/Admin/AdminLayout.jsx',
    '/widgets/Admin/CustomersContainer': 'widgets/Admin/CustomersContainer.jsx',
    '/widgets/Admin/OrderContainer': 'widgets/Admin/OrderContainer.jsx',
    '/widgets/Admin/ProductTable': 'widgets/Admin/ProductTable.jsx',
    '/widgets/Admin/CategoryTable': 'widgets/Admin/CategoryTable.jsx',
};

function ensureDirSync(dirpath) {
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath, { recursive: true });
    }
}

// 2. Move files
for (const [oldPath, newPath] of Object.entries(MAPPINGS)) {
    if (fs.existsSync(oldPath)) {
        console.log(`Moving ${oldPath} to ${newPath}`);
        ensureDirSync(path.dirname(newPath));
        fs.renameSync(oldPath, newPath);
    } else {
        console.log(`WARN: ${oldPath} does not exist`);
    }
}

// 3. Search and Replace imports globally
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
                // Remove extension for import matching
                const oldNoExt = oldPath.replace(/\.jsx?$/, '');
                const newNoExt = newPath.replace(/\.jsx?$/, '');

                // Match variations of imports:
                // import ... from '/shared/ui/Card'
                // import ... from '/shared/ui/Card'
                // import ... from '/shared/ui/Card'
                
                // We'll replace any string containing /components/Card (with or without extension)
                // We need to be careful with things like /components/CardDisplay matching /components/Card
                
                // Let's use regex
                const regex = new RegExp(`['"\`](\\.|\\/)*${oldNoExt}(?:\\.jsx?)?['"\`]`, 'g');
                
                content = content.replace(regex, (match) => {
                    modified = true;
                    // We will just replace it with an absolute alias @/newPath
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
