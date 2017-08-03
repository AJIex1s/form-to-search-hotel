using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace asp.net_mvc.Models {
    public class FormData {
        [Key]
        public Guid Id { get; set; }
        public DateTime Sended { get; set; }
        public string FieldsValues { get; set; }

    }
}