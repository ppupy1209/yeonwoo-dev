package com.yeonwoo.portfolio.guestbook;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GuestbookService {

    private final GuestbookEntryRepository guestbookEntryRepository;

    public GuestbookService(GuestbookEntryRepository guestbookEntryRepository) {
        this.guestbookEntryRepository = guestbookEntryRepository;
    }

    @Transactional(readOnly = true)
    public GuestbookPageResponse list(int page, int size) {
        PageRequest pageRequest = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id"))
        );
        Page<GuestbookEntry> entries = guestbookEntryRepository.findAll(pageRequest);
        return new GuestbookPageResponse(
                entries.stream().map(GuestbookEntryResponse::from).toList(),
                entries.getNumber(),
                entries.getSize(),
                entries.getTotalElements(),
                entries.getTotalPages()
        );
    }

    @Transactional
    public GuestbookEntryResponse create(GuestbookCreateRequest request, String ip) {
        GuestbookEntry entry = new GuestbookEntry(request.nickname(), request.message(), ip);
        GuestbookEntry saved = guestbookEntryRepository.save(entry);
        return GuestbookEntryResponse.from(saved);
    }
}
