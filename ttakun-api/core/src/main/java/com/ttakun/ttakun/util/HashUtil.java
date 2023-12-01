package com.ttakun.ttakun.util;

import org.springframework.security.crypto.codec.Hex;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

public class HashUtil {
    public static String createHash() {
        String uuid = UUID.randomUUID().toString();

        return md5(uuid);
    }

    public static String md5(String value) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] md5 = md.digest(value.getBytes());
            return new String(Hex.encode(md5));
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
    }
}
