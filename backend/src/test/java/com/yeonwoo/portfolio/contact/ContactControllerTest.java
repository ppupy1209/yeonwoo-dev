package com.yeonwoo.portfolio.contact;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

@WebMvcTest(ContactController.class)
@Import(GlobalExceptionHandler.class)
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactService contactService;

    @MockBean
    private ClientIpResolver clientIpResolver;

    @MockBean
    private WriteRateLimiter writeRateLimiter;

    @Test
    void createsContactMessage() throws Exception {
        when(clientIpResolver.resolve(any())).thenReturn("127.0.0.1");
        when(contactService.create(any(), eq("127.0.0.1")))
                .thenReturn(new ContactCreateResponse(true, 1L));

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Yeonwoo",
                                  "email": "yeonwoo@example.com",
                                  "message": "Hello",
                                  "company": ""
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.ok").value(true))
                .andExpect(jsonPath("$.id").value(1));

        verify(writeRateLimiter).check("contact:127.0.0.1");
    }

    @Test
    void rejectsInvalidEmail() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Yeonwoo",
                                  "email": "invalid",
                                  "message": "Hello",
                                  "company": ""
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.ok").value(false))
                .andExpect(jsonPath("$.error").value("validation"));
    }

    @Test
    void ignoresHoneypotSubmission() throws Exception {
        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Bot",
                                  "email": "bot@example.com",
                                  "message": "Spam",
                                  "company": "filled"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.ok").value(true));
    }
}
