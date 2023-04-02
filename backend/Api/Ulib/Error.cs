namespace Api.Ulib;

/// <summary>
/// Error returned in output
/// </summary>
public class UError
{
    public string Message { get; set; }

    public UError(string message)
    {
        Message = message;
    }

    // while we have only message field
    public static implicit operator UError(string message) => new(message);
}