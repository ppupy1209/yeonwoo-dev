package com.yeonwoo.portfolio.guestbook;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.List;

import com.yeonwoo.portfolio.common.ClientIpResolver;
import com.yeonwoo.portfolio.common.GlobalExceptionHandler;
import com.yeonwoo.portfolio.common.WriteRateLimiter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(GuestbookController.class)
@Import(GlobalExceptionHandler.class)
class GuestbookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GuestbookService guestbookService;

    @MockBean
    private ClientIpResolver clientIpResolver;

    @MockBean
    private WriteRateLimiter writeRateLimiter;

    @Test
    void listsGuestbookEntries() throws Exception {
        when(guestbookService.list(0, 10)).thenReturn(new GuestbookPageResponse(
                List.of(new GuestbookEntryResponse(1L, "yw", "hello", Instant.parse("2026-06-11T05:00:00Z"))),
                0,
                10,
                1,
                1
        ));

        mockMvc.perform(get("/api/guestbook"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.items[0].id").value(1))
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(10))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.totalPages").value(1));
    }

    @Test
    void createsGuestbookEntry() throws Exception {
        when(clientIpResolver.resolve(any())).thenReturn("127.0.0.1");
        when(guestbookService.create(any(), eq("127.0.0.1")))
                .thenReturn(new GuestbookEntryResponse(7L, "yw", "hello", Instant.parse("2026-06-11T05:00:00Z")));

        mockMvc.perform(post("/api/guestbook")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "nickname": "yw",
                                  "message": "hello",
                                  "company": ""
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(7))
                .andExpect(jsonPath("$.nickname").value("yw"))
                .andExpect(jsonPath("$.message").value("hello"))
                .andExpect(jsonPath("$.createdAt").value("2026-06-11T05:00:00Z"));
    }

    @Test
    void rejectsTooLargePageSize() throws Exception {
        mockMvc.perform(get("/api/guestbook?size=100"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.ok").value(false))
                .andExpect(jsonPath("$.error").value("validation"));
    }
}
