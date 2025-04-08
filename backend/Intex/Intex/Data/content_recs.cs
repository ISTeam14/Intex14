using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex.Data
{
    public class content_recs
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [ForeignKey("BaseMovie")]
        public string base_show_id { get; set; }

        [Required]
        [ForeignKey("RecommendedMovie")]
        public string recommended_show_id { get; set; }

        [Required]
        public double similarity_score { get; set; }

        public movies_titles BaseMovie { get; set; }
        public movies_titles RecommendedMovie { get; set; }
    }
}
