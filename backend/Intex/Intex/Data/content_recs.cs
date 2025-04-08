using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex.Data
{
    public class content_recs
    {
        [Key]
        public int Id { get; set; }  // Primary key

        [ForeignKey("BaseMovie")]
        public string base_show_id { get; set; }

        [ForeignKey("RecommendedMovie")]
        public string recommended_show_id { get; set; }

        public double similarity_score { get; set; }

        // Navigation properties
        public movies_titles BaseMovie { get; set; }
        public movies_titles RecommendedMovie { get; set; }
    }
}
