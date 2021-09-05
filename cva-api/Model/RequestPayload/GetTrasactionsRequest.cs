

using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public class GetTransactionsRequest
    {  
        [Required(ErrorMessage = "TransactionType is required")]
        public TransactionType TransactionType { get; set; }

    }
}
