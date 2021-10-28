using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace FinancialMonitoring.Utility.Security
{
  /// <summary>
  /// class for creating and verifying password hashes
  /// </summary>
  public sealed class SaltedHash
  {
    private const int saltLength = 6;

    /// <summary>
    /// Salt for the hash
    /// </summary>
    public string Salt { get; private set; }

    /// <summary>
    /// The hash
    /// </summary>
    public string Hash { get; private set; }

    /// <summary>
    /// Creates an instance of <see cref="SaltedHash"/>
    /// </summary>
    /// <param name="password">password to hash</param>
    public SaltedHash(string password)
    {
      this.Salt = this.CreateSalt();
      this.Hash = this.CreateHash(password);
    }

    /// <summary>
    /// Creates an instance of <see cref="SaltedHash"/>
    /// </summary>
    /// <param name="salt">the salt</param>
    /// <param name="hash">the hash</param>
    public SaltedHash(string salt, string hash)
    {
      this.Salt = salt;
      this.Hash = hash;
    }

    /// <summary>
    /// verifies whether the password matches the hash
    /// </summary>
    /// <param name="password">password to check</param>
    /// <returns>whether the password matches the hash</returns>
    public bool Verify(string password)
    {
      var hash = this.CreateHash(password);
      return this.Hash.Equals(hash, StringComparison.Ordinal);
    }

    private string CreateSalt()
    {
      var salt = this.CreateRandomBytes(saltLength);
      return Convert.ToBase64String(salt);
    }

    private string CreateHash(string password)
    {
      var data = Encoding.UTF8.GetBytes(this.Salt + password);
      using (var provider = new SHA1CryptoServiceProvider())
      {
        var hash = provider.ComputeHash(data);
        return Convert.ToBase64String(hash);
      }
    }

    private byte[] CreateRandomBytes(int count)
    {
      var result = new byte[count];
      using (var provider = new SHA1CryptoServiceProvider())
        return provider.ComputeHash(result);
    }


  }
}
