package com.ttakun.ttakun.util;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.util.Base64;

public class ImageUtil {

    public static String encodeClasspathImage(String imagePath) {
        String base64Image = "";

        Resource image = new ClassPathResource(imagePath);
        try {
            byte imageData[] = IOUtils.toByteArray(image.getInputStream());
            base64Image = Base64.getEncoder().encodeToString(imageData);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return base64Image;
    }
}
