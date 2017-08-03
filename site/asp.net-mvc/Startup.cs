using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(asp.net_mvc.Startup))]
namespace asp.net_mvc
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
