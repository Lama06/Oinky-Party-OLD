package io.github.lama06.oinkyparty.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public final class RandomPlayerNameProvider {
    private static final List<String> names = new ArrayList<>();
    private static final Random random = new Random();

    private static void addName(String name) {
        names.add(name);
    }

    public static String getRandomName() {
        return names.get(random.nextInt(names.size()));
    }

    static {
        addName("Linienschiff Dome");
        addName("Schoner GMBH");
        addName("Kanonenbott Walross");
    }
}
