package com.yeonwoo.portfolio.guestbook;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GuestbookCreateRequest(
        @NotBlank
        @Size(max = 20)
        String nickname,

        @NotBlank
        @Size(max = 500)
        String message,

        String company
) {
}
