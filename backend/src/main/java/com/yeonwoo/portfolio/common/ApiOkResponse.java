package com.yeonwoo.portfolio.common;

public record ApiOkResponse(
        boolean ok
) {
    public static ApiOkResponse ok() {
        return new ApiOkResponse(true);
    }
}
