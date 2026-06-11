package com.yeonwoo.portfolio.contact;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    @Transactional
    public ContactCreateResponse create(ContactCreateRequest request, String ip) {
        ContactMessage message = new ContactMessage(
                request.name(),
                request.email(),
                request.message(),
                ip
        );
        ContactMessage saved = contactMessageRepository.save(message);
        return new ContactCreateResponse(true, saved.getId());
    }
}
