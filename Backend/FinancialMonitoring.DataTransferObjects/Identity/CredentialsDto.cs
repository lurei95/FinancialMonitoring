namespace FinancialMonitoring.DataTransferObjects.Identity
{
  /// <summary>
  /// Login credentials
  /// </summary>
  public sealed class CredentialsDto
  {
    /// <summary>
    /// Email of the user
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Password of the user
    /// </summary>
    public string Password { get; set; }
  }
}
