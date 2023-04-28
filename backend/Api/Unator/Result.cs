namespace Api.Unator;

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
public class UResult<T> where T : class
{
    public T? Data { get; }

    public int Code { get; }
    public UError? Error { get; }

    public string? AccessToken { get; set; }

    public UResult(int code, UError error)
    {
        Code = code;
        Error = error;
    }

    public UResult(T data)
    {
        Data = data;
        Code = 200;
    }

    public UResult(int code, UError? error, string? accessToken)
    {
        Code = code;
        AccessToken = accessToken;
        Error = error;
    }

    public static implicit operator UResult<T>(T data) => new(data);

    public static implicit operator UResult<T>(UResult result) => new(result.Code, result.Error, result.AccessToken);
}

public class UData<T>
{
    public T? Data { get; }
}