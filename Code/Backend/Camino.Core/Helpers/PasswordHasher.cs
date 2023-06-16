﻿//using Microsoft.AspNetCore.Cryptography.KeyDerivation;
//using System.Security.Cryptography;

//namespace Camino.Core.Helpers
//{
//    public static class PasswordHasher
//    {
//        public static string HashPassword(string password)
//        {
//            if (password == null)
//            {
//                throw new ArgumentNullException(nameof(password));
//            }
//            return Convert.ToBase64String(HashPasswordV3(password, RandomNumberGenerator.Create()));
//        }

//        private static byte[] HashPasswordV3(string password, RandomNumberGenerator rng, KeyDerivationPrf prf = KeyDerivationPrf.HMACSHA256, int iterCount = 10000, int saltSize = 128 / 8, int numBytesRequested = 256 / 8)
//        {
//            byte[] salt = new byte[saltSize];
//            rng.GetBytes(salt);
//            byte[] subkey = KeyDerivation.Pbkdf2(password, salt, prf, iterCount, numBytesRequested);

//            var outputBytes = new byte[13 + salt.Length + subkey.Length];
//            outputBytes[0] = 0x01; // format marker
//            WriteNetworkByteOrder(outputBytes, 1, (uint)prf);
//            WriteNetworkByteOrder(outputBytes, 5, (uint)iterCount);
//            WriteNetworkByteOrder(outputBytes, 9, (uint)saltSize);
//            Buffer.BlockCopy(salt, 0, outputBytes, 13, salt.Length);
//            Buffer.BlockCopy(subkey, 0, outputBytes, 13 + saltSize, subkey.Length);
//            return outputBytes;
//        }

//        public static bool VerifyHashedPassword(string hashedPassword, string providedPassword)
//        {
//            if (hashedPassword == null)
//            {
//                throw new ArgumentNullException(nameof(hashedPassword));
//            }
//            if (providedPassword == null)
//            {
//                throw new ArgumentNullException(nameof(providedPassword));
//            }

//            byte[] decodedHashedPassword = Convert.FromBase64String(hashedPassword);

//            if (decodedHashedPassword.Length == 0)
//            {
//                return false;
//            }
//            return VerifyHashedPasswordV3(decodedHashedPassword, providedPassword);
//        }
//        private static bool VerifyHashedPasswordV3(byte[] hashedPassword, string password)
//        {
//            try
//            {
//                // Read header information
//                KeyDerivationPrf prf = (KeyDerivationPrf)ReadNetworkByteOrder(hashedPassword, 1);
//                var iterCount = (int)ReadNetworkByteOrder(hashedPassword, 5);
//                int saltLength = (int)ReadNetworkByteOrder(hashedPassword, 9);

//                // Read the salt: must be >= 128 bits
//                if (saltLength < 128 / 8)
//                {
//                    return false;
//                }
//                byte[] salt = new byte[saltLength];
//                Buffer.BlockCopy(hashedPassword, 13, salt, 0, salt.Length);

//                // Read the subkey (the rest of the payload): must be >= 128 bits
//                int subkeyLength = hashedPassword.Length - 13 - salt.Length;
//                if (subkeyLength < 128 / 8)
//                {
//                    return false;
//                }
//                byte[] expectedSubkey = new byte[subkeyLength];
//                Buffer.BlockCopy(hashedPassword, 13 + salt.Length, expectedSubkey, 0, expectedSubkey.Length);

//                // Hash the incoming password and verify it
//                byte[] actualSubkey = KeyDerivation.Pbkdf2(password, salt, prf, iterCount, subkeyLength);
//                return ByteArraysEqual(actualSubkey, expectedSubkey);
//            }
//            catch
//            {
//                // This should never occur except in the case of a malformed payload, where
//                // we might go off the end of the array. Regardless, a malformed payload
//                // implies verification failed.
//                return false;
//            }
//        }

//        private static void WriteNetworkByteOrder(byte[] buffer, int offset, uint value)
//        {
//            buffer[offset + 0] = (byte)(value >> 24);
//            buffer[offset + 1] = (byte)(value >> 16);
//            buffer[offset + 2] = (byte)(value >> 8);
//            buffer[offset + 3] = (byte)(value >> 0);
//        }

//        private static uint ReadNetworkByteOrder(byte[] buffer, int offset)
//        {
//            return ((uint)(buffer[offset + 0]) << 24)
//                   | ((uint)(buffer[offset + 1]) << 16)
//                   | ((uint)(buffer[offset + 2]) << 8)
//                   | ((uint)(buffer[offset + 3]));
//        }

//        private static bool ByteArraysEqual(byte[] a, byte[] b)
//        {
//            if (a == null && b == null)
//            {
//                return true;
//            }
//            if (a == null || b == null || a.Length != b.Length)
//            {
//                return false;
//            }
//            var areSame = true;
//            for (var i = 0; i < a.Length; i++)
//            {
//                areSame &= (a[i] == b[i]);
//            }
//            return areSame;
//        }
//    }
//}