package com.yeonwoo.portfolio.common;

public record ApiErrorResponse(
        boolean ok,
        String error,
        String message
) {
    public static ApiErrorResponse of(String error, String message) {
        return new ApiErrorResponse(false, error, message);
    }
}
