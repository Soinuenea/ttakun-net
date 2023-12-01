package com.ttakun.ttakun.util;

import org.springframework.security.crypto.codec.Hex;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Sha1Util {
    public static String sha1(String value) {
        try {
            MessageDigest sha1 = MessageDigest.getInstance("SHA1");
            byte[] hash = sha1.digest(value.getBytes());
            return new String(Hex.encode(hash));
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
    }
}
