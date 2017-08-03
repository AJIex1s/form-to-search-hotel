using asp.net_mvc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace asp.net_mvc.Controllers
{
    public class DataServiceController : ApiController {
        private FormDataModel formDataModel = new FormDataModel();

        public List<FormData> Get() {
            return formDataModel.FormsData.ToList();
        }

        public HttpResponseMessage Post(object json) {
            formDataModel.AddFormData(json.ToString());

            var message = Request.CreateResponse(HttpStatusCode.Created);
            return message;
        }
        public HttpResponseMessage Options() {
            var message = Request.CreateResponse(HttpStatusCode.OK);
            return message;
        }
    }
}
