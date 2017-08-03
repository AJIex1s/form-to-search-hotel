using System.Web;
using System.Web.Optimization;

namespace asp.net_mvc
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                        "~/Scripts/app-{version}.js"));
            
            bundles.Add(new ScriptBundle("~/bundles/polifills").Include(
                        "~/Scripts/polyfills-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/vendor").Include(
                        "~/Scripts/vendor-{version}.js"));

            bundles.Add(new StyleBundle("~/Content/angular4css").Include(
                      "~/Content/app-{version}.css",
                      "~/Content/vendor-{version}.css"));

           
        }
    }
}
