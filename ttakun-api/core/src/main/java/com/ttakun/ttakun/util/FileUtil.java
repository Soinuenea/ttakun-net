package com.ttakun.ttakun.util;

import com.ttakun.ttakun.exception.InvalidFileException;
import org.apache.commons.io.FileUtils;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class FileUtil {

    public static void createFileFolder(File file) {
        Assert.notNull(file, "File cannot be null");
        createFolder(file.getParent());
    }

    public static boolean exists(String path) {
        File file = new File(path);

        return file.exists();
    }

    public static void createFolder(String path) {
        if (!exists(path)) {
            File folder = new File(path);
            folder.mkdirs();
        }
    }

    public static String uploadFile(String folderPath, MultipartFile file) {
        try {
            return copy(file.getInputStream(), folderPath, file.getOriginalFilename());
        } catch (IOException e) {
            throw new InvalidFileException();
        }
    }

    public static String copy(InputStream stream, String path, String fileName) {
        try {
            createFolder(path);
            String filePath = path + fileName;
            FileUtils.copyInputStreamToFile(stream, new File(filePath));

            return filePath;
        } catch (IOException e) {
            throw new InvalidFileException();
        }
    }

    public static InputStream getInputStream(String filePath) {
        try {
            return new FileInputStream(filePath);
        } catch (FileNotFoundException e) {
            throw new InvalidFileException();
        }
    }

    public static void deleteQuietlyFile(String path) {
        File fileToDelete = FileUtils.getFile(path);
        FileUtils.deleteQuietly(fileToDelete);
    }

    public static String slugAndAddDateToFileName(String originalFileName) {
        return slugAndAddDateToFileName(originalFileName, null);
    }

    public static String slugAndAddDateToFileName(String originalFileName, String extension) {
        String name = originalFileName.replaceAll("\\s", "-");
        String suffix = (Objects.isNull(extension)) ? "" : "." + extension;

        return DateUtil.getCurrentDateInFormat("yyyy_MM_dd_HH_mm_ss") + "_" + name + suffix;
    }

    public static String getFileName(String path) {
        if (fileExists(path)) {
            File f = new File(path);

            return f.getName();
        }

        return null;
    }

    public static boolean fileExists(String filePath){
        File f = new File(filePath);

        return (f.exists() && !f.isDirectory());
    }

    public static void zipFile(File source, String out) throws IOException {
        FileOutputStream fos = new FileOutputStream(out);
        ZipOutputStream zipOut = new ZipOutputStream(fos);
        List<File> files = source.isFile() ? List.of(source) : Arrays.asList(source.listFiles());
        for (File file: files) {
            FileInputStream fis = new FileInputStream(file);
            ZipEntry zipEntry = new ZipEntry(file.getName());
            zipOut.putNextEntry(zipEntry);

            byte[] bytes = new byte[1024];
            int length;
            while((length = fis.read(bytes)) >= 0) {
                zipOut.write(bytes, 0, length);
            }
            fis.close();
        }
        zipOut.close();
        fos.close();
    }
}
