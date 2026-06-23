const fs = require('fs');
const path = require('path');

// This is the reverse of our original mapping so we know where files ended up
const MAPPINGS = {
    'components/Card.jsx': 'shared/ui/Card.jsx',
    'components/Buttons.jsx': 'shared/ui/Buttons.jsx',
    'components/Heading.jsx': 'shared/ui/Heading.jsx',
    'components/More.jsx': 'shared/ui/More.jsx',
    'components/Loader.jsx': 'shared/ui/Loader.jsx',
    'components/CardSkeleton.jsx': 'shared/ui/CardSkeleton.jsx',
    'components/shadcn': 'shared/ui/shadcn',
    'components/StarRating.jsx': 'shared/ui/StarRating.jsx',
    'components/ImageSlider.jsx': 'shared/ui/ImageSlider.jsx',
    'components/Accordion.jsx': 'shared/ui/Accordion.jsx',
    'components/Provider.jsx': 'shared/ui/Provider.jsx',
    'components/ImageUpload.jsx': 'shared/ui/ImageUpload.jsx',
    'components/Pagination.jsx': 'shared/ui/Pagination.jsx',
    'utils/requests.js': 'shared/api/requests.js',
    'store/cartStore.js': 'entities/cart/model/cartStore.js',
    'context/Context.jsx': 'shared/config/Context.jsx',
    'container/ProductsFilterContainer.jsx': 'features/ProductFilter/ProductsFilterContainer.jsx',
    'components/HomeDiscoverCard.jsx': 'features/CategoryNavigation/HomeDiscoverCard.jsx',
    'components/PayModal.jsx': 'features/Cart/PayModal.jsx',
    'components/CheckoutProducts.jsx': 'features/Cart/CheckoutProducts.jsx',
    'components/Navbar.jsx': 'widgets/Header/Navbar.jsx',
    'components/Footer.jsx': 'widgets/Footer/Footer.jsx',
    'components/Banner.jsx': 'widgets/Banner/Banner.jsx',
    'components/TopPicks.jsx': 'widgets/ProductShowcase/TopPicks.jsx',
    'container/AfricanWear.jsx': 'widgets/ProductShowcase/AfricanWear.jsx',
    'container/KnitWears.jsx': 'widgets/ProductShowcase/KnitWears.jsx',
    'container/CooperateWears.jsx': 'widgets/ProductShowcase/CooperateWears.jsx',
    'container/CardDisplay.jsx': 'widgets/ProductGrid/CardDisplay.jsx',
    'container/ProductContainer.jsx': 'widgets/ProductDetails/ProductContainer.jsx',
    'container/ProductDetails.jsx': 'widgets/ProductDetails/ProductDetails.jsx',
    'components/Cart.jsx': 'widgets/Cart/Cart.jsx',
    'components/AdminNav.jsx': 'widgets/Admin/AdminNav.jsx',
    'components/AdminSidebar.jsx': 'widgets/Admin/AdminSidebar.jsx',
    'components/SideNav.jsx': 'widgets/Admin/SideNav.jsx',
    'components/AddProduct.jsx': 'features/Admin/AddProduct.jsx',
    'components/EditProductModal.jsx': 'features/Admin/EditProductModal.jsx',
    'components/DeleteProductModal.jsx': 'features/Admin/DeleteProductModal.jsx',
    'components/AddCategory.jsx': 'features/Admin/AddCategory.jsx',
    'components/EditCategory.jsx': 'features/Admin/EditCategory.jsx',
    'components/DeleteCategoryModal.jsx': 'features/Admin/DeleteCategoryModal.jsx',
    'components/DeleteOrderModal.jsx': 'features/Admin/DeleteOrderModal.jsx',
    'components/OrderStatusModal.jsx': 'features/Admin/OrderStatusModal.jsx',
    'container/AdminLayout.jsx': 'widgets/Admin/AdminLayout.jsx',
    'container/CustomersContainer.jsx': 'widgets/Admin/CustomersContainer.jsx',
    'container/OrderContainer.jsx': 'widgets/Admin/OrderContainer.jsx',
    'container/ProductTable.jsx': 'widgets/Admin/ProductTable.jsx',
    'container/CategoryTable.jsx': 'widgets/Admin/CategoryTable.jsx',
    'components/CartItem.jsx': 'features/Cart/CartItem.jsx',
    'components/CategoryNav.jsx': 'widgets/Header/CategoryNav.jsx',
    'components/CategoryTable.jsx': 'widgets/Admin/CategoryTable.jsx',
    'components/Confirmation.jsx': 'features/Checkout/Confirmation.jsx',
    'components/ImageDisplay.jsx': 'shared/ui/ImageDisplay.jsx',
    'components/OrderItem.js': 'features/Checkout/OrderItem.js',
    'components/OrderSummary.jsx': 'features/Checkout/OrderSummary.jsx',
    'components/PayForm.jsx': 'features/Checkout/PayForm.jsx',
    'components/ProductSkeleton.jsx': 'shared/ui/ProductSkeleton.jsx',
    'components/SearchInput.jsx': 'shared/ui/SearchInput.jsx',
    'components/Table.jsx': 'shared/ui/Table.jsx',
    'components/TableLoader.jsx': 'shared/ui/TableLoader.jsx',
    'container/CartContainer.jsx': 'widgets/Cart/CartContainer.jsx',
    'container/CategoriesPage.jsx': 'widgets/CategoryGrid/CategoriesPage.jsx',
    'container/DashboardCategories.jsx': 'widgets/Admin/DashboardCategories.jsx',
    'container/DashboardProducts.jsx': 'widgets/Admin/DashboardProducts.jsx',
    'container/LoginContainer.jsx': 'features/Auth/LoginContainer.jsx',
    'container/ProductsPage.jsx': 'widgets/ProductGrid/ProductsPage.jsx',
    'container/Register.jsx': 'features/Auth/Register.jsx',
};

