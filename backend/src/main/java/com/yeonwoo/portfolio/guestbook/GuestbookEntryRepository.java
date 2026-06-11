package com.yeonwoo.portfolio.guestbook;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GuestbookEntryRepository extends JpaRepository<GuestbookEntry, Long> {
}
