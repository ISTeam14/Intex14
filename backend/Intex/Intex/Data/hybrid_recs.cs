using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex.Data
{
    public class hybrid_recs
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column("base_show_id")]
        public string base_show_id { get; set; }

        [Required]
        [Column("recommended_show_id")]
        public string recommended_show_id { get; set; }

        [Required]
        [Column("similarity_score")]
        public double similarity_score { get; set; }

        [ForeignKey("base_show_id")]
        public movies_titles BaseMovie { get; set; }

        [ForeignKey("recommended_show_id")]
        public movies_titles RecommendedMovie { get; set; }
    }
}
