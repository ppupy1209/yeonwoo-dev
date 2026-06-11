package com.yeonwoo.portfolio.contact;

import com.yeonwoo.portfolio.common.ApiOkResponse;
import com.yeonwoo.portfolio.common.ClientIpResolver;
import com.yeonwoo.portfolio.common.WriteRateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;
    private final ClientIpResolver clientIpResolver;
    private final WriteRateLimiter writeRateLimiter;

    public ContactController(
            ContactService contactService,
            ClientIpResolver clientIpResolver,
            WriteRateLimiter writeRateLimiter
    ) {
        this.contactService = contactService;
        this.clientIpResolver = clientIpResolver;
        this.writeRateLimiter = writeRateLimiter;
    }

    @PostMapping
    public ResponseEntity<?> create(
            @Valid @RequestBody ContactCreateRequest request,
            HttpServletRequest servletRequest
    ) {
        if (StringUtils.hasText(request.company())) {
            return ResponseEntity.ok(ApiOkResponse.ok());
        }

        String ip = clientIpResolver.resolve(servletRequest);
        writeRateLimiter.check("contact:" + ip);
        ContactCreateResponse response = contactService.create(request, ip);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
