import "/assets/styles/globals.css";
import { Provider } from "/shared/config/Context";
import { auth } from "/auth";
import { redirect } from "next/navigation";
import SideNav from "/widgets/Admin/SideNav";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Kimpactify Store | Find your affordable wears.",
  description: "Find your affordable wears",
  keywords: "Clothing, african wears, styled clothing",
};

const DashboardLayout = async ({ children }) => {
  const session = await auth();

  if (!session?.user) redirect("/admin/auth/login");

  return (
    <Provider>
      <html lang="en">
        <body>
          <main className="">
            <Toaster />
            <div className="bg-slate-50 flex items-start fixed right-0 left-0 top-0 bottom-0">
              <SideNav />
              <div className="flex-1 w-full px-8 py-10 h-full overflow-y-auto">
                {children}
              </div>
            </div>
          </main>
        </body>
      </html>
    </Provider>
  );
};

export default DashboardLayout;
