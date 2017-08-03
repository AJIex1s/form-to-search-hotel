using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace asp.net_mvc.Controllers
{
    public class AppController : Controller
    {
        //
        // GET: /App/
        public ActionResult Index()
        {
            return Redirect("/app/searchForm");
        }
        public ActionResult SearchForm()
        {
            return View();
        }
        public ActionResult SearchRequests() {
            return View();
        }
	}
}