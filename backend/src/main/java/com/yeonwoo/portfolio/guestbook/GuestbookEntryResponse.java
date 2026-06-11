package com.yeonwoo.portfolio.guestbook;

import java.time.Instant;

public record GuestbookEntryResponse(
        Long id,
        String nickname,
        String message,
        Instant createdAt
) {
    static GuestbookEntryResponse from(GuestbookEntry entry) {
        return new GuestbookEntryResponse(
                entry.getId(),
                entry.getNickname(),
                entry.getMessage(),
                entry.getCreatedAt()
        );
    }
}
