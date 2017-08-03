using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace asp.net_mvc.Models {
    public class FormDataModel : DbContext {
        public FormDataModel() :
            base("name=FormsData") {
        }

        public DbSet<FormData> FormsData { get; set; }

        public void AddFormData(string fieldValuesJson) {
            FormsData.Add(new FormData() { Id = Guid.NewGuid(), FieldsValues = fieldValuesJson, Sended = DateTime.Now });

            this.SaveChanges();
        }
    }
}