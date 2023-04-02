namespace Api.Ulib;

public record class UOutput(UError? Error = null);

/// <summary>
/// Output of API without access token
/// </summary>
public record class UOutput<T>(T? Data, UError? Error);

/// <summary>
/// Output of API with access token for internal usage.
/// It's seperate class because I don't want to send "accessToken":null when devs use API externaly.
/// </summary>
public record class UAuthOutput(UError? Error, string AccessToken);

/// <summary>
/// Output of API with access token for internal usage.
/// It's seperate class because I don't want to send "accessToken":null when devs use API externaly.
/// </summary>
public record class UAuthOutput<T>(T? Data, UError? Error, string AccessToken);