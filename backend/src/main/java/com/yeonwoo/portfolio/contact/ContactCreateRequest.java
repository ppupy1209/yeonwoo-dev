package com.yeonwoo.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactCreateRequest(
        @NotBlank
        @Size(max = 50)
        String name,

        @NotBlank
        @Email
        @Size(max = 254)
        String email,

        @NotBlank
        @Size(max = 2000)
        String message,

        String company
) {
}
