package io.github.lama06.oinkyparty.util;

import java.util.Random;

public final class Util {
    private static final Random random = new Random();

    public static int generateRandomId() {
        return random.nextInt();
    }
}
