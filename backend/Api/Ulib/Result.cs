namespace Api.Ulib;

/// <summary>
/// Result of handler without data.
/// Output will be body of response.
/// Code is http code of response.
/// </summary>
public class UResult
{
    public UError? Error { get; }

    public int Code { get; }

    public string? AccessToken { get; set; }

    public UResult(int code, UError? error = null, string? accessToken = null)
    {
        Error = error;
        Code = code;
        AccessToken = accessToken;
    }
}

/// <summary>
/// Result of handler without data.
/// Output will be body of response.
/// Code is http code of response.
/// </summary>
public class UResult<T> : UResult where T : class
{
    public T? Data { get; }

    public UResult(int code, UError error) : base(code, error)
    {
    }

    public UResult(T data) : base(200)
    {
        Data = data;
    }

    public static implicit operator UResult<T>(T data) => new(data);
}