package com.yeonwoo.portfolio.guestbook;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.TestPropertySource;

@DataJpaTest
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:guestbook;MODE=MySQL;DATABASE_TO_LOWER=TRUE;CASE_INSENSITIVE_IDENTIFIERS=TRUE",
        "spring.jpa.hibernate.ddl-auto=create-drop",
        "spring.flyway.enabled=false"
})
class GuestbookEntryRepositoryTest {

    @Autowired
    private GuestbookEntryRepository repository;

    @Test
    void findsEntriesByCreatedAtDescending() throws InterruptedException {
        repository.save(new GuestbookEntry("first", "hello", "127.0.0.1"));
        Thread.sleep(5);
        GuestbookEntry second = repository.save(new GuestbookEntry("second", "hi", "127.0.0.1"));

        List<GuestbookEntry> entries = repository.findAll(
                PageRequest.of(0, 10, Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id")))
        ).getContent();

        assertThat(entries).extracting(GuestbookEntry::getId).first().isEqualTo(second.getId());
    }
}