// Also we need a reverse lookup map based on just file names
const fileMap = {};
for (const [oldPath, newPath] of Object.entries(MAPPINGS)) {
    const filename = path.basename(oldPath, path.extname(oldPath));
    fileMap[filename] = newPath;
}

function replaceImportsInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.next', '.git', 'app'].includes(file)) {
                replaceImportsInDir(fullPath);
            }
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            // Regex to find import statements with relative paths
            const regex = /from\s+['"](\.\.?\/.*?)['"]/g;
            
            content = content.replace(regex, (match, relativePath) => {
                // If it's ./something or ../something, let's extract the basename
                const basename = path.basename(relativePath, path.extname(relativePath));
                
                // If the relative path actually resolves correctly in the new structure, leave it alone.
                let resolvedAbsPath = path.resolve(path.dirname(fullPath), relativePath);
                
                // Check if the file exists (with .js, .jsx, .ts, etc)
                if (fs.existsSync(resolvedAbsPath) || 
                    fs.existsSync(resolvedAbsPath + '.js') || 
                    fs.existsSync(resolvedAbsPath + '.jsx') || 
                    fs.existsSync(resolvedAbsPath + '.ts') || 
                    fs.existsSync(resolvedAbsPath + '.tsx')) {
                    return match; // It's a valid relative path still!
                }
                
                // If it's broken, it means the target file was moved somewhere else. 
                // Let's look up its new location in our fileMap
                if (fileMap[basename]) {
                    modified = true;
                    const cleanPath = fileMap[basename].replace(/\.jsx?$/, '');
                    console.log(`Fixing broken import in ${fullPath}: ${relativePath} -> /${cleanPath}`);
                    return `from '/${cleanPath}'`;
                }

                return match;
            });

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

console.log("Fixing relative broken paths...");
replaceImportsInDir('.');
console.log("Done.");
