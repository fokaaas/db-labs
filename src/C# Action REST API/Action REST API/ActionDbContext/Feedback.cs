using System;
using System.Collections.Generic;

namespace Action_REST_API.ActionDbContext;

public partial class Feedback
{
    public int Id { get; set; }

    public string? Body { get; set; }

    public float Rating { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public int MediaRequestId { get; set; }

    public int UserId { get; set; }
}
