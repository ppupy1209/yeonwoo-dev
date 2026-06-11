package com.yeonwoo.portfolio.guestbook;

import com.yeonwoo.portfolio.common.ApiOkResponse;
import com.yeonwoo.portfolio.common.ClientIpResolver;
import com.yeonwoo.portfolio.common.WriteRateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/guestbook")
public class GuestbookController {

    private final GuestbookService guestbookService;
    private final ClientIpResolver clientIpResolver;
    private final WriteRateLimiter writeRateLimiter;

    public GuestbookController(
            GuestbookService guestbookService,
            ClientIpResolver clientIpResolver,
            WriteRateLimiter writeRateLimiter
    ) {
        this.guestbookService = guestbookService;
        this.clientIpResolver = clientIpResolver;
        this.writeRateLimiter = writeRateLimiter;
    }

    @GetMapping
    public GuestbookPageResponse list(
            @RequestParam(defaultValue = "0") @Min(0) int page,
            @RequestParam(defaultValue = "10") @Min(1) @Max(50) int size
    ) {
        return guestbookService.list(page, size);
    }

    @PostMapping
    public ResponseEntity<?> create(
            @Valid @RequestBody GuestbookCreateRequest request,
            HttpServletRequest servletRequest
    ) {
        if (StringUtils.hasText(request.company())) {
            return ResponseEntity.ok(ApiOkResponse.ok());
        }

        String ip = clientIpResolver.resolve(servletRequest);
        writeRateLimiter.check("guestbook:" + ip);
        GuestbookEntryResponse response = guestbookService.create(request, ip);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
