package com.yeonwoo.portfolio.common;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class WriteRateLimiter {

    private static final Duration WINDOW = Duration.ofMinutes(1);

    private final ConcurrentMap<String, WindowCounter> counters = new ConcurrentHashMap<>();
    private final int writesPerMinute;
    private final Clock clock;

    public WriteRateLimiter(
            @Value("${app.rate-limit.writes-per-minute}") int writesPerMinute
    ) {
        this(writesPerMinute, Clock.systemUTC());
    }

    WriteRateLimiter(int writesPerMinute, Clock clock) {
        this.writesPerMinute = writesPerMinute;
        this.clock = clock;
    }

    public void check(String key) {
        Instant now = clock.instant();
        WindowCounter counter = counters.compute(key, (ignored, current) -> {
            if (current == null || current.windowStart.plus(WINDOW).isBefore(now)) {
                return new WindowCounter(now, 1);
            }
            return new WindowCounter(current.windowStart, current.count + 1);
        });

        if (counter.count > writesPerMinute) {
            throw new RateLimitExceededException("요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.");
        }
    }

    private record WindowCounter(Instant windowStart, int count) {
    }
}
