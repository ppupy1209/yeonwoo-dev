package com.yeonwoo.portfolio.guestbook;

import java.util.List;

public record GuestbookPageResponse(
        List<GuestbookEntryResponse> items,
        int page,
        int size,
        long totalElements,
        int totalPages
) {
}
