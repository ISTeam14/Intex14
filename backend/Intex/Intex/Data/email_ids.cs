using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Intex.Data
{
    public class email_ids
    {
        [Key]
        public int user_id { get; set; }

        public string? email { get; set; }
    }
}
