package com.ttakun.ttakun.runner;

import com.ttakun.ttakun.runner.task.DevelopmentDataTask;
import com.ttakun.ttakun.runner.task.TruncateDataTask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static java.util.AbstractMap.SimpleEntry;

@Component
public class ConsoleRunner implements ApplicationRunner {

    private final Map<String, Integer> ARGUMENTS = Collections.unmodifiableMap(
        Stream.of(
            new SimpleEntry<>("truncate", 1),
            new SimpleEntry<>("fixtures", 2)
        )
            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue))
    );
    private final List<String> OPTIONS = Arrays.asList(
        "  1 - Truncate database.",
        "  2 - Load development fixtures.",
        "  3 - Exit program."
    );

    private TruncateDataTask truncateDataTask;
    private DevelopmentDataTask developmentDataTask;

    @Autowired
    public ConsoleRunner(
        TruncateDataTask truncateDataTask,
        DevelopmentDataTask developmentDataTask
    ) {
        this.truncateDataTask = truncateDataTask;
        this.developmentDataTask = developmentDataTask;
    }

    @Override
    public void run(ApplicationArguments applicationArguments) throws Exception {
        Integer option = getOption(applicationArguments.getOptionNames());
        switch (option) {
            case 1:
                truncateDataTask.run();
                break;
            case 2:
                truncateDataTask.run();
                developmentDataTask.run();
                break;
        }

    }

    private Integer getOption(Set<String> arguments) {
        Integer option = findOptionInArguments(arguments);

        return (option != null) ? option : askForOption();
    }

    private Integer findOptionInArguments(Set<String> arguments) {
        return arguments.stream()
            .filter(ARGUMENTS::containsKey)
            .map(ARGUMENTS::get)
            .findFirst()
            .orElse(null);
    }

    private Integer askForOption() {
        Integer option = null;
        Scanner scanIn = new Scanner(System.in);

        boolean valid = false;
        while (!valid) {
            printOptions(OPTIONS);

            try {
                option = Integer.parseInt(scanIn.nextLine());
                if (option > OPTIONS.size()) {
                    throw new IndexOutOfBoundsException();
                }
                valid = true;
            } catch (NumberFormatException | IndexOutOfBoundsException ex) {
                System.out.println("Invalid option");
            }
        }

        scanIn.close();

        return option;
    }

    private void printOptions(List<String> options) {
        System.out.println("Choose your option and enter its number:");
        options.forEach(System.out::println);
    }
}
